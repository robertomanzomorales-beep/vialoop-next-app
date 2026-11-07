const { test, before, after, beforeEach } = require("node:test");
const assert = require("node:assert/strict");
const net = require("node:net");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const { NextRequest } = require("next/server");
const project = path.resolve(__dirname, "..");
const output = path.join(project, ".next", "contact-route-test.cjs");
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(
  output,
  ts.transpileModule(
    fs.readFileSync(path.join(project, "app/api/contacto/route.ts"), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
      },
    },
  ).outputText,
);
const { POST } = require(output);
let server,
  captured = [],
  rejectInternal = false,
  rejectVisitor = false,
  sequence = 0;
const sockets = new Set();
const originalEnv = {};
before(async () => {
  server = net.createServer((socket) => {
    sockets.add(socket);
    socket.on("close", () => sockets.delete(socket));
    let buffer = "",
      dataMode = false,
      mail = [],
      recipients = [];
    socket.write("220 localhost ESMTP test\r\n");
    socket.on("data", (chunk) => {
      buffer += chunk.toString();
      let position;
      while ((position = buffer.indexOf("\r\n")) !== -1) {
        const line = buffer.slice(0, position);
        buffer = buffer.slice(position + 2);
        if (dataMode) {
          if (line === ".") {
            dataMode = false;
            captured.push({
              recipients: [...recipients],
              data: mail.join("\r\n"),
            });
            mail = [];
            socket.write("250 message accepted\r\n");
          } else mail.push(line);
          continue;
        }
        const command = line.toUpperCase();
        if (command.startsWith("EHLO") || command.startsWith("HELO"))
          socket.write(
            "250-localhost\r\n250-AUTH PLAIN LOGIN\r\n250 8BITMIME\r\n",
          );
        else if (command.startsWith("AUTH"))
          socket.write("235 authentication accepted\r\n");
        else if (command.startsWith("MAIL FROM")) {
          recipients = [];
          socket.write("250 sender accepted\r\n");
        } else if (command.startsWith("RCPT TO")) {
          const recipient = line.match(/<([^>]+)>/)?.[1] || "";
          if (
            (rejectInternal && recipient.endsWith("@vialoop.cl")) ||
            (rejectVisitor && recipient === "visitor@example.test")
          )
            socket.write("550 mailbox unavailable\r\n");
          else {
            recipients.push(recipient);
            socket.write("250 recipient accepted\r\n");
          }
        } else if (command === "DATA") {
          dataMode = true;
          socket.write("354 end with dot\r\n");
        } else if (command === "QUIT") {
          socket.end("221 goodbye\r\n");
        } else socket.write("250 ok\r\n");
      }
    });
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const values = {
    SMTP_HOST: "127.0.0.1",
    SMTP_PORT: String(server.address().port),
    SMTP_SECURE: "false",
    SMTP_USER: "capture@example.test",
    SMTP_PASSWORD: "local-test-only",
  };
  for (const [key, value] of Object.entries(values)) {
    originalEnv[key] = process.env[key];
    process.env[key] = value;
  }
});
beforeEach(() => {
  captured = [];
  rejectInternal = false;
  rejectVisitor = false;
});
after(async () => {
  for (const socket of sockets) socket.destroy();
  await new Promise((resolve) => server.close(resolve));
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  fs.rmSync(output, { force: true });
});
const payload = () => ({
  fullName: "Prueba Vialoop",
  email: "visitor@example.test",
  company: "",
  phone: "",
  message: "Quiero conversar sobre una página web para mi empresa.",
  privacyAccepted: true,
  website: "",
});
async function send(body, options = {}) {
  const request = new NextRequest("http://localhost:4173/api/contacto", {
    method: "POST",
    headers: {
      host: "localhost:4173",
      origin: "http://localhost:4173",
      "content-type": "application/json",
      "x-forwarded-for": `192.0.2.${++sequence}`,
      ...options,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
  const response = await POST(request);
  return { status: response.status, body: await response.json() };
}
test("minimal contact sends internal notification and acknowledgement without company or phone", async () => {
  const response = await send(payload());
  assert.equal(response.status, 200);
  assert.equal(response.body.ok, true);
  assert.equal(response.body.confirmationSent, true);
  assert.match(response.body.requestId, /^VL-[A-F0-9]{8}$/);
  assert.equal(captured.length, 2);
  assert.deepEqual(captured[0].recipients, [
    "contacto@vialoop.cl",
    "dloayza@vialoop.cl",
  ]);
  assert.deepEqual(captured[1].recipients, ["visitor@example.test"]);
});
test("HTML supplied in the message is escaped in both emails", async () => {
  const response = await send({
    ...payload(),
    message: "Consulta de ejemplo <script>alert('x')</script> y detalles.",
  });
  assert.equal(response.status, 200);
  for (const email of captured) {
    const decoded = email.data
      .replace(/=\r\n/g, "")
      .replace(/=([A-F0-9]{2})/g, (_, hex) =>
        String.fromCharCode(parseInt(hex, 16)),
      );
    const html = decoded.slice(decoded.indexOf("<!doctype html>"));
    assert.match(html, /&lt;script&gt;/);
    assert.doesNotMatch(html, /<script>/);
  }
});
test("missing privacy acceptance does not send email", async () => {
  assert.equal(
    (await send({ ...payload(), privacyAccepted: false })).status,
    400,
  );
  assert.equal(captured.length, 0);
});
test("malformed email and invalid optional phone are rejected", async () => {
  assert.equal((await send({ ...payload(), email: "invalid" })).status, 400);
  assert.equal(
    (await send({ ...payload(), email: "a@@example.test" })).status,
    400,
  );
  assert.equal((await send({ ...payload(), phone: "12" })).status, 400);
  assert.equal(captured.length, 0);
});
test("honeypot returns neutral success without email", async () => {
  assert.equal(
    (await send({ ...payload(), website: "spam.example" })).status,
    200,
  );
  assert.equal(captured.length, 0);
});
test("cross-origin, malformed JSON and oversized bodies are rejected", async () => {
  assert.equal(
    (await send(payload(), { origin: "https://unrelated.example" })).status,
    403,
  );
  assert.equal((await send("{broken")).status, 400);
  assert.equal(
    (await send(payload(), { "content-length": "20000" })).status,
    413,
  );
  assert.equal(captured.length, 0);
});
test("internal delivery failure never reports success or sends acknowledgement", async () => {
  rejectInternal = true;
  const response = await send(payload());
  assert.equal(response.status, 502);
  assert.equal(response.body.ok, false);
  assert.equal(captured.length, 0);
});
test("acknowledgement failure retains successful internal delivery", async () => {
  rejectVisitor = true;
  const response = await send(payload());
  assert.equal(response.status, 200);
  assert.equal(response.body.confirmationSent, false);
  assert.equal(captured.length, 1);
  assert.match(response.body.message, /no necesitas volver/);
});
test("a sixth request in the window is rate limited", async () => {
  for (let index = 0; index < 5; index++)
    assert.equal(
      (await send(payload(), { "x-forwarded-for": "192.0.2.250" })).status,
      200,
    );
  assert.equal(
    (await send(payload(), { "x-forwarded-for": "192.0.2.250" })).status,
    429,
  );
  assert.equal(captured.length, 10);
});

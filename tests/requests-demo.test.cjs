const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const Module = require("node:module");
const filename = path.resolve(__dirname, "../lib/demo/requests.ts");
const compiled = new Module(filename, module);
compiled.filename = filename;
compiled.paths = module.paths;
compiled._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, filename);
const { createDemoState, requestReducer, requestSummary, DEMO_LIMIT } = compiled.exports;

test("la demo comienza con tres solicitudes y un resumen consistente", () => {
  assert.deepEqual(requestSummary(createDemoState().requests), { total: 3, new: 1, active: 1, done: 1 });
});

test("registrar, iniciar y completar conecta el listado con el resumen", () => {
  const initial = createDemoState();
  let state = requestReducer(initial, { type: "create", title: "  Visita   técnica  " });
  assert.equal(state.requests[0].title, "Visita técnica");
  assert.equal(state.requests[0].id, 1044);
  assert.equal(initial.requests.length, 3);
  assert.deepEqual(requestSummary(state.requests), { total: 4, new: 2, active: 1, done: 1 });
  state = requestReducer(state, { type: "advance", id: 1044 });
  assert.equal(state.requests[0].status, "active");
  assert.deepEqual(requestSummary(state.requests), { total: 4, new: 1, active: 2, done: 1 });
  state = requestReducer(state, { type: "advance", id: 1044 });
  assert.equal(state.requests[0].status, "done");
  assert.deepEqual(requestSummary(state.requests), { total: 4, new: 1, active: 1, done: 2 });
});

test("reabrir una completada la devuelve a nuevas sin duplicar registros", () => {
  const state = requestReducer(createDemoState(), { type: "advance", id: 1041 });
  assert.deepEqual(requestSummary(state.requests), { total: 3, new: 2, active: 1, done: 0 });
});

test("reiniciar recupera los datos iniciales y los identificadores", () => {
  const changed = requestReducer(createDemoState(), { type: "create", title: "Prueba de reinicio" });
  const reset = requestReducer(changed, { type: "reset" });
  assert.deepEqual(reset, createDemoState());
  assert.notEqual(reset.requests, changed.requests);
  assert.equal(requestReducer(reset, { type: "create", title: "Segunda prueba" }).requests[0].id, 1044);
});

test("rechaza solicitudes vacías, demasiado cortas o extensas", () => {
  const state = createDemoState();
  for (const title of ["", "    ", "ab", "x".repeat(71)]) {
    assert.equal(requestReducer(state, { type: "create", title }), state);
  }
});

test("la demo limita el volumen y mantiene identificadores únicos", () => {
  let state = createDemoState();
  for (let i = 0; i < 20; i++) state = requestReducer(state, { type: "create", title: `Solicitud de prueba ${i}` });
  assert.equal(state.requests.length, DEMO_LIMIT);
  assert.equal(new Set(state.requests.map(r => r.id)).size, DEMO_LIMIT);
  assert.equal(requestReducer(state, { type: "create", title: "Fuera del límite" }), state);
});

test("un identificador inexistente no altera el resumen", () => {
  const state = createDemoState();
  assert.equal(requestReducer(state, { type: "advance", id: -1 }), state);
  assert.deepEqual(requestSummary([]), { total: 0, new: 0, active: 0, done: 0 });
});

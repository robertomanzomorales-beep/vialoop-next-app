export type RequestStatus = "new" | "active" | "done";
export type RequestFilter = "all" | RequestStatus;
export type DemoRequest = { id: number; title: string; status: RequestStatus };
export type DemoState = { requests: DemoRequest[]; nextId: number };
export type DemoAction =
  | { type: "create"; title: string }
  | { type: "advance"; id: number }
  | { type: "reset" };

export const DEMO_LIMIT = 8;
export const requestStatus = {
  new: { label: "Nueva", action: "Iniciar" },
  active: { label: "En curso", action: "Completar" },
  done: { label: "Completada", action: "Reabrir" },
} as const;

export function createDemoState(): DemoState {
  return {
    requests: [
      { id: 1043, title: "Mantención preventiva", status: "new" },
      { id: 1042, title: "Revisión de documentos", status: "active" },
      { id: 1041, title: "Entrega de informe", status: "done" },
    ],
    nextId: 1044,
  };
}

export function nextRequestStatus(status: RequestStatus): RequestStatus {
  return status === "new" ? "active" : status === "active" ? "done" : "new";
}

export function requestSummary(requests: DemoRequest[]) {
  return requests.reduce(
    (summary, request) => {
      summary.total += 1;
      summary[request.status] += 1;
      return summary;
    },
    { total: 0, new: 0, active: 0, done: 0 },
  );
}

export function requestReducer(state: DemoState, action: DemoAction): DemoState {
  if (action.type === "reset") return createDemoState();
  if (action.type === "create") {
    const title = action.title.trim().replace(/\s+/g, " ");
    if (title.length < 3 || title.length > 70 || state.requests.length >= DEMO_LIMIT) return state;
    return {
      requests: [{ id: state.nextId, title, status: "new" }, ...state.requests],
      nextId: state.nextId + 1,
    };
  }
  if (!state.requests.some(request => request.id === action.id)) return state;
  return {
    ...state,
    requests: state.requests.map(request => request.id === action.id
      ? { ...request, status: nextRequestStatus(request.status) }
      : request),
  };
}

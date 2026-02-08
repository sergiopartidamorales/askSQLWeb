import type { SSECallbacks, SSEEventMap, SSEEventType } from "../../types";

const isObject = (value: unknown): value is Record<string, unknown> => {
    return typeof value === "object" && value !== null;
};

const hasString = (value: unknown, key: string): value is Record<string, string> => {
    return isObject(value) && typeof value[key] === "string";
};

const hasNumber = (value: unknown, key: string): value is Record<string, number> => {
    return isObject(value) && typeof value[key] === "number";
};

const isStatusPayload = (data: unknown): data is SSEEventMap["status"] => {
    return hasString(data, "message") && hasNumber(data, "step");
};

const isSqlChunkPayload = (data: unknown): data is SSEEventMap["sql-chunk"] => {
    return hasString(data, "chunk");
};

const isCompletePayload = (data: unknown): data is SSEEventMap["complete"] => {
    return isObject(data) && typeof data.query === "string" && "data" in data;
};

const isErrorPayload = (data: unknown): data is SSEEventMap["error"] => {
    return hasString(data, "message");
};

const handleSSEEvent = (eventType: string, data: unknown, callbacks: SSECallbacks): void => {
    switch (eventType) {
        case 'status':
            if (!isStatusPayload(data)) {
                console.warn('Invalid status payload', data);
                return;
            }
            callbacks.onStatus(data.message, data.step);
            break;
        case 'sql-chunk':
            if (!isSqlChunkPayload(data)) {
                console.warn('Invalid sql-chunk payload', data);
                return;
            }
            callbacks.onSqlChunk(data.chunk);
            break;
        case 'complete':
            if (!isCompletePayload(data)) {
                console.warn('Invalid complete payload', data);
                return;
            }
            callbacks.onComplete({
                query: data.query,
                data: data.data
            });
            break;
        case 'error':
            if (!isErrorPayload(data)) {
                console.warn('Invalid error payload', data);
                return;
            }
            callbacks.onError(data.message);
            break;
        default:
            console.warn(`Unknown SSE event type: ${eventType as SSEEventType}`);
    }
};

export default handleSSEEvent;

export type TableRow = Record<string, unknown>;  // each row is a plain object

export type ErrorResponse = {
    error: string;  // error message from the server
};

export type QueryResult<T extends TableRow = TableRow> = {
    query: string;                // the generated SQL
    data?: T[] | ErrorResponse;  // result if execution succeeds or error object
};

export type StreamChunk = {
    chunk: string;  // partial SQL query chunk
};

export type StreamCallbacks = {
    onChunk: (chunk: string) => void;
    onComplete: (result: QueryResult) => void;
    onError: (error: string) => void;
};

export interface SSECallbacks {
    onStatus: (message: string, step: number) => void;
    onSqlChunk: (chunk: string) => void;
    onComplete: (result: QueryResult) => void;
    onError: (error: string) => void;
}

export interface PostApiParams {
    endPoint: string;
    payload: { prompt: string };
    signal?: AbortSignal;
}

export type StatusPayload = {
    message: string;
    step: number;
};

export type SqlChunkPayload = {
    chunk: string;
};

export type CompletePayload = {
    query: string;
    data: TableRow[] | ErrorResponse;
};

export type ErrorPayload = {
    message: string;
};

export type SSEEventType = 'status' | 'sql-chunk' | 'complete' | 'error';

export type SSEEventMap = {
    status: StatusPayload;
    'sql-chunk': SqlChunkPayload;
    complete: CompletePayload;
    error: ErrorPayload;
};


 

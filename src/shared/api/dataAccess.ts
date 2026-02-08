import type { PostApiParams,  SSECallbacks } from "../types";
import processSSEStream from "./helpers/processSSEStream";

// Configuration
const API_BASE = import.meta.env.VITE_API_BASE;
const HEADERS = {  "Content-Type": 'application/json', Accept: 'application/json'} as const;
const buildUrl = (path: string): string => new URL(`${API_BASE}${path}`).toString();

export const postApiWithSSE = async ( params: PostApiParams & SSECallbacks): Promise<void> => {
    const url = buildUrl(params.endPoint);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify(params.payload),
            signal: params.signal,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body?.getReader();
        if (!reader) {
            throw new Error('Response body is not readable');
        }

        const callbacks: SSECallbacks = {
            onStatus: params.onStatus,
            onSqlChunk: params.onSqlChunk,
            onComplete: params.onComplete,
            onError: params.onError,
        };

        await processSSEStream(reader, callbacks);
    } catch (error) {
        params.onError(error instanceof Error ? error.message : 'Unknown error occurred');
    }
};

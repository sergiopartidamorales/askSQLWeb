import type { SSECallbacks } from "../../types";
import handleSSEEvent from "./handleSSEEvent";

const processSSEStream = async (
    reader: ReadableStreamDefaultReader<Uint8Array>,
    callbacks: SSECallbacks
): Promise<void> => {
    const decoder = new TextDecoder();
    let buffer = '';
    let currentEvent = '';
    let isComplete = false;

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
            if (line.startsWith('event: ')) {
                currentEvent = line.slice(7).trim();
            } else if (line.startsWith('data: ')) {
                const data = line.slice(6);
                try {
                    const parsed = JSON.parse(data);
                    if (currentEvent === 'complete') {
                        isComplete = true;
                    }
                    handleSSEEvent(currentEvent, parsed, callbacks);
                    currentEvent = '';
                } catch (error) {
                    console.error('Error parsing SSE data:', error);
                }
            }
        }
    }

    if (!isComplete) {
        callbacks.onError('Stream ended before completion event.');
    }
};

export default processSSEStream;

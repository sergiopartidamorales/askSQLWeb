
import { useCallback, useEffect, useRef, useState } from "react";
import TableBulderServcie from "../service/tableBulderServcie";
import type { QueryResult } from "../../../shared/types";

const tableBulderServcie = new TableBulderServcie();

export const useTableBuilder = () => {
    const [error, setError] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>("");
    const [dataQuery, setDataQuery] = useState<QueryResult | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<string>("");
    const [streamingSQL, setStreamingSQL] = useState<string>("");
    const [isStreaming, setIsStreaming] = useState<boolean>(false);
    const abortRef = useRef<AbortController | null>(null);

    const submitQuery = useCallback(async () => {
        if (abortRef.current) {
            abortRef.current.abort();
        }
        const controller = new AbortController();
        abortRef.current = controller;

        setLoading(true);
        setError(null);
        setStatusMessage("");
        setStreamingSQL("");
        setIsStreaming(true);
        setDataQuery(null);

        await tableBulderServcie.postTableDataWithSSE(
            prompt,
            (message: string, step: number) => { setStatusMessage(`Step ${step}: ${message}`) },            
            (chunk: string) => { setStreamingSQL(prev => prev + chunk) },      
            (result: QueryResult) => {
                setIsStreaming(false);
                setLoading(false);
                if (result && result.data) {
                    if ('error' in result.data) {
                        setError(`${result.query}, ${result.data.error}`);
                        setDataQuery(null);
                    } else {
                        setDataQuery(result);
                    }
                }
            },           
            (errorMessage: string) => {
                if (controller.signal.aborted) {
                    return;
                }
                setIsStreaming(false);
                setLoading(false);
                setError(errorMessage);
                setStatusMessage("");
                setStreamingSQL("");
            },
            controller.signal
        );
    }, [prompt]);

    const onsubmitForm = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        submitQuery();
    }

    useEffect(() => {
        return () => {
            if (abortRef.current) {
                abortRef.current.abort();
            }
        };
    }, []);

    return {
        error,
        prompt,
        dataQuery,
        loading,
        statusMessage,
        streamingSQL,
        isStreaming,
        setPrompt,
        onsubmitForm,
    }

}


import React from "react";
import Styles from "../tableBuilder.module.scss";

interface QueryFormProps {
    prompt: string;
    isStreaming: boolean;
    onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
    onChange: (value: string) => void;
}

const QueryForm = (QueryFormProps: QueryFormProps) => {
    const { prompt, isStreaming, onSubmit, onChange } = QueryFormProps;
    return (
        <form onSubmit={onSubmit}>
            <div className={Styles["input-form-builder"]}>
                <label>Ask me a question:</label>
                <textarea
                    value={prompt}
                    rows={4}
                    cols={50}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={isStreaming}
                    placeholder="e.g., Show me all customers who made an order from one year ago"
                />
                <button type="submit" disabled={isStreaming}>
                    {isStreaming ? '⏳ Generating...' : '✨ Generate Table'}
                </button>
            </div>
        </form>
    )
}

export default QueryForm;
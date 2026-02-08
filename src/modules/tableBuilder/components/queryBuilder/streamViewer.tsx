import Styles from "../tableBuilder.module.scss";

interface StreamViewerProps {
    error: string | null;
    isStreaming: boolean;
    streamingSQL: string;
    finalSQL: string | null;
    statusMessage?: string;
}

const StreamViewer = (props: StreamViewerProps) => {
    const { error, isStreaming, streamingSQL, finalSQL, statusMessage } = props;
    const getDisplayContent = () => {
        if (error) {
            return <code style={{ color: "red" }}>Error: {error}</code>;
        }
        if (isStreaming && streamingSQL) {
            return <code>{streamingSQL}</code>;
        }
        if (finalSQL) {
            return <code>{finalSQL}</code>;
        }
        return <code>No SQL query generated yet.</code>;
    };

    return (
        <div className={Styles["sql-container"]}>
            <h3>
                {isStreaming ? '🔄 Generating SQL Query (streaming)...' : 'SQL Query Generated:'}
            </h3>
            {statusMessage && (
                <div className={Styles["status-message"]}>
                    <p>⚡ {statusMessage}</p>
                </div>
            )}
            <pre>{getDisplayContent()}</pre>
        </div>
    );
}



export default StreamViewer;

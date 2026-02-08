import React from "react";
import Styles from "../tableBuilder.module.scss";
import StreamViewer from "./streamViewer";
import QueryForm from "./queryForm";
 
interface GenerateQueryProps {
  error: string | null;
  prompt: string;
  dataQuery: { query: string } | null;
  statusMessage: string;
  streamingSQL: string;
  isStreaming: boolean;
  onsubmitForm: (e: React.SubmitEvent<HTMLFormElement>) => void;
  setPrompt: (value: string) => void;
}

const GenerateQuery: React.FC<GenerateQueryProps> = ({
  error,
  prompt,
  dataQuery,
  statusMessage,
  streamingSQL,
  isStreaming,
  onsubmitForm,
  setPrompt,
}) => {
  return (
    <div className={Styles["left-panel-builder"]}>
      <QueryForm
        prompt={prompt}
        isStreaming={isStreaming}
        onSubmit={onsubmitForm}
        onChange={setPrompt}
      />

      <StreamViewer
        error={error}
        isStreaming={isStreaming}
        streamingSQL={streamingSQL}
        finalSQL={dataQuery?.query || null}
        statusMessage={statusMessage}
      />
    </div>
  );
};

GenerateQuery.displayName = "GenerateQuery";
export default React.memo(GenerateQuery);
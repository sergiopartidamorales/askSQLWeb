import { useTableBuilder } from "../hooks/useTableBuilder";
import GennerateQuery from "./queryBuilder/generateQuery";
import GenerateTable from "./table/generateTable";
import Styles from "./tableBuilder.module.scss";


const TableBuilder = () => {
  const { error, prompt, dataQuery, loading, statusMessage, streamingSQL, isStreaming, setPrompt, onsubmitForm } = useTableBuilder();

  return <div className={Styles["table-builder-container"]}>

    <GennerateQuery
      error={error}
      prompt={prompt}
      dataQuery={dataQuery}
      statusMessage={statusMessage}
      streamingSQL={streamingSQL}
      isStreaming={isStreaming}
      onsubmitForm={onsubmitForm}
      setPrompt={setPrompt}
    />
    
    <GenerateTable
      loading={loading}
      error={error}
      dataQuery={dataQuery}
    />
  </div>;
};

export default TableBuilder;



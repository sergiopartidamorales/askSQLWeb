import { postApiWithSSE } from "../../../shared/api/dataAccess";
import type { QueryResult } from "../../../shared/types";

class TableBuilderService { 
  constructor() {   
  }
  postTableDataWithSSE(
    prompt: string,
    onStatus: (message: string, step: number) => void,
    onSqlChunk: (chunk: string) => void,
    onComplete: (result: QueryResult) => void,
    onError: (error: string) => void,
    signal?: AbortSignal
  ) {
    return postApiWithSSE({
      endPoint: '/table-builder',
      payload: { prompt },
      onStatus,
      onSqlChunk,     
      onComplete,
      onError,
      signal
    });
  }
}

export default TableBuilderService;

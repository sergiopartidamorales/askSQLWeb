import React from "react";
import type { QueryResult, TableRow } from "../../../../shared/types";
import Styles from "../tableBuilder.module.scss";
import VirtualizedTable from "../../../../shared/components/virtualizedTable";

interface GenerateTableProps {
	loading: boolean;
	error: string | null;
	dataQuery: QueryResult | null;
}

const GenerateTable = React.memo(({ loading, error, dataQuery }: GenerateTableProps) => {
	const rows = Array.isArray(dataQuery?.data) ? (dataQuery?.data as TableRow[]) : [];

	return (
		<div className={Styles["right-panel-builder"]}>
			<div>
				<h2>Table Generated</h2>
				{loading && <h1>Loading...</h1>}
				{!loading && error && <p>No data available to display.</p>}
				{
					!loading && !error && rows.length > 0
						? <VirtualizedTable rows={rows} />
						: !loading && !error && <p>No data available to display.</p>
				}
			</div>
		</div>
	);
});

GenerateTable.displayName = "GenerateTable";
export default GenerateTable;

import React from "react";
import type { TableRow } from "../types";
import Styles from "./virtualizedTable.module.scss";
import { useVitrualTable } from "../hooks/useVitrualTable";
import { formatCellValue } from "../utils/formatCellValue";

interface VirtualizedTableProps {
	rows: TableRow[];
}

const VirtualizedTable = React.memo(({ rows }: VirtualizedTableProps) => {
	const { paddingTop, paddingBottom, columns, parentRef, virtualRows } = useVitrualTable(rows);
	const headerRef = React.useRef<HTMLDivElement>(null);

	const handleBodyScroll = (e: React.UIEvent<HTMLDivElement>) => {
		if (headerRef.current) {
			headerRef.current.scrollLeft = (e.target as HTMLDivElement).scrollLeft;
		}
	};

	return (
		<div className={Styles["virtualized-table-wrapper"]}>
			<div ref={headerRef} className={Styles["table-header-wrapper"]}>
				<table className={Styles["generated-table"]}>
					<thead className={Styles["sticky-header"]}>
						<tr>
							{columns.map((key) => (
								<th key={key}>{key}</th>
							))}
						</tr>
					</thead>
				</table>
			</div>
			<div ref={parentRef} className={Styles["virtual-scroll-container"]} onScroll={handleBodyScroll}>
				<table className={Styles["generated-table"]}>
					<tbody>
						{paddingTop > 0 && (
							<tr>
								<td colSpan={Math.max(columns.length, 1)} style={{ height: `${paddingTop}px` }} />
							</tr>
						)}
						{virtualRows.map((virtualRow) => {
							const row = rows[virtualRow.index];
							return (
								<tr key={virtualRow.index}>
									{columns.map((col) => (
										<td  key={`${virtualRow.index}-${col}`}>
											{formatCellValue(row[col])}
										</td>
									))}
								</tr>
							);
						})}
						{paddingBottom > 0 && (
							<tr>
								<td colSpan={Math.max(columns.length, 1)} style={{ height: `${paddingBottom}px` }} />
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
});

VirtualizedTable.displayName = "VirtualizedTable";

export default VirtualizedTable;

import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import type { TableRow } from "../types";

export const useVitrualTable = (rows: TableRow[]) => {

    const parentRef = useRef<HTMLDivElement>(null);
    const columns = rows.length > 0 ? (Object.keys(rows[0]) as string[]) : [];

    const rowVirtualizer = useVirtualizer({
        count: rows.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 48,
        overscan: 10,
    });

    const virtualRows = rowVirtualizer.getVirtualItems();
    const totalSize = rowVirtualizer.getTotalSize();

    const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
    const paddingBottom = virtualRows.length > 0
        ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
        : 0;


    return {
        paddingTop,
        paddingBottom,
        columns,
        parentRef,
        virtualRows
    };
}   

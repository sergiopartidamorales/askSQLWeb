// Utility function to format cell values
export const formatCellValue = (value: unknown): string => {
	// Handle null or undefined
	if (value === null || value === undefined) {
		return "";
	}

	// Handle Date objects
	if (value instanceof Date) {
		return value.toLocaleDateString("en-GB", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	}

	// Handle ISO date strings (e.g., "2024-01-15T10:30:00Z")
	if (typeof value === "string") {
		const dateRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?)?$/;
		if (dateRegex.test(value)) {
			const date = new Date(value);
			if (!isNaN(date.getTime())) {
				return date.toLocaleDateString("en-GB", {
					year: "numeric",
					month: "short",
					day: "numeric",
					hour: "2-digit",
					minute: "2-digit",
				});
			}
		}
	}

	// Handle numbers
	if (typeof value === "number") {
		return value.toLocaleString("en-GB");
	}

	// Handle booleans
	if (typeof value === "boolean") {
		return value ? "Yes" : "No";
	}

	// Return as string for everything else
	return String(value);
};

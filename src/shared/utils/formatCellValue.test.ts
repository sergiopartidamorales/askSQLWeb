import { describe, it, expect } from "vitest";
import { formatCellValue } from "./formatCellValue";

describe("formatCellValue", () => {
  it("handles nullish values", () => {
    expect(formatCellValue(null)).toBe("");
    expect(formatCellValue(undefined)).toBe("");
  });

  it("formats numbers and booleans", () => {
    expect(formatCellValue(12345)).toBe("12,345");
    expect(formatCellValue(true)).toBe("Yes");
    expect(formatCellValue(false)).toBe("No");
  });

  it("returns strings as-is when not dates", () => {
    expect(formatCellValue("plain text")).toBe("plain text");
  });
});

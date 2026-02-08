import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import VirtualizedTable from './virtualizedTable';
import type { TableRow } from '../types';

vi.mock('../hooks/useVitrualTable', () => ({
  useVitrualTable: (rows: TableRow[]) => ({
    paddingTop: 0,
    paddingBottom: 0,
    columns: rows.length > 0 ? Object.keys(rows[0]) : [],
    parentRef: { current: null },
    virtualRows: rows.map((_, index) => ({ index })),
  }),
}));

describe('VirtualizedTable', () => {
  const mockRows: TableRow[] = [
    { id: '1', name: 'John', email: 'john@example.com', status: 'Active', active: true, count: 12 },
    { id: '2', name: 'Jane', email: 'jane@example.com', status: 'Inactive' },
    { id: '3', name: 'Bob', email: 'bob@example.com', status: 'Active' },
    { id: '4', name: 'Alice', email: 'alice@example.com', status: 'Pending' },
    { id: '5', name: 'Charlie', email: 'charlie@example.com', status: 'Active' },
  ];

  describe('Rendering', () => {
    it('should render table with header row', () => {
      const { container } = render(<VirtualizedTable rows={mockRows} />);
      const headers = container.querySelectorAll('th');
      expect(headers.length).toBeGreaterThan(0);
      expect(headers[0].textContent).toBe('id');
    });

    it('should render table structure', () => {
      const { container } = render(<VirtualizedTable rows={mockRows} />);
      expect(container.querySelector('table')).toBeInTheDocument();
      expect(container.querySelector('thead')).toBeInTheDocument();
      expect(container.querySelector('tbody')).toBeInTheDocument();
    });

    it('formats cell values using formatter', () => {
      render(<VirtualizedTable rows={mockRows} />);
      expect(screen.getByText('Yes')).toBeInTheDocument();
      expect(screen.getByText('12')).toBeInTheDocument();
    });

  });


});

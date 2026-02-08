# AskSqlWeb Client Agent

## Demo
If your Markdown viewer supports it, the video should play inline. Otherwise, use the link below.

<video src="demo.mp4" controls></video>
[Download the demo video](demo.mp4)


## Solution Architecture

High-level pieces:
- Query input and status UI.
- SSE stream processing for status, SQL chunks, and completion payloads.
- Virtualized table rendering for large result sets.
- Feature module + shared layer separation for maintainability.

## Data Flow

1. User enters a natural language prompt.
2. `useTableBuilder` triggers `submitQuery()`.
3. `tableBulderServcie.postTableDataWithSSE()` starts the request.
4. `postApiWithSSE()` opens HTTP POST + SSE stream.
5. `processSSEStream()` reads stream chunks.
6. `handleSSEEvent()` routes events to callbacks.
7. Hook updates state based on event type:
   - `onStatus` -> `setStatusMessage()`
   - `onSqlChunk` -> `setStreamingSQL(prev => prev + chunk)`
   - `onComplete` -> `setDataQuery()`
   - `onError` -> `setError()`
8. React re-renders the UI.
9. `VirtualizedTable` displays the results.

## Project Structure

```
client-agent/
├── src/
│   ├── main.tsx                      # Application entry point
│   ├── modules/                      # Feature modules (bounded contexts)
│   │   └── tableBuilder/             # Natural language to SQL feature
│   │       ├── components/           # UI components
│   │       │   ├── tableBuilder.tsx          # Main container component
│   │       │   ├── queryBuilder/             # Query form and streaming UI
│   │       │   │   ├── queryForm.tsx         # Input form
│   │       │   │   ├── generateQuery.tsx     # SQL streaming display
│   │       │   │   └── streamViewer.tsx      # Status messages
│   │       │   └── table/
│   │       │       └── generateTable.tsx     # Table wrapper
│   │       ├── hooks/
│   │       │   └── useTableBuilder.ts        # State & logic hook
│   │       ├── service/
│   │       │   └── tableBulderServcie.ts     # API service layer
│   │       └── components/
│   │           └── tableBuilder.module.scss  # Module styles
│   └── shared/                       # Shared/reusable code
│       ├── api/                      # API client infrastructure
│       │   ├── dataAccess.ts         # HTTP + SSE client
│       │   └── helpers/
│       │       ├── handleSSEEvent.ts         # SSE event router
│       │       └── processSSEStream.ts       # Stream parser
│       ├── components/               # Reusable UI components
│       │   ├── virtualizedTable.tsx          # High-performance table
│       │   └── virtualizedTable.module.scss
│       ├── hooks/
│       │   └── useVitrualTable.ts            # Table virtualization logic
│       ├── types/
│       │   └── index.ts                      # TypeScript definitions
│       └── utils/
│           ├── formatCellValue.ts            # Data formatting
│           └── handleRequest.ts              # Request utilities
├── vitest.config.ts                  # Test configuration
└── package.json
```

## Server-Sent Events (SSE) Architecture

Why SSE:
- Progressive SQL generation.
- Real-time status updates.
- Incremental results delivery.
- Immediate error feedback.

SSE event types handled:

1. `status`
```typescript
event: status
data: {"message": "Analyzing schema...", "step": 1}
```

2. `sql-chunk`
```typescript
event: sql-chunk
data: {"chunk": "SELECT * FROM "}
```

3. `complete`
```typescript
event: complete
data: {
  "query": "SELECT * FROM users WHERE active = true",
  "data": [{"id": 1, "name": "John"}, ...]
}
```

4. `error`
```typescript
event: error
data: {"message": "Invalid table name"}
```

## Key Design Patterns

- Feature Module Pattern: `tableBuilder` is self-contained with components, hooks, service, and styles.
- Service Layer Pattern: Components -> Hooks -> Services -> API Client.
- Custom Hooks: `useTableBuilder` and `useVitrualTable` isolate state and logic.
- Callback-Based SSE: type-safe callbacks for status, SQL chunks, completion, and errors.
- Component Composition: clear container + leaf components for form, stream view, and results.

## Performance Optimizations

- Virtual scrolling with `@tanstack/react-virtual` to render only visible rows.
- Memoized table rendering to avoid unnecessary re-renders.
- Incremental SQL rendering for immediate feedback.
- Scroll-synced header/body to keep columns aligned.

## Styling Approach

- CSS Modules for scoped, type-safe styles.
- Shared module styles in `tableBuilder.module.scss`.
- Responsive rules for smaller viewports.

## Testing Strategy

```bash
npm test            # Vitest in watch mode
npm run test:ui     # Vitest UI
npm run test:coverage
```

## Development

Prerequisites:
- Node.js 18+ recommended.
- npm.

Setup:
```bash
npm install
npm run dev         # Start dev server 
```

## Environment Variables

Create `.env` in `client-agent/`:
```env
VITE_API_BASE=http://localhost:8080/api
```

## Type Safety

- Shared API types live in `src/shared/types/index.ts`.
- Component props and hook signatures are explicitly typed.
- SSE event payloads are parsed and validated in one place.

## Key Features

1. Real-time SQL generation.
2. Progressive status and results streaming.
3. High-performance virtualized tables.
4. Responsive UI.
5. End-to-end TypeScript typing.
6. Unit and component tests with Vitest.
7. Accessible markup and roles in UI components.

## Future Enhancements

- Query history and bookmarks.
- SQL syntax highlighting in streaming display.
- Export results (CSV, JSON, Excel).
- Advanced filtering and sorting in table.
- Dark mode support.
- WebSocket fallback for SSE.
- Retry logic for failed requests.
- Caching frequently used queries.

## License

UNLICENSED (private package)

Built with: React 19, TypeScript, Vite, Sass, Vitest.



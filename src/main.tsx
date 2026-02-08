import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import TableBuilder from './modules/tableBuilder/components/tableBuilder.tsx'
 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TableBuilder />
  </StrictMode>,
)

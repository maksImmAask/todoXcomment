import { useState } from 'react'
import { Table, Pagination } from '@mantine/core'

export const PaginatedTable = ({ columns, rows, pageSize = 10 }) => {
  const [page, setPage] = useState(1)
  const paginatedRows = rows.slice((page - 1) * pageSize, page * pageSize)

  return (
    <>
      <Table>
        <Table.Thead>
          <Table.Tr>
            {columns.map((col) => (
              <Table.Th key={col}>{col}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {paginatedRows}
        </Table.Tbody>
      </Table>
      <Pagination
        value={page}
        onChange={setPage}
        total={Math.ceil(rows.length / pageSize)}
        mt="md"
        position="center"
      />
    </>
  )
}
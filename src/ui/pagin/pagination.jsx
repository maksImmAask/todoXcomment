import { useState } from 'react'
import { Table as TableM, Pagination } from '@mantine/core'

export const PaginatedTable = ({ column = [], rows = [], pageSize = 10 }) => {
  const [page, setPage] = useState(1)
  const total = Math.ceil(rows.length / pageSize)
  const paginatedRows = rows.slice((page - 1) * pageSize, page * pageSize)

  return (
    <>
      <TableM
        striped
        highlightOnHover
        withTableBorder
        withColumnBorders
        sx={{ tableLayout: 'fixed' }}
      >
        <TableM.Thead>
          <TableM.Tr>
            {column.map((el, index) => (
              <TableM.Th key={index}>{el}</TableM.Th>
            ))}
          </TableM.Tr>
        </TableM.Thead>
        <TableM.Tbody>
          {paginatedRows}
        </TableM.Tbody>
      </TableM>
      {total > 1 && (
        <Pagination
          value={page}
          onChange={setPage}
          total={total}
          mt="md"
          position="center"
        />
      )}
    </>
  )
}
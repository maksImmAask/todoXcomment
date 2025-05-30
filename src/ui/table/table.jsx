import { Table as TableM } from '@mantine/core'

export const Table = ({ column = [], rows }) => {
  return (
    <TableM striped highlightOnHover withTableBorder withColumnBorders>
      <TableM.Thead>
        <TableM.Tr>
          {column.map((el, index) => (
            <TableM.Th key={index}>{el}</TableM.Th>
          ))}
        </TableM.Tr>
      </TableM.Thead>
      <TableM.Tbody>
        {rows}
      </TableM.Tbody>
    </TableM>
  )
}

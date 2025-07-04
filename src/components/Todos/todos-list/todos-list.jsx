import { useNavigate } from 'react-router-dom'
import {
  Button,
  Flex,
  Stack,
  Title,
  Table as TableM,
  Checkbox,
  ActionIcon,
  Loader,
  Center,
} from '@mantine/core'
import { Table } from '../../../ui/table/table.jsx'
import {
  HiArchiveBoxXMark,
  HiMiniPencilSquare,
  HiMiniPlusCircle,
} from 'react-icons/hi2'
import { modals } from '@mantine/modals'
import { TodosEdit } from '../todos-edit/todos-edit.jsx'
import { TodosCreate } from '../todos-create/todos-create.jsx'
import { TodosDelete } from '../todos-delete/todos-delete.jsx'
import { useTodosList } from '../../../hooks/todos/use-todos-list/use-todos-list.jsx'
import { useEffect, useState } from 'react'

export const TodosList = () => {
  const { todos, removeTodo, updateTodo, addTodo } = useTodosList()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    setTimeout(() => setLoading(false), 300)
  }, [])

  const createFn = () => {
    modals.open({
      children: <TodosCreate addTodo={addTodo} />,
      title: 'Create todo',
    })
  }

  const deleteFn = (id) => {
    modals.open({
      children: <TodosDelete id={id} removeTodo={removeTodo} />,
      title: 'Delete todo',
    })
  }

  const editFn = (id) => {
    modals.open({
      children: <TodosEdit id={id} updateTodo={updateTodo} />,
      title: 'Редактировать todo',
    })
  }

  const goBack = () => {
    navigate('/')
  }

  const rows = todos.map((element) => (
    <TableM.Tr key={element.id}>
      <TableM.Td>{element.id}</TableM.Td>
      <TableM.Td>{element.userId}</TableM.Td>
      <TableM.Td>{element.todo}</TableM.Td>
      <TableM.Td>
        <Checkbox readOnly checked={element.completed} />
      </TableM.Td>
      <TableM.Td>
        <ActionIcon p={2} onClick={() => deleteFn(element.id)}>
          <HiArchiveBoxXMark size={30} />
        </ActionIcon>
        <ActionIcon ml={8} p={2} onClick={() => editFn(element.id)}>
          <HiMiniPencilSquare size={30} />
        </ActionIcon>
      </TableM.Td>
    </TableM.Tr>
  ))

  if (loading) {
    return (
      <Center h="60vh">
        <Loader size="lg" />
      </Center>
    )
  }

  return (
    <Stack gap={12} p={20}>
      <Flex gap={12} align={'center'}>
        <Button onClick={goBack}>Back</Button>
        <Title>Todos list</Title>
        <Button
          ml="auto"
          rightSection={<HiMiniPlusCircle />}
          onClick={createFn}
        >
          Create todo
        </Button>
      </Flex>

      <Table column={['ID', 'User Id', 'Todo', 'Completed']} rows={rows} />
    </Stack>
  )
}

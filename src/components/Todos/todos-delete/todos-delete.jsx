import { api } from '../../../api/api.js'
import { Button, Flex, Stack, Title } from '@mantine/core'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'

export const TodosDelete = ({ id, removeTodo }) => {
  const deleteTodo = async () => {
    try {
      await api.delete(`todos/${id}`)
      if (removeTodo) {
        removeTodo(id)
      }
      modals.closeAll()
    } catch (error) {
      notifications.show({
        color: 'red',
        title: 'Error',
        message: 'An error occurred while deleting the todo.',
      })
      modals.closeAll()
    }
  }

  return (
    <Stack gap={20}>
      <Title order={4}>Вы уверены что хотите удалить Todo?</Title>
      <Flex justify="end" gap={10}>
        <Button variant="default" onClick={() => modals.closeAll()}>
          Отмена
        </Button>
        <Button color="blue" onClick={deleteTodo}>
          Удалить
        </Button>
      </Flex>
    </Stack>
  )
}

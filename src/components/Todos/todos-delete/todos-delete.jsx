import { Button, Flex, Stack, Title } from '@mantine/core'
import { modals } from '@mantine/modals'

export const TodosDelete = ({ id, removeTodo }) => {
  const deleteTodo = () => {
    fetch(`https://dummyjson.com/todos/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        if (removeTodo) {
          removeTodo(id)
        }
        modals.closeAll()
      })
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

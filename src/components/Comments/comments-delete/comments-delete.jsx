import { api } from '../../../api/api.js'
import { Button, Flex, Stack, Title } from '@mantine/core'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'

export const CommentsDelete = ({ id, removeComment }) => {
  const deleteComment = async () => {
    try {
      await api.delete(`comments/${id}`)
      if (removeComment) {
        removeComment(id)
      }
      modals.closeAll()
    } catch (error) {
      notifications.show({
        color: 'red',
        title: 'Error',
        message: 'An error occurred while deleting the comment.',
      })
      modals.closeAll()
    }
  }

  return (
    <Stack gap={20}>
      <Title order={4}>Вы уверены что хотите удалить комментарий?</Title>
      <Flex justify="end" gap={10}>
        <Button variant="default" onClick={() => modals.closeAll()}>
          Отмена
        </Button>
        <Button color="blue" onClick={deleteComment}>
          Удалить
        </Button>
      </Flex>
    </Stack>
  )
}
import { api } from '../../../../api/api.js'
import { Button, Text } from '@mantine/core'
import { modals } from '@mantine/modals'

export const CommentsDelete = ({ id, removeComment }) => {
  const fetchDeleteComment = async () => {
    await api.delete(`comments/${id}`)
  }

  const deleteFn = async () => {
    await fetchDeleteComment()
    if (removeComment) {
      removeComment(id)
    }
    modals.closeAll()
  }

  return (
    <>
      <Text>Удалить этот комментарий?</Text>
      <Button color="red" mt="md" onClick={deleteFn}>
        Удалить
      </Button>
    </>
  )
}

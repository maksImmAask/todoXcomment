import { api } from '../../../api/api.js'
import { Button, Flex, Stack, Title } from '@mantine/core'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'

export const PostsDelete = ({ id, removePost }) => {
  const deletePost = async () => {
    try {
      await api.delete(`posts/${id}`)
      if (removePost) {
        removePost(id)
      }
      modals.closeAll()
    } catch (error) {
      notifications.show({
        color: 'red',
        title: 'Error',
        message: 'An error occurred while deleting the post.',
      })
      modals.closeAll()
    }
  }

  return (
    <Stack gap={20}>
      <Title order={4}>Are you sure you want to delete this post?</Title>
      <Flex justify="end" gap={10}>
        <Button variant="default" onClick={() => modals.closeAll()}>
          Cancel
        </Button>
        <Button color="blue" onClick={deletePost}>
          Delete
        </Button>
      </Flex>
    </Stack>
  )
}
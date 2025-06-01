import { api } from '../../../api/api.js'
import { CommentsForm } from '../comments-form/comments-form.jsx'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'

export const CommentsCreate = ({ addComment }) => {
  const fetchCreateComment = async (body) => {
    const { data } = await api.post('comments', body)
    return data
  }

  const createFn = async (body) => {
    try {
      const preparedBody = {
        ...body,
        userId: Number(body.userId),
        postId: Number(body.postId),
      }
      const newComment = await fetchCreateComment(preparedBody)
      if (addComment) {
        addComment(newComment)
      }
      modals.closeAll()
    } catch (error) {
      notifications.show({
        color: 'red',
        title: 'Error',
        message: 'An error occurred while creating the comment.',
      })
      modals.closeAll()
    }
  }

  return <CommentsForm title="Добавить" submitFn={createFn} />
}

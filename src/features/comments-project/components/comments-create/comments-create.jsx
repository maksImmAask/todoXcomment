import { api } from '../../../../api/api.js'
import { CommentsForm } from '../comments-form/comments-form.jsx'
import { modals } from '@mantine/modals'

export const CommentsCreate = ({ addComment }) => {
  const fetchCreateComment = async (body) => {
    const { data } = await api.post('comments/add', body)
    return data
  }

  const createFn = async (body) => {
    const newComment = await fetchCreateComment(body)
    if (addComment) {
      addComment(newComment)
    }
    modals.closeAll()
  }

  return <CommentsForm title="Добавить" submitFn={createFn} />
}

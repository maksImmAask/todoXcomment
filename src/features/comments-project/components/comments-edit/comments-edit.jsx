import { api } from '../../../../api/api.js'
import { CommentsForm } from '../comments-form/comments-form.jsx'
import { modals } from '@mantine/modals'

export const CommentsEdit = ({ comment, updateComment }) => {
  const fetchEditComment = async (body) => {
    const { data } = await api.put(`comments/${comment.id}`, body)
    return data
  }

  const editFn = async (body) => {
    const updatedComment = await fetchEditComment(body)
    if (updateComment) {
      updateComment(updatedComment)
    }
    modals.closeAll()
  }

  return <CommentsForm title="Редактировать" submitFn={editFn} defaultValues={comment} />
}

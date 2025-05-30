import { useEffect, useState } from 'react'
import { api } from '../../../api/api.js'
import { CommentsForm } from '../comments-form/comments-form.jsx'
import { modals } from '@mantine/modals'

export const CommentsEdit = ({ id, updateComment }) => {
  const [data, setData] = useState(null)

  const fetchComment = async () => {
    const { data } = await api(`comments/${id}`)
    setData(data)
  }

  const fetchEditComment = async (body) => {
    const { data } = await api.put(`comments/${id}`, body)
    return data
  }

  useEffect(() => {
    fetchComment()
  }, [id])

  const editFn = async (values) => {
    const updated = await fetchEditComment(values)
    if (updateComment) {
      updateComment(updated)
    }
    modals.closeAll()
  }

  return (
    <>
      {data !== null && (
        <CommentsForm
          title="Редактировать"
          submitFn={editFn}
          defaultValues={data}
        />
      )}
    </>
  )
}

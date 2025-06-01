import { useEffect, useState } from 'react'
import { api } from '../../../api/api.js'
import { PostsForm } from '../posts-form/posts-form.jsx'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'

export const PostsEdit = ({ id, updatePost }) => {
  const [data, setData] = useState(null)

  const fetchPost = async () => {
    const { data } = await api(`posts/${id}`)
    setData(data)
  }

  const fetchEditPost = async (body) => {
    const { data } = await api.put(`posts/${id}`, body)
    return data
  }

  useEffect(() => {
    fetchPost()
  }, [id])

  const editFn = async (values) => {
    try {
      const updated = await fetchEditPost(values)
      if (updatePost) {
        updatePost(updated)
      }
      modals.closeAll()
    } catch (error) {
      notifications.show({
        color: 'red',
        title: 'Error',
        message: 'An error occurred while editing the post.',
      })
      modals.closeAll()
    }
  }

  return (
    <>
      {data !== null && (
        <PostsForm
          title="Edit"
          submitFn={editFn}
          defaultValues={data}
        />
      )}
    </>
  )
}
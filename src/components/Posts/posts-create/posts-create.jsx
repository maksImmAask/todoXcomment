import { api } from '../../../api/api.js'
import { PostsForm } from '../posts-form/posts-form.jsx'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'

export const PostsCreate = ({ addPost }) => {
  const fetchCreatePost = async (body) => {
    const { data } = await api.post('posts/add', body)
    return data
  }

  const createFn = async (body) => {
    try {
      const newPost = await fetchCreatePost(body)
      if (addPost) {
        addPost(newPost)
      }
      modals.closeAll()
    } catch (error) {
      notifications.show({
        color: 'red',
        title: 'Error',
        message: 'An error occurred while creating the post.',
      })
      modals.closeAll()
    }
  }

  return <PostsForm title="Create" submitFn={createFn} />
}
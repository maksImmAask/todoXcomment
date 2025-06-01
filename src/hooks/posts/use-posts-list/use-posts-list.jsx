import { useState, useEffect } from 'react'
import { api } from '../../../api/api.js'

export const usePostsList = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    api('posts').then(({ data }) => setPosts(data.posts))
  }, [])

  return { posts, setPosts }
}
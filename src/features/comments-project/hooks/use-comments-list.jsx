import { useState, useEffect } from 'react'
import { api } from '../../../api/api.js'

export const useCommentsList = () => {
  const [comments, setComments] = useState([])

  const fetchComments = async () => {
    try {
      const { data } = await api.get('comments')
      setComments(data.comments || data)
    } catch (error) {
      console.error('Failed to fetch comments', error)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  return {
    comments,
    setComments,
  }
}

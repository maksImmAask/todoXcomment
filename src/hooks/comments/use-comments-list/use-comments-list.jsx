import { useState, useEffect } from 'react'
import { api } from '../../../api/api.js'

export const useCommentsList = () => {
  const [comments, setComments] = useState([])

  const fetchComments = async () => {
    try {
      const { data } = await api.get('comments')
      setComments(data.comments || data)
    } catch {
      <Notification title="Error" color="red">
        Failed to fetch comments. Please try again later.
      </Notification>
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

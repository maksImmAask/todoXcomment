import React from 'react'
import { Button, Flex, Stack, Title, ActionIcon } from '@mantine/core'
import { modals } from '@mantine/modals'
import { HiMiniPencilSquare, HiMiniPlusCircle, HiArchiveBoxXMark } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom' 
import { useCommentsList } from '../../hooks/use-comments-list.jsx'
import { CommentsCreate } from '../comments-create/comments-create.jsx'
import { CommentsEdit } from '../comments-edit/comments-edit.jsx'
import { CommentsDelete } from '../comments-delete/comments-delete.jsx'

export default function CommentsList() {
  const { comments, setComments } = useCommentsList()
  const navigate = useNavigate()

  const addComment = (newComment) => {
    setComments((prev) => [newComment, ...prev])
  }

  const updateComment = (updated) => {
    setComments((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    )
  }

  const removeComment = (id) => {
    setComments((prev) => prev.filter((c) => c.id !== id))
  }

  const openCreateModal = () => {
    modals.open({
      title: 'Create Comment',
      children: <CommentsCreate addComment={addComment} onClose={() => modals.closeAll()} />,
    })
  }

  const openEditModal = (comment) => {
    modals.open({
      title: 'Edit Comment',
      children: (
        <CommentsEdit
          comment={comment}
          updateComment={updateComment}
          onClose={() => modals.closeAll()}
        />
      ),
    })
  }

  const openDeleteModal = (id) => {
    modals.open({
      title: 'Delete Comment',
      children: (
        <CommentsDelete id={id} removeComment={removeComment} onClose={() => modals.closeAll()} />
      ),
    })
  }

  return (
    <Stack p={20} gap={12}>
      <Flex align="center" gap={12}>
        <Title order={2}>Comments List</Title>

      
        <Button variant="outline" onClick={() => navigate('/')}>
          Back
        </Button>

        <Button
          ml="auto"
          rightSection={<HiMiniPlusCircle />}
          onClick={openCreateModal}
        >
          Create Comment
        </Button>
      </Flex>

      {comments.length === 0 ? (
        <p>No comments found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>ID</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>User ID</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Post ID</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Body</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr key={comment.id}>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{comment.id}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                  {comment.user ? comment.user.id || comment.user : '—'}
                </td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{comment.postId}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{comment.body}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                  <ActionIcon onClick={() => openDeleteModal(comment.id)} color="red" mr={8}>
                    <HiArchiveBoxXMark size={24} />
                  </ActionIcon>
                  <ActionIcon onClick={() => openEditModal(comment)} color="blue">
                    <HiMiniPencilSquare size={24} />
                  </ActionIcon>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Stack>
  )
}

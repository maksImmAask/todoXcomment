import { useNavigate } from 'react-router-dom'
import {
  Button,
  Flex,
  Stack,
  Title,
  Table as TableM,
  ActionIcon,
} from '@mantine/core'
import { Table } from '../../../ui/table/table.jsx'
import {
  HiArchiveBoxXMark,
  HiMiniPencilSquare,
  HiMiniPlusCircle,
} from 'react-icons/hi2'
import { modals } from '@mantine/modals'
import { CommentsEdit } from '../comments-edit/comments-edit.jsx'
import { CommentsCreate } from '../comments-create/comments-create.jsx'
import { CommentsDelete } from '../comments-delete/comments-delete.jsx'
import { useCommentsList } from '../../../hooks/comments/use-comments-list/use-comments-list.jsx'

export const CommentsList = () => {
  const { comments, setComments } = useCommentsList()
  const navigate = useNavigate()

  const addComment = (newComment) => setComments((prev) => [newComment, ...prev])
  const updateComment = (updated) => setComments((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))
  const removeComment = (id) => setComments((prev) => prev.filter((c) => c.id !== id))

  const createFn = () => {
    modals.open({
      children: <CommentsCreate addComment={addComment} />,
      title: 'Create comment',
    })
  }

  const deleteFn = (id) => {
    modals.open({
      children: <CommentsDelete id={id} removeComment={removeComment} />,
      title: 'Delete comment',
    })
  }

  const editFn = (id) => {
    modals.open({
      children: <CommentsEdit id={id} updateComment={updateComment} />,
      title: 'Редактировать comment',
    })
  }

  const goBack = () => {
    navigate('/')
  }

  const rows = comments.map((element) => (
    <TableM.Tr key={element.id}>
      <TableM.Td>{element.id}</TableM.Td>
      <TableM.Td>{element.user ? element.user.id || element.user : '—'}</TableM.Td>
      <TableM.Td>{element.postId}</TableM.Td>
      <TableM.Td>{element.body}</TableM.Td>
      <TableM.Td>
        <ActionIcon p={2} onClick={() => deleteFn(element.id)}>
          <HiArchiveBoxXMark size={30} />
        </ActionIcon>
        <ActionIcon ml={8} p={2} onClick={() => editFn(element.id)}>
          <HiMiniPencilSquare size={30} />
        </ActionIcon>
      </TableM.Td>
    </TableM.Tr>
  ))

  return (
    <Stack gap={12} p={20}>
      <Flex gap={12} align={'center'}>
        <Button onClick={goBack}>Back</Button>
        <Title>Comments list</Title>
        <Button ml="auto" rightSection={<HiMiniPlusCircle />} onClick={createFn}>
          Create comment
        </Button>
      </Flex>
      <Table column={['ID', 'User Id', 'Post Id', 'Body', 'Actions']} rows={rows} />
    </Stack>
  )
}
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button, Flex, Stack, Title, ActionIcon, Card, Text, Grid, Loader, Center } from '@mantine/core'
import { HiArchiveBoxXMark, HiMiniPencilSquare, HiMiniPlusCircle } from 'react-icons/hi2'
import { modals } from '@mantine/modals'
import { usePostsList } from '../../../hooks/posts/use-posts-list/use-posts-list.jsx'
import { PostsCreate } from '../posts-create/posts-create.jsx'
import { PostsEdit } from '../posts-edit/posts-edit.jsx'
import { PostsDelete } from '../posts-delete/posts-delete.jsx'
import { api } from '../../../api/api.js'

export const PostsList = () => {
  const { posts, setPosts } = usePostsList()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    api('users')
      .then(({ data }) => setUsers(data.users))
      .finally(() => setLoading(false))
  }, [])

  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId)
    return user ? user.name : userId
  }

  const addPost = (newPost) => setPosts((prev) => [newPost, ...prev])
  const updatePost = (updated) => setPosts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
  const removePost = (id) => setPosts((prev) => prev.filter((p) => p.id !== id))

  const createFn = () => {
    modals.open({
      children: <PostsCreate addPost={addPost} />,
      title: 'Create post',
    })
  }

  const deleteFn = (id) => {
    modals.open({
      children: <PostsDelete id={id} removePost={removePost} />,
      title: 'Delete post',
    })
  }

  const editFn = (id) => {
    modals.open({
      children: <PostsEdit id={id} updatePost={updatePost} />,
      title: 'Edit post',
    })
  }

  const goBack = () => navigate('/')

  const CARD_HEIGHT = 260

  if (loading) {
    return (
      <Center h="60vh">
        <Loader size="lg" />
      </Center>
    )
  }

  return (
    <Stack gap={12} p={20}>
      <Flex gap={12} align="center">
        <Button onClick={goBack}>Back</Button>
        <Title>Posts list</Title>
        <Button ml="auto" rightSection={<HiMiniPlusCircle />} onClick={createFn}>
          Create post
        </Button>
      </Flex>
      <Grid gutter="md">
        {posts.slice(0, 30).map((post) => (
          <Grid.Col span={4} key={post.id}>
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              style={{
                height: CARD_HEIGHT,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <Flex justify="space-between" align="center" mb={8}>
                  <Title order={4} style={{ wordBreak: 'break-word' }}>{post.title}</Title>
                  <Flex gap={4}>
                    <ActionIcon onClick={() => editFn(post.id)} color="blue">
                      <HiMiniPencilSquare size={22} />
                    </ActionIcon>
                    <ActionIcon onClick={() => deleteFn(post.id)} color="blue">
                      <HiArchiveBoxXMark size={22} />
                    </ActionIcon>
                  </Flex>
                </Flex>
                <Text
                  mb={8}
                  style={{
                    wordBreak: 'break-word',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {post.body}
                </Text>
              </div>
              <Text size="xs" color="dimmed">User: {getUserName(post.userId)}</Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  )
}
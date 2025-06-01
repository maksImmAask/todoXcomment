import { Flex, List } from '@mantine/core'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

const Home = () => {
  return (
    <Flex justify={'center'} align={'center'} h={'100vh'}>
      <List>
        <Flex gap={12}>
          <List.Item>Привет выбери то что нужно!</List.Item>
          <List.Item>
            <Link to={ROUTES.TODOS}>Todos</Link>
          </List.Item>
          <List.Item>
            <Link to={ROUTES.COMMENTS}>Comments</Link>
          </List.Item>
          <List.Item>
            <Link to={ROUTES.POSTS}>Posts</Link>
          </List.Item>
        </Flex>
      </List>
    </Flex>
  )
}

export default Home


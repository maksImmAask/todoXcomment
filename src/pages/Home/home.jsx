import { Flex, List } from '@mantine/core'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <Flex justify={'center'} align={'center'} h={'100vh'}>
      <List>
        <Flex gap={12}>
          <List.Item>Привет выбери то что нужно!</List.Item>
          <List.Item>
            <Link to="/todos">Todos</Link>
          </List.Item>
          <List.Item>
            <Link to="/comments">Comments</Link>
          </List.Item>
        </Flex>
      </List>
    </Flex>
  )
}

export default Home


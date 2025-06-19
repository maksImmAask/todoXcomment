import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { useGetInfinityProducts } from './queries'

const TsLearningPage = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetInfinityProducts(10)
  const { ref, inView } = useInView({
    threshold: 0.5,
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <div className="body">
      <div className="top">
        <h1>Products</h1>
        <button>Создать</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>User ID</th>
            <th>Todo</th>
            <th>Actives</th>
          </tr>
        </thead>
        <tbody>
          {data?.pages.map((page) =>
            page.todos.map((el) => (
              <tr key={el.id}>
                <td>{el.id}</td>
                <td>{el.userId}</td>
                <td>{el.todo}</td>
                <td className="actives">
                  <button>Обновить</button>
                  <button>удалить</button>
                </td>
              </tr>
            )),
          )}
        </tbody>
      </table>
      <div
        ref={ref}
        style={{ width: '100%', height: '20px', background: 'blue' }}
      />
    </div>
  )
}

export default TsLearningPage
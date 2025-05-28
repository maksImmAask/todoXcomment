import { useEffect, useState } from 'react'
import { TodosForm } from '../todos-form/todos-form'
import { api } from '../../../../../api/api.js'
import { modals } from '@mantine/modals'

export const TodosEdit = ({ id, updateTodo }) => {
  const [data, setData] = useState(null)

  const fetchTodo = async () => {
    const { data } = await api(`todos/${id}`)
    setData(data)
  }

  const fetchEditTodo = async (body) => {
    const res = await fetch(`https://dummyjson.com/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    return data
  }

  useEffect(() => {
    fetchTodo()
  }, [id])

  const editFn = async (values) => {
    const updated = await fetchEditTodo(values)
    if (updateTodo) {
      updateTodo(updated)
    }
    modals.closeAll()
  }

  return (
    <>
      {data !== null && (
        <TodosForm
          title="Сохранить"
          submitFn={editFn}
          initialValues={{
            todo: data.todo,
            completed: data.completed,
            userId: data.userId > 30 ? null : String(data.userId),
          }}
        />
      )}
    </>
  )
}
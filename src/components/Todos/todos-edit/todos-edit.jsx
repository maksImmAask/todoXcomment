import { useEffect, useState } from 'react'
import { TodosForm } from '../todos-form/todos-form.jsx'
import { api } from '../../../api/api.js'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'

export const TodosEdit = ({ id, updateTodo }) => {
  const [data, setData] = useState(null)

  const fetchTodo = async () => {
    const { data } = await api(`todos/${id}`)
    setData(data)
  }

  const fetchEditTodo = async (body) => {
    const { data } = await api.put(`todos/${id}`, body)
    return data
  }

  useEffect(() => {
    fetchTodo()
  }, [id])

  const editFn = async (values) => {
    try {
      const updated = await fetchEditTodo(values)
      if (updateTodo) {
        updateTodo(updated)
      }
      modals.closeAll()
    } catch (error) {
      notifications.show({
        color: 'red',
        title: 'Error',
        message: 'An error occurred while editing the todo.',
      })
      modals.closeAll()
    }
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
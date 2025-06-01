import { api } from '../../../api/api.js'
import { TodosForm } from '../todos-form/todos-form.jsx'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'

export const TodosCreate = ({ addTodo }) => {
  const fetchCreateTodo = async (body) => {
    const { data } = await api.post('todos/add', body)
    return data
  }

  const createFn = async (body) => {
    try {
      const newTodo = await fetchCreateTodo(body)
      if (addTodo) {
        addTodo(newTodo)
      }
      modals.closeAll()
    } catch (error) {
      notifications.show({
        color: 'red',
        title: 'Error',
        message: 'An error occurred while creating the todo.',
      })
      modals.closeAll()
    }
  }

  return <TodosForm title="Добавить" submitFn={createFn} />
}

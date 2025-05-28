import { api } from '../../../../../api/api.js'
import { TodosForm } from '../todos-form/todos-form'
import { modals } from '@mantine/modals'

export const TodosCreate = ({ addTodo }) => {
  const fetchCreateTodo = async (body) => {
    const { data } = await api.post('todos/add', body)
    return data
  }

  const createFn = async (body) => {
    const newTodo = await fetchCreateTodo(body)
    if (addTodo) {
      addTodo(newTodo)
    }
    modals.closeAll()
  }

  return <TodosForm title="Добавить" submitFn={createFn} />
}

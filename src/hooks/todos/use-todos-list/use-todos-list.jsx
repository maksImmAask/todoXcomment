import { useEffect, useState } from 'react'
import { api } from '../../../api/api'

export const useTodosList = () => {
  const [todos, setTodos] = useState([])

  const fetchTodos = async () => {
    const { data } = await api('todos')
    setTodos(data.todos)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const updateTodo = (updatedTodo) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      )
    )
  }

  const addTodo = (newTodo) => {
    setTodos((prev) => [newTodo, ...prev])
  }

  return { todos, removeTodo, updateTodo, addTodo }
}

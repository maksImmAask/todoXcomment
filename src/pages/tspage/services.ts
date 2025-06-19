import { api } from '../../api/api'
import type { Products } from './types.ts'

export async function getProducts({
  skip = 0,
  limit = 0,
}: {
  skip: number
  limit: number
}) {
  const { data } = await api<{
    todos: Products[]
    skip: number
    limit: number
    total: number
  }>('todos', {
    params: { limit, skip },
  })
  return data
}

export async function deleteProduct(id: number) {
  const { data } = await api.delete(`todos/${id}`)
  return data
}
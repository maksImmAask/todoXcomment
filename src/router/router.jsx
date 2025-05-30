import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/home/home.jsx'
import TodosListPage from '../pages/Todos/todos-list.jsx'
import CommentsListPage from '../pages/comments/comments.jsx' 



import { ROUTES } from '../constants/routes.js'

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    path: ROUTES.TODOS,
    element: <TodosListPage />,
  },
  {
    path: ROUTES.COMMENTS,
    element: <CommentsListPage />,
  },
])
import { createBrowserRouter } from 'react-router-dom'
import Home from '../../todo-project/pages/Home/home.jsx'
import TodosListPage from '../../todo-project/pages/Todos/todos-list.jsx'
import CommentsListPage from '../../todo-project/pages/comments/comments.jsx' 



import { ROUTES } from '../constants/routes'

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
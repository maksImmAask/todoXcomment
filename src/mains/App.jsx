import { RouterProvider } from 'react-router-dom'
import { router } from '../router/router'
import { MantineProvider } from '@mantine/core'
import { theme } from '../theme/theme'
import { ModalsProvider } from '@mantine/modals'

import './global.css'
import '@mantine/notifications/styles.css'
import '@mantine/core/styles.css'
import { Notifications } from '@mantine/notifications'

const App = () => {
  return (
    <MantineProvider theme={theme}>
      <ModalsProvider>
        <RouterProvider router={router} />
      </ModalsProvider>
      <Notifications autoClose={3000} />
    </MantineProvider>
  )
}

export default App
import { Button, createTheme, Select, TextInput } from '@mantine/core'
import buttonClasses from './buttonClasses.module.css'

export const theme = createTheme({
  fontFamily: 'Inter, sans-serif',
  colors: {
    azizbek: ['red', 'blue', 'green'],
  },
  components: {
    Button: Button.extend({
      defaultProps: {
        size: 'md',
        radius: 8,
      },
      classNames: buttonClasses,
    }),
  },
})

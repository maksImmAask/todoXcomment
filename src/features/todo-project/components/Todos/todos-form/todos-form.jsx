import { Button, Checkbox, Flex, Stack, Textarea } from '@mantine/core'
import { SelectUsers } from '../../../export/select-user-id/select-user-id'
import { modals } from '@mantine/modals'
import { isNotEmpty, useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'

const INITIALVALUES = {
  todo: '',
  completed: false,
  userId: null,
}

export const TodosForm = (props) => {
  const { title, submitFn, initialValues = INITIALVALUES } = props

  const form = useForm({
    initialValues,
    validate: {
      userId: isNotEmpty('Выберите пользователя'),
      todo: isNotEmpty('Обязательное поле'),
    },
  })

  const handleSubmit = async (values) => {
    await submitFn(values).then(() => {
      modals.closeAll()
      notifications.show({
        title: 'Default notification',
        message: 'Do not forget to star Mantine on GitHub! 🌟',
      })
    })
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap={20}>
        <Textarea
          {...form.getInputProps('todo')}
          label="Todo"
          placeholder="Введите todo"
        />
        <SelectUsers
          {...form.getInputProps('userId')}
          label="User id"
          clearable
          placeholder="Выберите user"
        />
        <Checkbox
          {...form.getInputProps('completed', { type: 'checkbox' })}
          label="Completed"
        />
      </Stack>

      <Flex justify={'end'} gap={10} mt={20}>
        <Button onClick={() => modals.closeAll()}>Отмена</Button>
        <Button type="submit">{title}</Button>
      </Flex>
    </form>
  )
}

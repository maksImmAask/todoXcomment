import { useEffect, useState } from 'react'
import { useForm } from '@mantine/form'
import { Button, Stack, TextInput, Textarea, Flex, Select } from '@mantine/core'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { api } from '../../../api/api.js'

const INITIAL_VALUES = {
  title: '',
  body: '',
  userId: null,
}

export const PostsForm = ({ title, submitFn, defaultValues = {} }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    api('users').then(({ data }) => setUsers(data.users))
  }, [])

  const form = useForm({
    initialValues: {
      ...INITIAL_VALUES,
      ...defaultValues,
      userId: defaultValues.userId ?? null,
    },
    validate: {
      title: (value) => (value.trim().length === 0 ? 'Enter post title' : null),
      body: (value) => (value.trim().length === 0 ? 'Enter post body' : null),
      userId: (value) => (!value ? 'Select user' : null),
    },
  })

  const handleSubmit = async (values) => {
    try {
      await submitFn(values)
      modals.closeAll()
    } catch (error) {
      notifications.show({
        color: 'red',
        title: 'Error',
        message: 'An error occurred while saving the post.',
      })
      modals.closeAll()
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap={20}>
        <TextInput
          label="Title"
          placeholder="Enter post title"
          {...form.getInputProps('title')}
        />
        <Textarea
          label="Body"
          placeholder="Enter post body"
          {...form.getInputProps('body')}
          autosize
          minRows={3}
        />
        <Select
          label="User"
          placeholder="Select user"
          data={users
            .filter((u) => u && u.id && (u.name || u.username))
            .map((u) => ({
              value: u.id.toString(),
              label: u.name ?? u.username ?? `User ${u.id}`,
            }))
          }
          {...form.getInputProps('userId')}
        />
      </Stack>
      <Flex justify="end" gap={10} mt={20}>
        <Button onClick={() => modals.closeAll()} type="button">
          Cancel
        </Button>
        <Button type="submit">{title}</Button>
      </Flex>
    </form>
  )
}
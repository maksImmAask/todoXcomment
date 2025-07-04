import { useForm } from '@mantine/form'
import { Button, Stack, Textarea, NumberInput, Flex, Select } from '@mantine/core'
import { modals } from '@mantine/modals'
import { useEffect, useState } from 'react'
import { api } from '../../../api/api.js'

const INITIAL_VALUES = {
  body: '',
  postId: null,
  userId: null,
}

export const CommentsForm = ({ title, submitFn, defaultValues = {} }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    api('users').then(({ data }) => setUsers(data.users))
  }, [])

  const form = useForm({
    initialValues: {
      ...INITIAL_VALUES,
      ...defaultValues,
      userId: defaultValues.user?.id ?? defaultValues.userId ?? null,
      postId: defaultValues.postId ?? null,
    },
    validate: {
      body: (value) => (value.trim().length === 0 ? 'Enter comment text' : null),
      postId: (value) => (!value ? 'Enter valid postId' : null),
      userId: (value) => (!value ? 'Select user' : null),
    },
  })

  const handleSubmit = async (values) => {
    await submitFn(values)
    modals.closeAll()
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap={20}>
        <Textarea
          label="Comment"
          placeholder="Enter comment text"
          {...form.getInputProps('body')}
          autosize
          minRows={3}
        />
        <NumberInput
          label="Post ID"
          placeholder="Enter post ID"
          {...form.getInputProps('postId')}
          min={1}
          hideControls
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

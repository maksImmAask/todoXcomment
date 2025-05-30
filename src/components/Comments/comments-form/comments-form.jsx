import { Button, Flex, Stack, Textarea, NumberInput } from '@mantine/core'
import { SelectUsers } from '../../../export/select-user-id/select-user-id'
import { modals } from '@mantine/modals'
import { useForm, isNotEmpty } from '@mantine/form'

const INITIAL_VALUES = {
  body: '',
  postId: null,
  userId: null,
}

export const CommentsForm = ({ title, submitFn, defaultValues = {} }) => {
  const form = useForm({
    initialValues: {
      ...INITIAL_VALUES,
      ...defaultValues,
      userId: defaultValues.user?.id ?? defaultValues.userId ?? null,
    },
    validate: {
      userId: isNotEmpty('Select user ID'),
      body: isNotEmpty('Enter comment text'),
      postId: isNotEmpty('Enter valid postId'),
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
          {...form.getInputProps('postId')}
          min={1}
          hideControls
        />
        <SelectUsers
          {...form.getInputProps('userId')}
          label="User ID"
          clearable
          placeholder="Select user"
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

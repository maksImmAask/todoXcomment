import { useForm } from '@mantine/form'
import { Button, Stack, Textarea, NumberInput } from '@mantine/core'

export const CommentsForm = ({ title, submitFn, defaultValues = {} }) => {
  const form = useForm({
    initialValues: {
      body: defaultValues.body || '',
      postId: defaultValues.postId || 0,
      userId: defaultValues.user?.id || 0,
    },
    validate: {
      body: (value) => (value.trim().length === 0 ? 'Введите текст комментария' : null),
      postId: (value) => (value <= 0 ? 'Введите корректный postId' : null),
      userId: (value) => (value <= 0 ? 'Введите корректный userId' : null),
    },
  })

  const handleSubmit = (values) => {
    submitFn(values)
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Textarea
          label="Комментарий"
          placeholder="Введите текст"
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
        <NumberInput
          label="User ID"
          {...form.getInputProps('userId')}
          min={1}
          hideControls
        />
        <Button type="submit">{title}</Button>
      </Stack>
    </form>
  )
}

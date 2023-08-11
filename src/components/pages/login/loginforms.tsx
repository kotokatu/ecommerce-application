import { TextInput, PasswordInput, Button, Box } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function LoginForms() {
  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => {
        if (value.length < 8) {
          return 'Password must have at least 8 chars';
        } else if (/^(?=.[a-z])(?=.[A-Z])(?=.*\d)[a-zA-Z\d]$/.test(value)) {
          return null;
        }
        return 'Invalid password';
      },
    },
  });

  return (
    <Box maw={320} mx="auto">
      <form onSubmit={form.onSubmit(console.log)}>
        <TextInput mt="sm" label="Email" placeholder="example@gmail.com" required {...form.getInputProps('email')} />
        <PasswordInput mt="md" label="Password" placeholder="Password" required {...form.getInputProps('password')} />
        <Button type="submit" fullWidth mt="xl">
          Sign in
        </Button>
      </form>
    </Box>
  );
}
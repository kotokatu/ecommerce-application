import { Paper, Title, Text, Container } from '@mantine/core';
import LoginForms from './loginforms';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <Container size={420}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 800,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" my={5}>
        Do not have an account yet?
        <Link to="/registration" style={{ color: 'red' }}>
          Create account
        </Link>
      </Text>
      <Paper withBorder shadow="md" p={30} radius="md">
        <LoginForms />
      </Paper>
    </Container>
  );
}

import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../../../services/UserService/UserService';
import { TextInput, Checkbox, Button, Group, Box, PasswordInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';

type RegistrationPageProps = {
  onSignup: Dispatch<SetStateAction<boolean>>;
};

const RegistrationPage = ({ onSignup }: RegistrationPageProps) => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid password'),
      firstName: (value) => (value.length < 2 ? 'First name is too short' : null),
      lastName: (value) => (value.length < 2 ? 'Last name is too short' : null),
    },
  });

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   userService
  //     .signup(email, password)
  //     .then(() => {
  //       onSignup(true);
  //     })
  //     .catch((err: Error) => console.log(err.message));
  // };

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <TextInput withAsterisk label="First Name" placeholder="First Name" {...form.getInputProps('firstName')} />
      <TextInput withAsterisk label="Last Name" placeholder="Last Name" {...form.getInputProps('lastName')} />
      <TextInput withAsterisk label="Email" placeholder="your@email.com" {...form.getInputProps('email')} />
      <PasswordInput withAsterisk label="Password" {...form.getInputProps('password')} />
      <DatePickerInput valueFormat="DD.MM.YYYY" label="Date of Birth" placeholder="Date of Birth" />
      {/* <div>
        <label>Password</label>
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>First Name</label>
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
        />
      </div>
      <input className="btn btn-block" type="submit" value="Sign up" /> */}
      <Group position="center" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
      <Link to="/login">To Login Page</Link>
    </form>
  );
};

export default RegistrationPage;

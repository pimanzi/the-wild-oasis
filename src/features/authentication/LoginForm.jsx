import { useState } from 'react';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import useLoginUser from './useLoginUser';
import SpinnerMini from '../../ui/SpinnerMini';

function LoginForm() {
  const [email, setEmail] = useState('radirat227@jameagle.com');
  const [password, setPassword] = useState('test123456');
  const { login, isLogin } = useLoginUser();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email && !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail('');
          setPassword('');
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address" orientation="vertical" type="auth">
        <Input
          type="email"
          disabled={isLogin}
          id="email"
          wide="auth"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRow>
      <FormRow label="Password" orientation="vertical" type="auth">
        <Input
          wide="auth"
          disabled={isLogin}
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRow>
      <FormRow orientation="vertical" type="auth">
        <Button size="auth" disabled={isLogin}>
          {isLogin ? <SpinnerMini></SpinnerMini> : 'Login'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;

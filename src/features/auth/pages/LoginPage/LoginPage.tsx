import { useAppDispatch, useAppSelector } from '@app/hooks';
import { RootState } from '@app/store';
import { login } from '@auth/authSlice';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

export function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector((state: RootState) => state.auth.status);
  const token = useAppSelector((state: RootState) => state.auth.token);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(login());
  }

  useEffect(() => {
    if (status === 'succeeded') navigate('/', { replace: true });
  }, [status]);

  if (token !== null) return <Navigate to="/" />;

  return (
    <div className={styles.wrapper}>
      <Card title="Login" className={styles.card}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <InputText
            id="username"
            type="text"
            placeholder="Username"
            disabled={status !== 'idle'}
          />

          <label htmlFor="password">Password</label>
          <InputText
            id="password"
            type="password"
            placeholder="Password"
            disabled={status !== 'idle'}
          />

          <Button
            label="Sign In"
            icon="pi pi-user"
            type="submit"
            disabled={status !== 'idle'}
            loading={status === 'loading'}
          />
        </form>
      </Card>
    </div>
  );
}

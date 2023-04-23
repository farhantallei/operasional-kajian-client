import { refreshToken } from '@auth/authSlice';
import { LoginPage } from '@auth/pages';
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks';
import { RootState } from './store';
import { useEffect } from 'react';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RestrictedLayout />,
    children: [{ index: true, element: <>Home</> }],
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
]);

function RestrictedLayout() {
  const minute = 1000 * 60;
  const tokenExpireTime = 15 * minute;

  const dispatch = useAppDispatch();
  const token = useAppSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (token) return;
    dispatch(refreshToken());
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(
  //     () => dispatch(refreshToken()),
  //     tokenExpireTime - minute
  //   );
  //   return () => clearInterval(interval);
  // }, []);

  if (token === null) return <Navigate to="/login" />;

  return <Outlet />;
}

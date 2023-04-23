import makeRequest from './makeRequest';

const prefix = 'auth';

function login() {
  return makeRequest<LoginResponse>(`${prefix}/login`, {
    method: 'POST',
    data: {
      username: 'almughni',
      password: 'bismillah',
    },
  });
}

function refreshToken() {
  return makeRequest<LoginResponse>(`${prefix}/refresh-token`, {
    method: 'POST',
  });
}

export const authAPI = { login, refreshToken };

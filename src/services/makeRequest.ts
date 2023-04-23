import { setupStore } from '@app/store';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const reduxState = setupStore().getState();
    const token = reduxState.auth.token;
    if (token) {
      config.headers!['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

async function makeRequest<Response = any, Params = any>(
  url: string,
  options?: AxiosRequestConfig<Params>
): Promise<Response> {
  try {
    const res: AxiosResponse<Response, Params> = await api(url, options);
    return res.data;
  } catch (error) {
    if (!axios.isAxiosError(error) || !error.response?.data) {
      return Promise.reject(new Error('Internal service error'));
    }
    return Promise.reject(
      new Error((error.response.data as FastifyError).message)
    );
  }
}

export default makeRequest;

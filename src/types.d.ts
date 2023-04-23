interface LoginResponse {
  token: string;
}

interface FastifyError {
  statusCode: number;
  error: string;
  message: string;
}

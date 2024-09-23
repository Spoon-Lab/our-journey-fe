interface Login {
  email: string;
  password: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
  user: {
    email: string;
    pk: number;
  };
}

interface Signup extends ResetPassword {
  email: string;
}

interface ResetPassword {
  password1: string;
  password2: string;
}

export type { Login, LoginResponse, ResetPassword, Signup };

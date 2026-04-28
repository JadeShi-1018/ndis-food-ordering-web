export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInData {
  userId: string;
  email: string;
  token: string;
}

export interface SignInResponse {
  succeed: boolean;
  errorMessage: string | null;
  errorCode: string | null;
  message: string;
  data: SignInData;
}

export interface RegisterRequest {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

export interface RegisterResponse {
  succeed: boolean;
  errorMessage: string | null;
  errorCode: string | null;
  message: string;
  data:SignInData;
}

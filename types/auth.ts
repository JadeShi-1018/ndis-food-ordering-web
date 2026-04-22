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

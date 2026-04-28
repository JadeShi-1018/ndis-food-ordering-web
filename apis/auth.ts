import axiosInstance from '@/libs/axiosInstance';
import { SignInRequest, SignInData, RegisterRequest, RegisterResponse } from '@/types/auth';

export async function signIn(dto: SignInRequest): Promise<SignInData> {
  const res = await axiosInstance.post('/User/signin', dto);
  return res.data;
}

export async function register(
  request: RegisterRequest
): Promise<SignInData> {
  const res = await axiosInstance.post('/User/register', request);
  console.log("register response:", res.data);
  return res.data;
}

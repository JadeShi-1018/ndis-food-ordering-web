import axiosInstance from '@/libs/axiosInstance';
import { SignInRequest, SignInData } from '@/types/auth';

export async function signIn(dto: SignInRequest): Promise<SignInData> {
  const res = await axiosInstance.post('/User/signin', dto);
  return res.data;
}

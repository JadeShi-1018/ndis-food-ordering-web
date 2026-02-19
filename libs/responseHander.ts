import { toast } from 'react-toastify';

export interface ApiResponse<T> {
  succeed: boolean;
  errorMessage?: string;
  errorCode?: string;
  message?: string;
  data?: T;
}

export async function handleResponse<T>(res: Response): Promise<ApiResponse<T>> {
  let body: ApiResponse<T>;

  try {
    body = await res.json();
  } catch {
    toast.error("Invalid JSON response"); 
    throw new Error("Invalid JSON response");
  }

  if (!res.ok || !body.succeed) {
    const msg = body.errorMessage || body.message || 'Unknown Error';
    const code = body.errorCode || res.status.toString();

    toast.error(`Error ${code}: ${msg}`); // show toast to user
    throw new Error(`Error ${code}: ${msg}`);
  }

  return body;
}

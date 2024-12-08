import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  withCredentials: true,
});

const handleError = (error: any) => {
  if (axios.isCancel(error)) {
    return { cancel: true };
  }
  throw new Error(
    error.response?.data?.message ?? error.message ?? "Unexpected error"
  );
};

const getAuthHeader = (token?: string) => {
  return token ? { Authorization: `Bearer ${token}` } : {};
};

async function httpGet(
  url: string,
  options?: {
    token?: string;
  }
): Promise<any> {
  try {
    const response = await instance.get(url, {
      headers: {
        ...getAuthHeader(options?.token),
      },
    });
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
}

async function httpPost(
  url: string,
  body: object,
  options?: {
    token?: string;
    signal?: AbortSignal;
  }
) {
  try {
    const response = await instance.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(options?.token),
      },
      signal: options?.signal,
    });
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
}

async function httpForm(
  url: string,
  formData: FormData,
  options?: {
    token?: string;
    signal?: AbortSignal;
  }
) {
  try {
    const response = await instance.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...getAuthHeader(options?.token),
      },
      signal: options?.signal,
    });
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
}

export { httpGet, httpPost, httpForm };

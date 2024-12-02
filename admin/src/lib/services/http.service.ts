import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

const getAuthHeader = (token?: string) => {
  return token ? { Authorization: `Bearer ${token}` } : {};
};

async function httpGet(url: string, token?: string): Promise<any> {
  try {
    const response = await instance.get(url, {
      headers: {
        ...getAuthHeader(token),
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response
        ? error.response.data.message ?? error.message
        : error.message
    );
  }
}

async function httpPost(
  url: string,
  body: object,
  options?: {
    token?: string;
    signal?: AbortSignal;
    credentials?: boolean;
  }
) {
  try {
    const response = await instance.post(url, JSON.stringify(body), {
      withCredentials: options?.credentials,
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(options?.token),
      },

      signal: options?.signal,
    });
    return response.data;
  } catch (error: any) {
    if (axios.isCancel(error)) {
      return { cancel: true };
    }

    throw new Error(
      error.response
        ? error.response.data.message ?? error.message
        : error.message
    );
  }
}

async function httpForm(
  url: string,
  formData: FormData,
  options?: {
    token?: string;
    signal?: AbortSignal;
    credentials?: boolean;
  }
) {
  try {
    const response = await instance.post(url, formData, {
      headers: {
        ...getAuthHeader(options?.token),
      },
      signal: options?.signal,
    });

    return response.data;
  } catch (error: any) {
    if (axios.isCancel(error)) {
      return { cancel: true };
    }

    throw new Error(
      error.response
        ? error.response.data.message ?? error.message
        : error.message
    );
  }
}

export { httpGet, httpPost, httpForm };

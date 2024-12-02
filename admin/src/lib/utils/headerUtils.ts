import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

const getToken = (headers: () => ReadonlyHeaders) => {
  return headers()
    .get("cookie")
    ?.split("; ")
    .find((c) => c.startsWith("token="))
    ?.split("=")[1];
};

const getUser = (headers: () => ReadonlyHeaders) => {
  return headers()
    .get("cookie")
    ?.split("; ")
    .find((c) => c.startsWith("user="))
    ?.split("=")[1];
};

const getPathname = (headers: () => ReadonlyHeaders) => {
  return headers().get("x-url");
};

export { getToken, getUser, getPathname };

import { httpGet } from "./http.service";

async function findValues(token: string) {
  return await httpGet(`/attributes`, { token });
}

export { findValues };

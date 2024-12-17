import { httpGet } from "./http.service";

async function findCategories(token: string) {
  return await httpGet(`/categories`, { token });
}

export { findCategories };

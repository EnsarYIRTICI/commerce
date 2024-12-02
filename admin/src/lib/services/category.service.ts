import { httpGet } from "./http.service";

async function findCategoryTree(token: string) {
  return await httpGet(`/categories/tree`, token);
}

export { findCategoryTree };

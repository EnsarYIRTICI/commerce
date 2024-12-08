import { httpGet } from "./http.service";

async function findCategoryTree() {
  return await httpGet(`/categories/tree`);
}

export { findCategoryTree };

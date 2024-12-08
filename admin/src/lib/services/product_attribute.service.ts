import { httpGet } from "./http.service";

async function findValues() {
  return await httpGet(`/product_attributes/values`);
}

export { findValues };

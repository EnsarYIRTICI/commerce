import { httpGet } from "./http.service";

async function findValues(token: string) {
  return await httpGet(`/product_attributes/values`, token);
}

export { findValues };

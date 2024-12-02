import { httpGet, httpPost, httpForm } from "./http.service";

async function findProducts(token: string) {
  return await httpGet("/products", token);
}

async function findBySlug(slug: string, token: string) {
  return await httpGet("/products/by/slug/" + slug, token);
}

async function createProduct(productData: FormData, token: string) {
  return await httpForm("/products", productData, {
    token: token,
  });
}

export { findProducts, findBySlug, createProduct };

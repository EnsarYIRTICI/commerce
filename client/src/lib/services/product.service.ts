import { httpGet, httpPost, httpForm } from "./http.service";

async function findProducts() {
  return await httpGet("/products");
}

async function findBySlug(slug: string) {
  return await httpGet("/products/by/slug/" + slug);
}

async function createProduct(productData: FormData) {
  return await httpForm("/products", productData);
}

export { findProducts, findBySlug, createProduct };

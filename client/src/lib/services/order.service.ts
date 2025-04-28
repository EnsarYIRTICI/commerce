import { httpGet, httpPost, httpForm } from "./http.service";

async function findOrders() {
  return await httpGet("/orders");
}

export { findOrders };

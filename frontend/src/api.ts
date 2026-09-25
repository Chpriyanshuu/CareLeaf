import type { Plant, Order, OrderCreate } from "./types";

const BASE_URL = "http://localhost:8000/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`Request to ${path} failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  getPlants: () => request<Plant[]>("/plants"),
  getPlant: (id: number) => request<Plant>(`/plants/${id}`),
  createOrder: (order: OrderCreate) =>
    request<Order>("/orders", {
      method: "POST",
      body: JSON.stringify(order),
    }),
  getOrders: () => request<Order[]>("/orders"),
  getOrder: (id: number) => request<Order>(`/orders/${id}`),
};

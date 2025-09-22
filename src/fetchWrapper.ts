import Cookies from "js-cookie";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const token = Cookies.get("accessToken");

  return fetch(`${API_URL}${path}`, {
    ...options,
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: options.body,
  });
}

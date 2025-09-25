import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";
import { JwtPayload } from "@/types/jwtpayload";
import * as jose from "jose";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export function getScope() {
  const token = Cookies.get("accessToken");
  const payload = token ? (jose.decodeJwt(token) as JwtPayload) : null;
  return payload?.scope ?? "";
}

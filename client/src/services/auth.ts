import { ENDPOINTS } from "./config";

interface AuthCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: number;
    email: string;
  };
  token: string;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;Secure;SameSite=Strict`;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}

function removeCookie(name: string) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

export async function loginUser(credentials: AuthCredentials) {
  const response = await fetch(ENDPOINTS.AUTH.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) throw new Error("Login failed");

  const data = (await response.json()) as AuthResponse;
  setCookie("token", data.token, 1); // expire dans 1 jour
  return data;
}

export async function registerUser(credentials: AuthCredentials) {
  const response = await fetch(ENDPOINTS.AUTH.REGISTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) throw new Error("Registration failed");

  const data = (await response.json()) as AuthResponse;
  setCookie("token", data.token, 1);
  return data;
}

export function logout() {
  removeCookie("token");
}

export function isAuthenticated(): boolean {
  return !!getCookie("token");
}

export function getToken(): string | null {
  return getCookie("token");
}

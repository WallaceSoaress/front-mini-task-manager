import { apiFetch } from "./api";

export type AuthenticatedUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type LoginRequest = {
  email: string;
  password: string;
};

type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

type AuthResponse = {
  tokenType: "Bearer";
  user: AuthenticatedUser;
};

export async function login(credentials: LoginRequest) {
  const response = await apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  return response.user;
}

export async function registerUser(data: RegisterRequest) {
  return apiFetch<void>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getCurrentUser() {
  return apiFetch<AuthenticatedUser>("/auth/session");
}

export async function logout() {
  return apiFetch<void>("/auth/logout", {
    method: "POST",
  });
}

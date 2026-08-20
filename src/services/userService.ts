import { apiFetch } from "./api";
import type { User } from "../interfaces/tasks/user";

export async function listUsers() {
  return apiFetch<User[]>("/users");
}

import { apiFetch } from "./api";
import type { Team } from "../interfaces/tasks/team";

export async function listTeams() {
  return apiFetch<Team[]>("/teams");
}

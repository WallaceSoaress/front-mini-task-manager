import { apiFetch } from "./api";
import type { Team, TeamRequest } from "../interfaces/tasks/team";

export async function listTeams() {
  return apiFetch<Team[]>("/teams");
}

export async function createTeam(payload: TeamRequest) {
  return apiFetch<Team>("/teams", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function deleteTeam(id: string) {
  return apiFetch<void>(`/teams/${id}`, {
    method: "DELETE",
  });
}

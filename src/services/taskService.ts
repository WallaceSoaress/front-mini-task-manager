import { apiFetch } from "./api";
import type { PageableResponse, Task, TaskPageParams, TaskRequest } from "../interfaces/tasks/task";

function appendParam(params: URLSearchParams, key: string, value?: string | number) {
  if (value !== undefined && value !== "") {
    params.set(key, String(value));
  }
}

export async function listTasks(params: TaskPageParams) {
  const searchParams = new URLSearchParams();
  appendParam(searchParams, "page", params.page);
  appendParam(searchParams, "size", params.size);
  appendParam(searchParams, "sort", "createdAt,desc");
  appendParam(searchParams, "status", params.status);
  appendParam(searchParams, "responsibleId", params.responsibleId);
  appendParam(searchParams, "priority", params.priority);

  return apiFetch<PageableResponse<Task>>(`/tasks?${searchParams.toString()}`);
}

export async function getTask(id: string) {
  return apiFetch<Task>(`/tasks/${id}`);
}

export async function createTask(payload: TaskRequest) {
  return apiFetch<Task>("/tasks", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateTask(id: string, payload: TaskRequest) {
  return apiFetch<Task>(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteTask(id: string) {
  return apiFetch<void>(`/tasks/${id}`, {
    method: "DELETE",
  });
}

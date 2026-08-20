import type { TaskPageParams } from "../../interfaces/tasks/task";

export const taskKeys = {
  all: ["tasks"] as const,
  list: (params: TaskPageParams) => [...taskKeys.all, "list", params] as const,
  detail: (id?: string) => [...taskKeys.all, "detail", id] as const,
};

export const userKeys = {
  all: ["users"] as const,
};

export const teamKeys = {
  all: ["teams"] as const,
};

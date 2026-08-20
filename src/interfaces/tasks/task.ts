export const TASK_STATUSES = ["TODO", "IN_PROGRESS", "DONE"] as const;
export const TASK_PRIORITIES = ["LOW", "MEDIUM", "HIGH"] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export type SimpleUser = {
  id: string;
  name: string;
};

export type SimpleTeam = {
  id: string;
  name: string;
};

export type Task = {
  id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  responsible?: SimpleUser | null;
  team: SimpleTeam;
  createdBy: SimpleUser;
  dueDate?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type TaskRequest = {
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  responsibleId?: string | null;
  teamId: string;
  dueDate?: string | null;
};

export type TaskFilters = {
  status?: TaskStatus;
  responsibleId?: string;
  priority?: TaskPriority;
};

export type TaskPageParams = TaskFilters & {
  page: number;
  size: number;
};

export type PageableResponse<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
};

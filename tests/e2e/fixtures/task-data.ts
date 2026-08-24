import type {
  PageableResponse,
  Task,
  TaskPriority,
  TaskStatus,
} from "../../../src/interfaces/tasks/task";
import type { Team } from "../../../src/interfaces/tasks/team";
import type { User } from "../../../src/interfaces/tasks/user";
import type { AuthenticatedUser } from "../../../src/services/authService";

export const authenticatedUser: AuthenticatedUser = {
  id: "user-owner",
  name: "Teste QA",
  email: "qa@example.com",
  role: "USER",
};

export const users: User[] = [
  { id: "user-ana", name: "Ana Silva", email: "ana@example.com" },
  { id: "user-bruno", name: "Bruno Costa", email: "bruno@example.com" },
  { id: "user-camila", name: "Camila Souza", email: "camila@example.com" },
];

export const teams: Team[] = [
  {
    id: "team-front",
    name: "FRONT",
    members: [users[0], users[1]],
  },
  {
    id: "team-back",
    name: "BACK",
    members: [users[2]],
  },
];

export function createTask(overrides: Partial<Task> = {}): Task {
  const id = overrides.id ?? "task-todo-001";

  return {
    id,
    title: "Implementar board",
    description: "Criar colunas e cards da tela de tarefas.",
    status: "TODO",
    priority: "MEDIUM",
    responsible: { id: users[0].id, name: users[0].name },
    team: { id: teams[0].id, name: teams[0].name },
    createdBy: { id: authenticatedUser.id, name: authenticatedUser.name },
    dueDate: "2026-08-31",
    createdAt: "2026-08-20T12:00:00.000Z",
    updatedAt: "2026-08-20T12:00:00.000Z",
    ...overrides,
  };
}

export function createTaskPage(
  content: Task[],
  overrides: Partial<PageableResponse<Task>> = {},
): PageableResponse<Task> {
  return {
    content,
    totalPages: 1,
    totalElements: content.length,
    size: 12,
    number: 0,
    first: true,
    last: true,
    numberOfElements: content.length,
    empty: content.length === 0,
    ...overrides,
  };
}

export function statusTask(status: TaskStatus, title: string): Task {
  return createTask({
    id: `task-${status.toLowerCase().replace("_", "-")}`,
    title,
    status,
  });
}

export function priorityTask(priority: TaskPriority, title: string): Task {
  return createTask({
    id: `task-${priority.toLowerCase()}`,
    title,
    priority,
  });
}

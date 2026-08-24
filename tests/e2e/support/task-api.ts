import type { Page, Request } from "@playwright/test";
import {
  authenticatedUser,
  createTask,
  createTaskPage,
  teams,
  users,
} from "../fixtures/task-data";
import type { PageableResponse, Task, TaskRequest } from "../../../src/interfaces/tasks/task";

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

type ApiMocksOptions = {
  tasks?: Task[];
  listError?: string;
  createError?: string;
  pageFactory?: (request: Request, tasks: Task[]) => PageableResponse<Task>;
};

const API_URL = "http://127.0.0.1:3333";

export type ApiMocks = {
  createRequests: TaskRequest[];
  deleteRequests: string[];
  listRequests: URL[];
  updateRequests: Array<{ id: string; payload: TaskRequest }>;
};

function jsonResponse(status: number, body: JsonValue) {
  return {
    status,
    contentType: "application/json",
    body: JSON.stringify(body),
  };
}

function teamSummary(teamId: string) {
  const team = teams.find((item) => item.id === teamId) ?? teams[0];
  return { id: team.id, name: team.name };
}

function responsibleSummary(responsibleId?: string | null) {
  if (!responsibleId) {
    return null;
  }

  const member = teams
    .flatMap((team) => team.members)
    .find((item) => item.id === responsibleId);

  return member ? { id: member.id, name: member.name } : null;
}

function taskFromRequest(payload: TaskRequest): Task {
  return createTask({
    id: "task-created-001",
    title: payload.title,
    description: payload.description,
    status: payload.status,
    priority: payload.priority,
    responsible: responsibleSummary(payload.responsibleId),
    team: teamSummary(payload.teamId),
    dueDate: payload.dueDate,
  });
}

export async function mockUnauthenticatedUser(page: Page) {
  await page.route(`${API_URL}/auth/me`, (route) =>
    route.fulfill(jsonResponse(401, { message: "Nao autenticado." })),
  );
}

export async function mockTaskApi(
  page: Page,
  options: ApiMocksOptions = {},
): Promise<ApiMocks> {
  const state = {
    tasks: [...(options.tasks ?? [createTask()])],
  };
  const calls: ApiMocks = {
    createRequests: [],
    deleteRequests: [],
    listRequests: [],
    updateRequests: [],
  };

  await page.route(`${API_URL}/auth/me`, (route) =>
    route.fulfill(jsonResponse(200, authenticatedUser)),
  );
  await page.route(`${API_URL}/auth/logout`, (route) => route.fulfill({ status: 204 }));
  await page.route(`${API_URL}/users`, (route) => route.fulfill(jsonResponse(200, users)));
  await page.route(`${API_URL}/teams`, (route) => route.fulfill(jsonResponse(200, teams)));
  await page.route(`${API_URL}/tasks**`, async (route, request) => {
    const url = new URL(request.url());
    const taskIdMatch = /\/tasks\/([^/?]+)$/.exec(url.pathname);

    if (request.method() === "GET" && !taskIdMatch) {
      calls.listRequests.push(url);

      if (options.listError) {
        await route.fulfill(jsonResponse(500, { message: options.listError }));
        return;
      }

      const pageResponse =
        options.pageFactory?.(request, state.tasks) ?? createTaskPage(state.tasks);
      await route.fulfill(jsonResponse(200, pageResponse as unknown as JsonValue));
      return;
    }

    if (request.method() === "POST" && !taskIdMatch) {
      const payload = request.postDataJSON() as TaskRequest;
      calls.createRequests.push(payload);

      if (options.createError) {
        await route.fulfill(jsonResponse(400, { message: options.createError }));
        return;
      }

      const task = taskFromRequest(payload);
      state.tasks = [task, ...state.tasks];
      await route.fulfill(jsonResponse(201, task as unknown as JsonValue));
      return;
    }

    if (request.method() === "PUT" && taskIdMatch) {
      const id = taskIdMatch[1];
      const payload = request.postDataJSON() as TaskRequest;
      calls.updateRequests.push({ id, payload });

      const updatedTask = taskFromRequest(payload);
      updatedTask.id = id;
      state.tasks = state.tasks.map((task) => (task.id === id ? updatedTask : task));
      await route.fulfill(jsonResponse(200, updatedTask as unknown as JsonValue));
      return;
    }

    if (request.method() === "DELETE" && taskIdMatch) {
      const id = taskIdMatch[1];
      calls.deleteRequests.push(id);
      state.tasks = state.tasks.filter((task) => task.id !== id);
      await route.fulfill({ status: 204 });
      return;
    }

    await route.fulfill(jsonResponse(404, { message: "Rota mockada nao encontrada." }));
  });

  return calls;
}

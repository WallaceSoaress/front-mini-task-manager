import type { Locator, Page } from "@playwright/test";

type TaskFormData = {
  description?: string;
  dueDate?: string;
  priority?: string;
  responsible?: string;
  status?: string;
  team?: string;
  title?: string;
};

export function taskDialog(page: Page, name: "Criar tarefa" | "Editar tarefa") {
  return page.getByRole("dialog", { name });
}

export async function openCreateTaskModal(page: Page) {
  await page.getByRole("button", { name: "Criar tarefa" }).first().click();
  return taskDialog(page, "Criar tarefa");
}

export async function fillTaskForm(form: Locator, data: TaskFormData) {
  if (data.title !== undefined) {
    await form.getByLabel("Titulo").fill(data.title);
  }

  if (data.description !== undefined) {
    await form.getByLabel("Descricao").fill(data.description);
  }

  if (data.status !== undefined) {
    await form.getByLabel("Status").selectOption({ label: data.status });
  }

  if (data.priority !== undefined) {
    await form.getByLabel("Prioridade").selectOption({ label: data.priority });
  }

  if (data.team !== undefined) {
    await form.getByLabel("Time").selectOption({ label: data.team });
  }

  if (data.responsible !== undefined) {
    await form.getByLabel("Responsavel").selectOption({ label: data.responsible });
  }

  if (data.dueDate !== undefined) {
    await form.getByLabel("Prazo").fill(data.dueDate);
  }
}

export function apiRequestFor(urls: URL[], param: string, value: string) {
  return urls.some((url) => url.searchParams.get(param) === value);
}

export function dateAfterToday(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

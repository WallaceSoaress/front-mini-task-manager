import { expect, test } from "@playwright/test";
import {
  createTask,
  createTaskPage,
  priorityTask,
  statusTask,
  teams,
} from "./fixtures/task-data";
import { mockTaskApi, mockUnauthenticatedUser } from "./support/task-api";
import {
  apiRequestFor,
  dateAfterToday,
  fillTaskForm,
  openCreateTaskModal,
  taskDialog,
} from "./support/task-page";

test.describe("Tarefas", () => {
  test("redireciona usuario nao autenticado para o login", async ({ page }) => {
    await mockUnauthenticatedUser(page);

    await page.goto("/");

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByLabel("E-mail")).toBeVisible();
    await expect(page.getByLabel("Senha")).toBeVisible();
  });

  test("carrega board com tarefas e dados principais", async ({ page }) => {
    await mockTaskApi(page, {
      tasks: [
        statusTask("TODO", "Backlog inicial"),
        statusTask("IN_PROGRESS", "Fluxo em andamento"),
        statusTask("DONE", "Entrega concluida"),
      ],
    });

    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Tarefas" })).toBeVisible();
    const board = page.getByLabel("Board de tarefas");
    await expect(board.getByText("Itens Pendentes").first()).toBeVisible();
    await expect(board.getByText("Em Andamento").first()).toBeVisible();
    await expect(board.getByText("Feito").first()).toBeVisible();
    await expect(page.getByRole("button", { name: /Backlog inicial/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Fluxo em andamento/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Entrega concluida/ })).toBeVisible();
    await expect(board.getByText("FRONT").first()).toBeVisible();
    await expect(board.getByText("Ana Silva").first()).toBeVisible();
  });

  test("exibe estado vazio e permite abrir criacao", async ({ page }) => {
    await mockTaskApi(page, { tasks: [] });

    await page.goto("/");

    await expect(page.getByText("Nenhuma tarefa encontrada.")).toBeVisible();
    await page.getByRole("button", { name: "Criar tarefa" }).last().click();
    await expect(taskDialog(page, "Criar tarefa")).toBeVisible();
  });

  test("exibe erro de listagem e acao de tentar novamente", async ({ page }) => {
    await mockTaskApi(page, { listError: "Falha ao listar tarefas." });

    await page.goto("/");

    await expect(page.getByText("Falha ao listar tarefas.")).toBeVisible({
      timeout: 15_000,
    });
    await expect(page.getByRole("button", { name: "Tentar novamente" })).toBeVisible();
  });

  test("envia filtros selecionados para a listagem", async ({ page }) => {
    const api = await mockTaskApi(page, {
      tasks: [priorityTask("HIGH", "Incidente critico")],
    });

    await page.goto("/");
    await page.getByLabel("Status").selectOption({ label: "Em Andamento" });
    await page.getByLabel("Responsavel").selectOption({ label: "Ana Silva" });
    await page.getByLabel("Prioridade").selectOption({ label: "Alta" });

    await expect
      .poll(() => apiRequestFor(api.listRequests, "status", "IN_PROGRESS"))
      .toBeTruthy();
    await expect
      .poll(() => apiRequestFor(api.listRequests, "responsibleId", "user-ana"))
      .toBeTruthy();
    await expect
      .poll(() => apiRequestFor(api.listRequests, "priority", "HIGH"))
      .toBeTruthy();

    await page.getByRole("button", { name: "Limpar filtros" }).click();

    await expect
      .poll(() =>
        api.listRequests.some(
          (url) =>
            !url.searchParams.has("status") &&
            !url.searchParams.has("responsibleId") &&
            !url.searchParams.has("priority"),
        ),
      )
      .toBeTruthy();
  });

  test("cria tarefa valida enviando payload preenchido", async ({ page }) => {
    const api = await mockTaskApi(page, { tasks: [] });

    await page.goto("/");
    const form = await openCreateTaskModal(page);
    await fillTaskForm(form, {
      title: "Criar cobertura E2E",
      description: "Validar fluxo principal com Playwright.",
      status: "Em Andamento",
      priority: "Alta",
      team: "FRONT",
      responsible: "Bruno Costa",
      dueDate: dateAfterToday(7),
    });

    await form.getByRole("button", { name: "Salvar" }).click();

    await expect(taskDialog(page, "Criar tarefa")).toBeHidden();
    await expect
      .poll(() => api.createRequests.at(-1))
      .toMatchObject({
        title: "Criar cobertura E2E",
        description: "Validar fluxo principal com Playwright.",
        status: "IN_PROGRESS",
        priority: "HIGH",
        teamId: "team-front",
        responsibleId: "user-bruno",
        dueDate: dateAfterToday(7),
      });
    await expect(page.getByRole("button", { name: /Criar cobertura E2E/ })).toBeVisible();
  });

  test("valida titulo obrigatorio e remove mensagem quando usuario corrige", async ({ page }) => {
    await mockTaskApi(page, { tasks: [] });

    await page.goto("/");
    const form = await openCreateTaskModal(page);
    await form.getByRole("button", { name: "Salvar" }).click();

    await expect(form.getByText("Informe o titulo.")).toBeVisible();
    await form.getByLabel("Titulo").fill("Titulo corrigido");
    await expect(form.getByText("Informe o titulo.")).toBeHidden();
  });

  test("bloqueia prazo passado e tarefa concluida sem responsavel", async ({ page }) => {
    await mockTaskApi(page, { tasks: [] });

    await page.goto("/");
    let form = await openCreateTaskModal(page);
    await fillTaskForm(form, {
      title: "Prazo invalido",
      dueDate: "2000-01-01",
    });
    await form.getByRole("button", { name: "Salvar" }).click();
    await expect(form.getByText("Informe uma data igual ou posterior a hoje.")).toBeVisible();

    await form.getByRole("button", { name: "Cancelar" }).click();
    form = await openCreateTaskModal(page);
    await fillTaskForm(form, {
      title: "Concluir sem responsavel",
      status: "Feito",
    });
    await form.getByRole("button", { name: "Salvar" }).click();
    await expect(form.getByText("Tarefas concluidas exigem responsavel.")).toBeVisible();
  });

  test("mantem modal aberto e mostra erro quando backend rejeita criacao", async ({ page }) => {
    await mockTaskApi(page, {
      tasks: [],
      createError: "Titulo ja cadastrado.",
    });

    await page.goto("/");
    const form = await openCreateTaskModal(page);
    await fillTaskForm(form, {
      title: "Tarefa duplicada",
      description: "Mesmo titulo.",
      dueDate: dateAfterToday(3),
    });
    await form.getByRole("button", { name: "Salvar" }).click();

    await expect(form).toBeVisible();
    await expect(form.getByText("Titulo ja cadastrado.")).toBeVisible();
    await expect(form.getByLabel("Titulo")).toHaveValue("Tarefa duplicada");
  });

  test("abre detalhes, edita tarefa e confirma exclusao", async ({ page }) => {
    const task = createTask({
      id: "task-edit-delete",
      title: "Tarefa para editar",
      description: "Descricao original.",
    });
    const api = await mockTaskApi(page, { tasks: [task] });

    await page.goto("/");
    await page.getByRole("button", { name: /Tarefa para editar/ }).click();
    const detailsDialog = page.getByRole("dialog", { name: "Tarefa para editar" });
    await expect(detailsDialog).toBeVisible();
    await expect(page.getByText("Descricao original.")).toBeVisible();

    await detailsDialog.getByRole("button", { name: "Editar" }).click();
    const editForm = taskDialog(page, "Editar tarefa");
    await editForm.getByLabel("Titulo").fill("Tarefa editada");
    await editForm.getByLabel("Prioridade").selectOption({ label: "Baixa" });
    await editForm.getByRole("button", { name: "Salvar" }).click();

    await expect
      .poll(() => api.updateRequests.at(-1))
      .toMatchObject({
        id: task.id,
        payload: {
          title: "Tarefa editada",
          priority: "LOW",
        },
      });
    await expect(page.getByRole("button", { name: /Tarefa editada/ })).toBeVisible();

    await page.getByRole("button", { name: /Tarefa editada/ }).click();
    await page.getByRole("dialog", { name: "Tarefa editada" }).getByRole("button", { name: "Excluir" }).click();
    const confirmDialog = page.getByRole("dialog", { name: "Excluir tarefa" });
    await expect(confirmDialog).toBeVisible();
    await confirmDialog.getByRole("button", { name: "Excluir" }).click();

    await expect.poll(() => api.deleteRequests).toContainEqual(task.id);
    await expect(page.getByText("Nenhuma tarefa encontrada.")).toBeVisible();
  });

  test("navega para proxima pagina usando paginacao", async ({ page }) => {
    const firstPageTask = createTask({ id: "task-page-0", title: "Pagina inicial" });
    const nextPageTask = createTask({ id: "task-page-1", title: "Pagina seguinte" });
    const api = await mockTaskApi(page, {
      tasks: [firstPageTask, nextPageTask],
      pageFactory: (request) => {
        const pageNumber = Number(new URL(request.url()).searchParams.get("page") ?? "0");

        return pageNumber === 0
          ? createTaskPage([firstPageTask], {
              totalPages: 2,
              totalElements: 2,
              number: 0,
              last: false,
            })
          : createTaskPage([nextPageTask], {
              totalPages: 2,
              totalElements: 2,
              number: 1,
              first: false,
              last: true,
            });
      },
    });

    await page.goto("/");
    await expect(page.getByRole("button", { name: /Pagina inicial/ })).toBeVisible();
    await page.getByRole("button", { name: "Proxima" }).click();

    await expect(page.getByRole("button", { name: /Pagina seguinte/ })).toBeVisible();
    await expect
      .poll(() => api.listRequests.some((url) => url.searchParams.get("page") === "1"))
      .toBeTruthy();
  });

  test("filtra responsaveis pelo time selecionado e limpa responsavel invalido", async ({ page }) => {
    const api = await mockTaskApi(page, { tasks: [] });

    await page.goto("/");
    const form = await openCreateTaskModal(page);
    await form.getByLabel("Time").selectOption({ label: "FRONT" });
    await expect(form.getByLabel("Responsavel")).toContainText("Ana Silva");
    await expect(form.getByLabel("Responsavel")).not.toContainText("Camila Souza");

    await form.getByLabel("Responsavel").selectOption({ label: "Ana Silva" });
    await form.getByLabel("Time").selectOption({ label: "BACK" });
    await expect(form.getByLabel("Responsavel")).toHaveValue("");
    await expect(form.getByLabel("Responsavel")).toContainText("Camila Souza");

    await fillTaskForm(form, {
      title: "Sem responsavel invalido",
      dueDate: dateAfterToday(2),
    });
    await form.getByRole("button", { name: "Salvar" }).click();

    await expect
      .poll(() => api.createRequests.at(-1))
      .toMatchObject({
        teamId: teams[1].id,
        responsibleId: null,
      });
  });
});

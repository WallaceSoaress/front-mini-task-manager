import { expect, test } from "@playwright/test";
import { mockPublicAuthApi, mockTaskApi } from "./support/task-api";

async function fillRegisterForm(page: import("@playwright/test").Page) {
  await page.getByLabel("Nome").fill("Maria QA");
  await page.getByLabel("E-mail").fill("maria.qa@example.com");
  await page.getByLabel("Senha", { exact: true }).fill("senha-segura");
  await page.getByLabel("Confirmar senha").fill("senha-segura");
}

test.describe("Cadastro de usuario", () => {
  test("navega entre login e cadastro", async ({ page }) => {
    await mockPublicAuthApi(page);

    await page.goto("/login");
    await page.getByRole("link", { name: "Cadastre-se" }).click();

    await expect(page).toHaveURL(/\/register$/);
    await expect(page.getByLabel("Nome")).toBeVisible();

    await page.getByRole("link", { name: "Entrar" }).click();

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole("button", { name: "Entrar" })).toBeVisible();
  });

  test("redireciona usuario autenticado para area privada ao acessar cadastro", async ({ page }) => {
    await mockTaskApi(page);

    await page.goto("/register");

    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("heading", { name: "Tarefas" })).toBeVisible();
  });

  test("cadastra usuario com sucesso e retorna para login sem autenticar automaticamente", async ({
    page,
  }) => {
    const api = await mockPublicAuthApi(page, { registerDelayMs: 150 });

    await page.goto("/login");
    await page.getByRole("link", { name: "Cadastre-se" }).click();
    await fillRegisterForm(page);

    await page.getByRole("button", { name: "Cadastrar" }).click();
    await expect(page.getByRole("button", { name: "Cadastrando..." })).toBeDisabled();
    await expect(page.getByText("Cadastro realizado com sucesso! Faca login para continuar.")).toBeVisible();
    await expect(page).toHaveURL(/\/login$/);

    await expect.poll(() => api.registerRequests).toHaveLength(1);
    await expect(api.registerRequests[0]).toEqual({
      name: "Maria QA",
      email: "maria.qa@example.com",
      password: "senha-segura",
    });
    await expect(api.registerRequests[0]).not.toHaveProperty("confirmPassword");
    await expect(api.loginRequests).toHaveLength(0);
    await expect(page.getByRole("button", { name: "Entrar" })).toBeVisible();
  });

  test("bloqueia envio com campos obrigatorios ausentes", async ({ page }) => {
    const api = await mockPublicAuthApi(page);

    await page.goto("/register");
    await page.getByRole("button", { name: "Cadastrar" }).click();

    await expect(page.getByText("Informe o nome.")).toBeVisible();
    await expect(page.getByText("Informe o e-mail.")).toBeVisible();
    await expect(page.getByText("Informe a senha.")).toBeVisible();
    await expect(page.getByText("Confirme a senha.")).toBeVisible();
    await expect(api.registerRequests).toHaveLength(0);
  });

  test("bloqueia envio com e-mail invalido", async ({ page }) => {
    const api = await mockPublicAuthApi(page);

    await page.goto("/register");
    await page.getByLabel("Nome").fill("Maria QA");
    await page.getByLabel("E-mail").fill("email-invalido");
    await page.getByLabel("Senha", { exact: true }).fill("senha-segura");
    await page.getByLabel("Confirmar senha").fill("senha-segura");
    await page.getByRole("button", { name: "Cadastrar" }).click();

    await expect(page.getByText("Informe um e-mail valido.")).toBeVisible();
    await expect(api.registerRequests).toHaveLength(0);
  });

  test("bloqueia envio quando senha e confirmacao sao diferentes", async ({ page }) => {
    const api = await mockPublicAuthApi(page);

    await page.goto("/register");
    await page.getByLabel("Nome").fill("Maria QA");
    await page.getByLabel("E-mail").fill("maria.qa@example.com");
    await page.getByLabel("Senha", { exact: true }).fill("senha-segura");
    await page.getByLabel("Confirmar senha").fill("outra-senha");
    await page.getByRole("button", { name: "Cadastrar" }).click();

    await expect(page.getByText("As senhas devem ser iguais.")).toBeVisible();
    await expect(api.registerRequests).toHaveLength(0);
  });

  test("mantem cadastro aberto e exibe erro retornado pela API", async ({ page }) => {
    const api = await mockPublicAuthApi(page, {
      registerError: "E-mail ja cadastrado.",
    });

    await page.goto("/register");
    await fillRegisterForm(page);
    await page.getByRole("button", { name: "Cadastrar" }).click();

    await expect(page.getByText("E-mail ja cadastrado.")).toBeVisible();
    await expect(page).toHaveURL(/\/register$/);
    await expect(api.registerRequests).toHaveLength(1);
  });
});

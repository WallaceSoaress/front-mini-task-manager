import { expect, test } from "@playwright/test";
import { authenticatedUser, users } from "./fixtures/task-data";
import type { Team, TeamRequest } from "../../src/interfaces/tasks/team";

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

const API_URL = "http://127.0.0.1:3333";

function jsonResponse(status: number, body: JsonValue) {
  return {
    status,
    contentType: "application/json",
    body: JSON.stringify(body),
  };
}

test.describe("Times", () => {
  test("seleciona multiplos membros por clique simples ao cadastrar time", async ({
    page,
  }) => {
    const createRequests: TeamRequest[] = [];
    const createdTeams: Team[] = [];

    await page.route(`${API_URL}/auth/me`, (route) =>
      route.fulfill(jsonResponse(200, authenticatedUser)),
    );
    await page.route(`${API_URL}/users`, (route) =>
      route.fulfill(jsonResponse(200, users)),
    );
    await page.route(`${API_URL}/teams`, async (route, request) => {
      if (request.method() === "GET") {
        await route.fulfill(jsonResponse(200, createdTeams as unknown as JsonValue));
        return;
      }

      if (request.method() === "POST") {
        const payload = request.postDataJSON() as TeamRequest;
        createRequests.push(payload);
        createdTeams.push({
          id: "team-created",
          name: payload.name,
          members: users.filter((user) => payload.memberIds.includes(user.id)),
        });
        await route.fulfill(jsonResponse(201, createdTeams.at(-1) as unknown as JsonValue));
        return;
      }

      await route.fulfill(jsonResponse(404, { message: "Rota mockada nao encontrada." }));
    });

    await page.goto("/teams");
    await page.getByRole("button", { name: "Novo Time" }).click();
    const form = page.getByRole("dialog", { name: "Novo Time" });

    await form.getByLabel("Nome do time").fill("Equipe Produto");
    await form.getByRole("checkbox", { name: /Ana Silva/ }).click();
    await form.getByRole("checkbox", { name: /Bruno Costa/ }).click();

    await expect(form.getByRole("checkbox", { name: /Ana Silva/ })).toBeChecked();
    await expect(form.getByRole("checkbox", { name: /Bruno Costa/ })).toBeChecked();

    await form.getByRole("button", { name: "Salvar" }).click();

    await expect
      .poll(() => createRequests.at(-1))
      .toMatchObject({
        name: "Equipe Produto",
        memberIds: ["user-ana", "user-bruno"],
      });
  });
});

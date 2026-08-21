import * as yup from "yup";
import type { TaskPriority, TaskRequest, TaskStatus } from "../../interfaces/tasks/task";
import { TASK_PRIORITIES, TASK_STATUSES } from "../../interfaces/tasks/task";

export type TaskFormData = {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  responsibleId: string;
  teamId: string;
  dueDate: string;
};

const apiDatePattern = /^\d{4}-\d{2}-\d{2}$/;

function normalizeDueDate(value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "";
  }

  if (apiDatePattern.test(trimmedValue)) {
    return trimmedValue;
  }

  const brazilianDateMatch = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(trimmedValue);

  if (!brazilianDateMatch) {
    return trimmedValue;
  }

  const [, day, month, year] = brazilianDateMatch;
  return `${year}-${month}-${day}`;
}

export const taskSchema: yup.ObjectSchema<TaskFormData> = yup
  .object({
    title: yup.string().trim().max(160, "Use no maximo 160 caracteres.").required("Informe o titulo."),
    description: yup.string().default(""),
    status: yup
      .mixed<TaskStatus>()
      .oneOf([...TASK_STATUSES], "Selecione um status valido.")
      .required("Informe o status."),
    priority: yup
      .mixed<TaskPriority>()
      .oneOf([...TASK_PRIORITIES], "Selecione uma prioridade valida.")
      .required("Informe a prioridade."),
    responsibleId: yup.string().default(""),
    teamId: yup.string().required("Selecione um time."),
    dueDate: yup
      .string()
      .transform((value) => normalizeDueDate(value ?? ""))
      .test("valid-api-date", "Informe uma data valida.", (value) => {
        if (!value) {
          return true;
        }

        if (!apiDatePattern.test(value)) {
          return false;
        }

        const date = new Date(`${value}T00:00:00`);
        return !Number.isNaN(date.getTime()) && value === date.toISOString().slice(0, 10);
      })
      .default(""),
  })
  .test(
    "done-requires-responsible",
    "Tarefas concluidas exigem responsavel.",
    (value, context) => {
      if (value?.status === "DONE" && !value.responsibleId) {
        return context.createError({
          path: "responsibleId",
          message: "Tarefas concluidas exigem responsavel.",
        });
      }

      return true;
    },
  );

export async function validateTaskForm(data: TaskFormData) {
  return taskSchema.validate(data, { abortEarly: false });
}

export function toTaskRequest(data: TaskFormData): TaskRequest {
  const dueDate = normalizeDueDate(data.dueDate);

  return {
    title: data.title.trim(),
    description: data.description.trim() || null,
    status: data.status,
    priority: data.priority,
    responsibleId: data.responsibleId || null,
    teamId: data.teamId,
    dueDate: dueDate || null,
  };
}

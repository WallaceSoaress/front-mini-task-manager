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
    dueDate: yup.string().default(""),
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
  return {
    title: data.title.trim(),
    description: data.description.trim() || null,
    status: data.status,
    priority: data.priority,
    responsibleId: data.responsibleId || null,
    teamId: data.teamId,
    dueDate: data.dueDate || null,
  };
}

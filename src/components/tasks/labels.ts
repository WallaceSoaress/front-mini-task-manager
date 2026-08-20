import type { TaskPriority, TaskStatus } from "../../interfaces/tasks/task";

export const statusLabels: Record<TaskStatus, string> = {
  TODO: "Itens Pendentes",
  IN_PROGRESS: "Em Andamento",
  DONE: "Feito",
};

export const statusIcons: Record<TaskStatus, string> = {
  TODO: "▣",
  IN_PROGRESS: "◌",
  DONE: "✓",
};

export const priorityLabels: Record<TaskPriority, string> = {
  LOW: "Baixa",
  MEDIUM: "Media",
  HIGH: "Alta",
};

export const priorityTone: Record<TaskPriority, "low" | "medium" | "high"> = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

export function formatDate(value?: string | null) {
  if (!value) {
    return "Sem prazo";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export function formatDateTime(value?: string | null) {
  if (!value) {
    return "Nao informado";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function dueDateState(value?: string | null) {
  if (!value) {
    return "neutral";
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = new Date(`${value}T00:00:00`);
  const diffDays = Math.ceil((dueDate.getTime() - today.getTime()) / 86_400_000);

  if (diffDays < 0) {
    return "danger";
  }

  if (diffDays <= 3) {
    return "warning";
  }

  return "neutral";
}

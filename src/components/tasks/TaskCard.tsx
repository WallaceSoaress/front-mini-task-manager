import type { Task } from "../../interfaces/tasks/task";
import { dueDateState, formatDate, formatDateTime, priorityLabels, priorityTone } from "./labels";
import { CardMeta, CardTitle, Chip, TaskCardButton } from "./styles";

type TaskCardProps = {
  task: Task;
  onOpen: (task: Task) => void;
  onDragStart?: (task: Task) => void;
  onDragEnd?: () => void;
};

export function TaskCard({ task, onOpen, onDragStart, onDragEnd }: TaskCardProps) {
  const dueTone = dueDateState(task.dueDate);

  return (
    <TaskCardButton
      type="button"
      draggable
      onClick={() => onOpen(task)}
      onDragEnd={onDragEnd}
      onDragStart={(event) => {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", task.id);
        onDragStart?.(task);
      }}
    >
      <CardTitle>{task.title}</CardTitle>

      <CardMeta>
        <Chip>{task.team.name}</Chip>
        <Chip $tone={priorityTone[task.priority]}>{priorityLabels[task.priority]}</Chip>
        <Chip $tone={dueTone === "danger" ? "danger" : dueTone === "warning" ? "warning" : "default"}>
          {formatDate(task.dueDate)}
        </Chip>
      </CardMeta>

      <CardMeta>
        <span>#{task.id.slice(0, 8)}</span>
        <span>{task.responsible?.name ?? "Sem responsavel"}</span>
      </CardMeta>

      <CardMeta>
        <span>Criado em {formatDateTime(task.createdAt)}</span>
      </CardMeta>
    </TaskCardButton>
  );
}

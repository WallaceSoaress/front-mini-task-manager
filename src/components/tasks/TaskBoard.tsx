import type { Task, TaskStatus } from "../../interfaces/tasks/task";
import { TASK_STATUSES } from "../../interfaces/tasks/task";
import { statusIcons, statusLabels } from "./labels";
import { BoardGrid, BoardScroller, CardList, Column, ColumnHeader, CountBadge, EmptyColumn } from "./styles";
import { TaskCard } from "./TaskCard";

type TaskBoardProps = {
  tasks: Task[];
  onOpenTask: (task: Task) => void;
};

export function TaskBoard({ tasks, onOpenTask }: TaskBoardProps) {
  const tasksByStatus = TASK_STATUSES.reduce<Record<TaskStatus, Task[]>>(
    (acc, status) => ({
      ...acc,
      [status]: tasks.filter((task) => task.status === status),
    }),
    {
      TODO: [],
      IN_PROGRESS: [],
      DONE: [],
    },
  );

  return (
    <BoardScroller aria-label="Board de tarefas">
      <BoardGrid>
        {TASK_STATUSES.map((status) => (
          <Column key={status}>
            <ColumnHeader>
              <span>
                {statusIcons[status]} {statusLabels[status]}
              </span>
              <CountBadge>{tasksByStatus[status].length}</CountBadge>
            </ColumnHeader>

            <CardList>
              {tasksByStatus[status].length ? (
                tasksByStatus[status].map((task) => (
                  <TaskCard key={task.id} task={task} onOpen={onOpenTask} />
                ))
              ) : (
                <EmptyColumn>Nenhuma tarefa nesta coluna.</EmptyColumn>
              )}
            </CardList>
          </Column>
        ))}
      </BoardGrid>
    </BoardScroller>
  );
}

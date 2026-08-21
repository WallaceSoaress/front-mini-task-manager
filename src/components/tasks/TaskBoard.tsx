import { useState } from "react";
import type { Task, TaskStatus } from "../../interfaces/tasks/task";
import { TASK_STATUSES } from "../../interfaces/tasks/task";
import { statusIcons, statusLabels } from "./labels";
import { BoardGrid, BoardScroller, CardList, Column, ColumnHeader, CountBadge, EmptyColumn } from "./styles";
import { TaskCard } from "./TaskCard";

type TaskBoardProps = {
  tasks: Task[];
  onOpenTask: (task: Task) => void;
  onMoveTask: (task: Task, status: TaskStatus) => void;
};

export function TaskBoard({ tasks, onOpenTask, onMoveTask }: TaskBoardProps) {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [dragOverStatus, setDragOverStatus] = useState<TaskStatus | null>(null);
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

  function handleDrop(status: TaskStatus) {
    if (draggedTask && draggedTask.status !== status) {
      onMoveTask(draggedTask, status);
    }

    setDraggedTask(null);
    setDragOverStatus(null);
  }

  return (
    <BoardScroller aria-label="Board de tarefas">
      <BoardGrid>
        {TASK_STATUSES.map((status) => (
          <Column
            key={status}
            $isDropTarget={dragOverStatus === status}
            onDragLeave={() => setDragOverStatus((current) => (current === status ? null : current))}
            onDragOver={(event) => {
              event.preventDefault();
              event.dataTransfer.dropEffect = "move";
              setDragOverStatus(status);
            }}
            onDrop={(event) => {
              event.preventDefault();
              handleDrop(status);
            }}
          >
            <ColumnHeader>
              <span>
                {statusIcons[status]} {statusLabels[status]}
              </span>
              <CountBadge>{tasksByStatus[status].length}</CountBadge>
            </ColumnHeader>

            <CardList>
              {tasksByStatus[status].length ? (
                tasksByStatus[status].map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onOpen={onOpenTask}
                    onDragEnd={() => {
                      setDraggedTask(null);
                      setDragOverStatus(null);
                    }}
                    onDragStart={setDraggedTask}
                  />
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

import { useMemo, useState } from "react";
import { ApiRequestError } from "../../../services/api";
import { useAuth } from "../../../hooks/auth";
import {
  useCreateTask,
  useDeleteTask,
  useTasks,
  useTeams,
  useUpdateTask,
  useUsers,
} from "../../../hooks/tasks/useTasks";
import type { Task, TaskFilters as TaskFiltersData, TaskRequest } from "../../../interfaces/tasks/task";
import { Button, Pagination } from "../../../components/tasks/styles";
import { ConfirmDialog } from "../../../components/tasks/ConfirmDialog";
import { EmptyState, ErrorState, LoadingState } from "../../../components/tasks/TaskStates";
import { TaskBoard } from "../../../components/tasks/TaskBoard";
import { TaskDetailsModal } from "../../../components/tasks/TaskDetailsModal";
import { TaskFilters } from "../../../components/tasks/TaskFilters";
import { TaskFormModal } from "../../../components/tasks/TaskFormModal";
import { TasksShell, TopBar, UserInfo } from "./styles";

const PAGE_SIZE = 12;

type FormMode =
  | { type: "create" }
  | { type: "edit"; task: Task };

function getErrorMessage(error: unknown) {
  if (error instanceof ApiRequestError) {
    return error.message;
  }

  return "Nao foi possivel concluir a operacao.";
}

const Tasks = () => {
  const { signOut, user } = useAuth();
  const [filters, setFilters] = useState<TaskFiltersData>({});
  const [page, setPage] = useState(0);
  const [formMode, setFormMode] = useState<FormMode | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [formError, setFormError] = useState("");

  const taskParams = useMemo(
    () => ({
      ...filters,
      page,
      size: PAGE_SIZE,
    }),
    [filters, page],
  );

  const tasksQuery = useTasks(taskParams);
  const usersQuery = useUsers();
  const teamsQuery = useTeams();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const users = usersQuery.data ?? [];
  const teams = teamsQuery.data ?? [];
  const taskPage = tasksQuery.data;
  const tasks = taskPage?.content ?? [];

  function handleFilterChange(nextFilters: TaskFiltersData) {
    setFilters(nextFilters);
    setPage(0);
  }

  async function handleSubmitTask(payload: TaskRequest) {
    setFormError("");

    try {
      if (formMode?.type === "edit") {
        await updateTask.mutateAsync({ id: formMode.task.id, payload });
      } else {
        await createTask.mutateAsync(payload);
      }
      setFormMode(null);
    } catch (error) {
      setFormError(getErrorMessage(error));
    }
  }

  async function handleDeleteTask() {
    if (!taskToDelete) {
      return;
    }

    await deleteTask.mutateAsync(taskToDelete.id);
    setTaskToDelete(null);
    setSelectedTask(null);
  }

  const isFormLoading = createTask.isPending || updateTask.isPending;

  return (
    <TasksShell>
      <TopBar>
        <UserInfo>
          <strong>{user?.name}</strong>
          <span>{user?.email}</span>
        </UserInfo>
        <Button type="button" $variant="ghost" onClick={signOut}>
          Sair
        </Button>
      </TopBar>

      <TaskFilters
        filters={filters}
        users={users}
        isLoadingUsers={usersQuery.isLoading}
        onChange={handleFilterChange}
        onCreate={() => {
          setFormError("");
          setFormMode({ type: "create" });
        }}
      />

      {teamsQuery.isSuccess && !teams.length ? (
        <ErrorState message="Cadastre um time antes de criar tarefas." />
      ) : null}

      {tasksQuery.isLoading ? <LoadingState /> : null}

      {tasksQuery.isError ? (
        <ErrorState message={getErrorMessage(tasksQuery.error)} onRetry={() => tasksQuery.refetch()} />
      ) : null}

      {tasksQuery.isSuccess && tasks.length === 0 ? (
        <EmptyState
          onCreate={() => {
            setFormError("");
            setFormMode({ type: "create" });
          }}
        />
      ) : null}

      {tasksQuery.isSuccess && tasks.length > 0 ? (
        <>
          <TaskBoard tasks={tasks} onOpenTask={setSelectedTask} />

          <Pagination aria-label="Paginacao de tarefas">
            <span>
              Pagina {page + 1} de {taskPage?.totalPages || 1} · {taskPage?.totalElements ?? 0} tarefas
            </span>
            <Button type="button" $variant="ghost" onClick={() => setPage((current) => Math.max(0, current - 1))} disabled={page === 0}>
              Anterior
            </Button>
            <Button
              type="button"
              $variant="ghost"
              onClick={() => setPage((current) => current + 1)}
              disabled={!taskPage || taskPage.last}
            >
              Proxima
            </Button>
          </Pagination>
        </>
      ) : null}

      {formMode ? (
        <TaskFormModal
          task={formMode.type === "edit" ? formMode.task : null}
          users={users}
          teams={teams}
          apiError={formError}
          isLoading={isFormLoading}
          onClose={() => setFormMode(null)}
          onSubmit={handleSubmitTask}
        />
      ) : null}

      {selectedTask ? (
        <TaskDetailsModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onEdit={(task) => {
            setFormError("");
            setSelectedTask(null);
            setFormMode({ type: "edit", task });
          }}
          onDelete={(task) => setTaskToDelete(task)}
        />
      ) : null}

      {taskToDelete ? (
        <ConfirmDialog
          title="Excluir tarefa"
          message={`Tem certeza que deseja excluir "${taskToDelete.title}"?`}
          confirmLabel="Excluir"
          isLoading={deleteTask.isPending}
          onCancel={() => setTaskToDelete(null)}
          onConfirm={handleDeleteTask}
        />
      ) : null}
    </TasksShell>
  );
};

export default Tasks;

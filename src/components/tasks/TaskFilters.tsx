import type { TaskFilters as TaskFiltersData, TaskPriority, TaskStatus } from "../../interfaces/tasks/task";
import type { User } from "../../interfaces/tasks/user";
import { priorityLabels, statusLabels } from "./labels";
import { Button, Field, FilterGrid, Toolbar, ToolbarHeader } from "./styles";

type TaskFiltersProps = {
  filters: TaskFiltersData;
  users: User[];
  onChange: (filters: TaskFiltersData) => void;
  onCreate: () => void;
  isLoadingUsers?: boolean;
};

export function TaskFilters({ filters, users, onChange, onCreate, isLoadingUsers }: TaskFiltersProps) {
  function setFilter<Key extends keyof TaskFiltersData>(key: Key, value: TaskFiltersData[Key] | "") {
    onChange({
      ...filters,
      [key]: value || undefined,
    });
  }

  return (
    <Toolbar>
      <ToolbarHeader>
        <div>
          <h1>Tarefas</h1>
          <p>Organize demandas por status, prioridade e responsavel.</p>
        </div>

        <Button type="button" onClick={onCreate}>
          Criar tarefa
        </Button>
      </ToolbarHeader>

      <FilterGrid>
        <Field>
          Status
          <select value={filters.status ?? ""} onChange={(event) => setFilter("status", event.target.value as TaskStatus | "")}>
            <option value="">Todos</option>
            {Object.entries(statusLabels).map(([status, label]) => (
              <option key={status} value={status}>
                {label}
              </option>
            ))}
          </select>
        </Field>

        <Field>
          Responsavel
          <select
            value={filters.responsibleId ?? ""}
            onChange={(event) => setFilter("responsibleId", event.target.value)}
            disabled={isLoadingUsers}
          >
            <option value="">Todos</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </Field>

        <Field>
          Prioridade
          <select value={filters.priority ?? ""} onChange={(event) => setFilter("priority", event.target.value as TaskPriority | "")}>
            <option value="">Todas</option>
            {Object.entries(priorityLabels).map(([priority, label]) => (
              <option key={priority} value={priority}>
                {label}
              </option>
            ))}
          </select>
        </Field>

        <Field>
          Acoes
          <Button type="button" $variant="ghost" onClick={() => onChange({})}>
            Limpar filtros
          </Button>
        </Field>
      </FilterGrid>
    </Toolbar>
  );
}

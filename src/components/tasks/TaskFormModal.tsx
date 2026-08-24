import { type ChangeEvent, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { ValidationError } from "yup";
import type { Task } from "../../interfaces/tasks/task";
import type { Team } from "../../interfaces/tasks/team";
import type { TaskFormData } from "../../validations/tasks/taskSchema";
import {
  normalizeDueDate,
  toTaskRequest,
  validateTaskForm,
} from "../../validations/tasks/taskSchema";
import { priorityLabels, statusLabels } from "./labels";
import {
  Button,
  Field,
  FieldError,
  FormGrid,
  ModalActions,
  ModalBackdrop,
  ModalBody,
  ModalHeader,
  ModalPanel,
} from "./styles";

type TaskFormModalProps = {
  task?: Task | null;
  teams: Team[];
  isLoading?: boolean;
  apiError?: string;
  onClose: () => void;
  onSubmit: (data: ReturnType<typeof toTaskRequest>) => Promise<void>;
};

const defaultValues: TaskFormData = {
  title: "",
  description: "",
  status: "TODO",
  priority: "MEDIUM",
  responsibleId: "",
  teamId: "",
  dueDate: "",
};

type TaskFieldElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

export function TaskFormModal({
  task,
  teams,
  isLoading,
  apiError,
  onClose,
  onSubmit,
}: TaskFormModalProps) {
  const [formError, setFormError] = useState("");
  const {
    clearErrors,
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    reset,
    setError,
    setValue,
  } = useForm<TaskFormData>({
    defaultValues,
  });
  const selectedTeamId = useWatch({ control, name: "teamId" });
  const selectedResponsibleId = useWatch({ control, name: "responsibleId" });
  const selectedTeam = teams.find((team) => team.id === selectedTeamId);
  const responsibleOptions = selectedTeam?.members ?? [];

  useEffect(() => {
    reset(
      task
        ? {
            title: task.title,
            description: task.description ?? "",
            status: task.status,
            priority: task.priority,
            responsibleId: task.responsible?.id ?? "",
            teamId: task.team.id,
            dueDate: task.dueDate ?? "",
          }
        : defaultValues,
    );
  }, [reset, task]);

  useEffect(() => {
    const firstTeamId = teams[0]?.id ?? "";

    if (!task && firstTeamId && !getValues("teamId")) {
      setValue("teamId", firstTeamId);
    }
  }, [getValues, setValue, task, teams]);

  useEffect(() => {
    if (!selectedResponsibleId || !selectedTeam) {
      return;
    }

    const responsibleBelongsToTeam = selectedTeam.members.some(
      (member) => member.id === selectedResponsibleId,
    );

    if (!responsibleBelongsToTeam) {
      setValue("responsibleId", "", {
        shouldDirty: true,
        shouldValidate: true,
      });
      clearErrors("responsibleId");
    }
  }, [clearErrors, selectedResponsibleId, selectedTeam, setValue]);

  function registerField(field: keyof TaskFormData) {
    const registration = register(field);

    return {
      ...registration,
      onChange: (event: ChangeEvent<TaskFieldElement>) => {
        void registration.onChange(event);
        setValue(field, event.currentTarget.value, {
          shouldDirty: true,
          shouldTouch: true,
        });
        clearErrors(field);
        setFormError("");
      },
    };
  }

  async function submit(data: TaskFormData) {
    setFormError("");
    clearErrors();

    try {
      const validData = await validateTaskForm({
        ...data,
        dueDate: normalizeDueDate(data.dueDate),
      });
      await onSubmit(toTaskRequest(validData));
    } catch (err) {
      if (err instanceof ValidationError) {
        err.inner.forEach((issue) => {
          if (issue.path) {
            setError(issue.path as keyof TaskFormData, {
              message: issue.message,
            });
          }
        });
        return;
      }

      setFormError("Nao foi possivel salvar a tarefa.");
    }
  }

  return (
    <ModalBackdrop role="presentation">
      <ModalPanel
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-title"
      >
        <ModalHeader>
          <div>
            <h2 id="task-form-title">
              {task ? "Editar tarefa" : "Criar tarefa"}
            </h2>
            <p>
              {task
                ? "Atualize os dados da demanda."
                : "Cadastre uma nova demanda do time."}
            </p>
          </div>
          <Button
            type="button"
            $variant="ghost"
            onClick={onClose}
            disabled={isLoading}
          >
            Fechar
          </Button>
        </ModalHeader>

        <ModalBody>
          <FormGrid onSubmit={handleSubmit(submit)}>
            <Field>
              Titulo
              <input {...registerField("title")} autoFocus maxLength={160} />
              {errors.title?.message ? (
                <FieldError>{errors.title.message}</FieldError>
              ) : null}
            </Field>

            <Field>
              Descricao
              <textarea {...registerField("description")} />
              {errors.description?.message ? (
                <FieldError>{errors.description.message}</FieldError>
              ) : null}
            </Field>

            <Field>
              Status
              <select {...registerField("status")}>
                {Object.entries(statusLabels).map(([status, label]) => (
                  <option key={status} value={status}>
                    {label}
                  </option>
                ))}
              </select>
              {errors.status?.message ? (
                <FieldError>{errors.status.message}</FieldError>
              ) : null}
            </Field>

            <Field>
              Prioridade
              <select {...registerField("priority")}>
                {Object.entries(priorityLabels).map(([priority, label]) => (
                  <option key={priority} value={priority}>
                    {label}
                  </option>
                ))}
              </select>
              {errors.priority?.message ? (
                <FieldError>{errors.priority.message}</FieldError>
              ) : null}
            </Field>

            <Field>
              Time
              <select {...registerField("teamId")}>
                <option value="">Selecione</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
              {errors.teamId?.message ? (
                <FieldError>{errors.teamId.message}</FieldError>
              ) : null}
            </Field>

            <Field>
              Responsavel
              <select
                {...registerField("responsibleId")}
                disabled={!selectedTeamId}
              >
                <option value="">Nao atribuido</option>
                {responsibleOptions.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
              {errors.responsibleId?.message ? (
                <FieldError>{errors.responsibleId.message}</FieldError>
              ) : null}
            </Field>

            <Field className="full">
              Prazo
              <input {...registerField("dueDate")} type="date" />
              {errors.dueDate?.message ? (
                <FieldError>{errors.dueDate.message}</FieldError>
              ) : null}
            </Field>

            {apiError || formError ? (
              <FieldError className="full">{apiError || formError}</FieldError>
            ) : null}

            <ModalActions>
              <Button
                type="button"
                $variant="ghost"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading || !teams.length}>
                {isLoading ? "Salvando..." : "Salvar"}
              </Button>
            </ModalActions>
          </FormGrid>
        </ModalBody>
      </ModalPanel>
    </ModalBackdrop>
  );
}

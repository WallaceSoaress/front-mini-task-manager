import type { Task } from "../../interfaces/tasks/task";
import { formatDate, formatDateTime, priorityLabels, statusLabels } from "./labels";
import { Button, DetailGrid, ModalActions, ModalBackdrop, ModalBody, ModalHeader, ModalPanel } from "./styles";

type TaskDetailsModalProps = {
  task: Task;
  onClose: () => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

export function TaskDetailsModal({ task, onClose, onEdit, onDelete }: TaskDetailsModalProps) {
  return (
    <ModalBackdrop role="presentation">
      <ModalPanel role="dialog" aria-modal="true" aria-labelledby="task-details-title">
        <ModalHeader>
          <div>
            <h2 id="task-details-title">{task.title}</h2>
            <p>#{task.id.slice(0, 8)}</p>
          </div>
          <Button type="button" $variant="ghost" onClick={onClose}>
            Fechar
          </Button>
        </ModalHeader>

        <ModalBody>
          <DetailGrid>
            <div>
              <dt>Status</dt>
              <dd>{statusLabels[task.status]}</dd>
            </div>
            <div>
              <dt>Prioridade</dt>
              <dd>{priorityLabels[task.priority]}</dd>
            </div>
            <div>
              <dt>Responsavel</dt>
              <dd>{task.responsible?.name ?? "Nao atribuido"}</dd>
            </div>
            <div>
              <dt>Time</dt>
              <dd>{task.team.name}</dd>
            </div>
            <div>
              <dt>Criador</dt>
              <dd>{task.createdBy.name}</dd>
            </div>
            <div>
              <dt>Prazo</dt>
              <dd>{formatDate(task.dueDate)}</dd>
            </div>
            <div>
              <dt>Criacao</dt>
              <dd>{formatDateTime(task.createdAt)}</dd>
            </div>
            <div>
              <dt>Ultima atualizacao</dt>
              <dd>{formatDateTime(task.updatedAt)}</dd>
            </div>
            <div>
              <dt>Descricao</dt>
              <dd>{task.description || "Sem descricao."}</dd>
            </div>
          </DetailGrid>

          <ModalActions>
            <Button type="button" $variant="ghost" onClick={() => onEdit(task)}>
              Editar
            </Button>
            <Button type="button" $variant="danger" onClick={() => onDelete(task)}>
              Excluir
            </Button>
          </ModalActions>
        </ModalBody>
      </ModalPanel>
    </ModalBackdrop>
  );
}

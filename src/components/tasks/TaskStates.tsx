import { Button, StateBox } from "./styles";

type LoadingStateProps = {
  message?: string;
};

export function LoadingState({ message = "Carregando tarefas..." }: LoadingStateProps) {
  return <StateBox>{message}</StateBox>;
}

type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

export function ErrorState({ message = "Nao foi possivel carregar os dados.", onRetry }: ErrorStateProps) {
  return (
    <StateBox>
      <strong>{message}</strong>
      {onRetry ? (
        <Button type="button" onClick={onRetry}>
          Tentar novamente
        </Button>
      ) : null}
    </StateBox>
  );
}

type EmptyStateProps = {
  onCreate?: () => void;
};

export function EmptyState({ onCreate }: EmptyStateProps) {
  return (
    <StateBox>
      <strong>Nenhuma tarefa encontrada.</strong>
      <span>Ajuste os filtros ou crie a primeira tarefa do time.</span>
      {onCreate ? (
        <Button type="button" onClick={onCreate}>
          Criar tarefa
        </Button>
      ) : null}
    </StateBox>
  );
}

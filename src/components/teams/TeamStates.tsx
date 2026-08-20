import { Button, StateBox } from "../tasks/styles";

type EmptyTeamsStateProps = {
  onCreate: () => void;
};

export function EmptyTeamsState({ onCreate }: EmptyTeamsStateProps) {
  return (
    <StateBox>
      <strong>Nenhum time cadastrado.</strong>
      <span>Crie o primeiro time para organizar as demandas por equipe.</span>
      <Button type="button" onClick={onCreate}>
        Novo Time
      </Button>
    </StateBox>
  );
}

import { useState } from "react";
import { PrivateNavigation } from "../../../components/layout/PrivateNavigation";
import { Button, Toolbar, ToolbarHeader } from "../../../components/tasks/styles";
import { ErrorState, LoadingState } from "../../../components/tasks/TaskStates";
import { TeamFormModal } from "../../../components/teams/TeamFormModal";
import { TeamList } from "../../../components/teams/TeamList";
import { EmptyTeamsState } from "../../../components/teams/TeamStates";
import { SuccessMessage } from "../../../components/teams/styles";
import { useAuth } from "../../../hooks/auth";
import { useCreateTeam, useTeams, useUsers } from "../../../hooks/tasks/useTasks";
import type { TeamRequest } from "../../../interfaces/tasks/team";
import { ApiRequestError } from "../../../services/api";
import { HeaderActions, TeamsShell, TeamsTopBar, TeamsUserInfo } from "./styles";

function getErrorMessage(error: unknown) {
  if (error instanceof ApiRequestError) {
    return error.message;
  }

  return "Nao foi possivel concluir a operacao.";
}

const Teams = () => {
  const { signOut, user } = useAuth();
  const teamsQuery = useTeams();
  const usersQuery = useUsers();
  const createTeam = useCreateTeam();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const teams = teamsQuery.data ?? [];
  const users = usersQuery.data ?? [];

  function openForm() {
    setFormError("");
    setSuccessMessage("");
    setIsFormOpen(true);
  }

  async function handleSubmitTeam(payload: TeamRequest) {
    setFormError("");

    try {
      await createTeam.mutateAsync(payload);
      setIsFormOpen(false);
      setSuccessMessage("Time cadastrado com sucesso.");
    } catch (error) {
      setFormError(getErrorMessage(error));
    }
  }

  return (
    <TeamsShell>
      <TeamsTopBar>
        <TeamsUserInfo>
          <strong>{user?.name}</strong>
          <span>{user?.email}</span>
        </TeamsUserInfo>
        <PrivateNavigation />
        <Button type="button" $variant="ghost" onClick={signOut}>
          Sair
        </Button>
      </TeamsTopBar>

      <Toolbar>
        <ToolbarHeader>
          <div>
            <h1>Times</h1>
            <p>Gerencie equipes e membros disponiveis para as tarefas.</p>
          </div>

          <HeaderActions>
            <Button type="button" onClick={openForm}>
              Novo Time
            </Button>
          </HeaderActions>
        </ToolbarHeader>
      </Toolbar>

      {successMessage ? <SuccessMessage role="status">{successMessage}</SuccessMessage> : null}

      {teamsQuery.isLoading ? <LoadingState message="Carregando times..." /> : null}

      {teamsQuery.isError ? (
        <ErrorState message={getErrorMessage(teamsQuery.error)} onRetry={() => teamsQuery.refetch()} />
      ) : null}

      {teamsQuery.isSuccess && teams.length === 0 ? <EmptyTeamsState onCreate={openForm} /> : null}

      {teamsQuery.isSuccess && teams.length > 0 ? <TeamList teams={teams} /> : null}

      {isFormOpen ? (
        <TeamFormModal
          users={users}
          usersError={usersQuery.isError ? getErrorMessage(usersQuery.error) : ""}
          isLoadingUsers={usersQuery.isLoading}
          apiError={formError}
          isLoading={createTeam.isPending}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleSubmitTeam}
        />
      ) : null}
    </TeamsShell>
  );
};

export default Teams;

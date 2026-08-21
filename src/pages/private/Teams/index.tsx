import { useState } from "react";
import { PrivateNavigation } from "../../../components/layout/PrivateNavigation";
import { ConfirmDialog } from "../../../components/tasks/ConfirmDialog";
import { Button, Toolbar, ToolbarHeader } from "../../../components/tasks/styles";
import { ErrorState, LoadingState } from "../../../components/tasks/TaskStates";
import { TeamFormModal } from "../../../components/teams/TeamFormModal";
import { TeamList } from "../../../components/teams/TeamList";
import { EmptyTeamsState } from "../../../components/teams/TeamStates";
import { SuccessMessage } from "../../../components/teams/styles";
import { useAuth } from "../../../hooks/auth";
import { useCreateTeam, useDeleteTeam, useTeams, useUsers } from "../../../hooks/tasks/useTasks";
import type { Team, TeamRequest } from "../../../interfaces/tasks/team";
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
  const deleteTeam = useDeleteTeam();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [listError, setListError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [teamToDelete, setTeamToDelete] = useState<Team | null>(null);

  const teams = teamsQuery.data ?? [];
  const users = usersQuery.data ?? [];

  function openForm() {
    setFormError("");
    setListError("");
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

  async function handleDeleteTeam() {
    if (!teamToDelete) {
      return;
    }

    setListError("");
    setSuccessMessage("");

    try {
      await deleteTeam.mutateAsync(teamToDelete.id);
      setTeamToDelete(null);
      setSuccessMessage("Time excluido com sucesso.");
    } catch (error) {
      setListError(getErrorMessage(error));
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
      {listError ? <ErrorState message={listError} /> : null}

      {teamsQuery.isLoading ? <LoadingState message="Carregando times..." /> : null}

      {teamsQuery.isError ? (
        <ErrorState message={getErrorMessage(teamsQuery.error)} onRetry={() => teamsQuery.refetch()} />
      ) : null}

      {teamsQuery.isSuccess && teams.length === 0 ? <EmptyTeamsState onCreate={openForm} /> : null}

      {teamsQuery.isSuccess && teams.length > 0 ? (
        <TeamList
          teams={teams}
          onDeleteTeam={(team) => {
            setListError("");
            setSuccessMessage("");
            setTeamToDelete(team);
          }}
        />
      ) : null}

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

      {teamToDelete ? (
        <ConfirmDialog
          title="Excluir time"
          message={`Tem certeza que deseja excluir "${teamToDelete.name}"? Essa acao so sera concluida se nao houver demandas vinculadas ao time.`}
          confirmLabel="Excluir"
          errorMessage={listError}
          isLoading={deleteTeam.isPending}
          onCancel={() => {
            if (!deleteTeam.isPending) {
              setTeamToDelete(null);
              setListError("");
            }
          }}
          onConfirm={handleDeleteTeam}
        />
      ) : null}
    </TeamsShell>
  );
};

export default Teams;

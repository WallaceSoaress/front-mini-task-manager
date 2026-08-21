import type { Team } from "../../interfaces/tasks/team";
import { Button } from "../tasks/styles";
import { MemberBadge, MemberList, TeamActions, TeamCard, TeamCardHeader, TeamsGrid } from "./styles";

type TeamListProps = {
  teams: Team[];
  onDeleteTeam: (team: Team) => void;
};

export function TeamList({ teams, onDeleteTeam }: TeamListProps) {
  return (
    <TeamsGrid>
      {teams.map((team) => (
        <TeamCard key={team.id}>
          <TeamCardHeader>
            <div>
              <h2>{team.name}</h2>
              <p>
                {team.members.length} {team.members.length === 1 ? "membro" : "membros"}
              </p>
            </div>

            <TeamActions>
              <Button type="button" $variant="danger" onClick={() => onDeleteTeam(team)}>
                Excluir
              </Button>
            </TeamActions>
          </TeamCardHeader>

          {team.members.length ? (
            <MemberList aria-label={`Membros do time ${team.name}`}>
              {team.members.map((member) => (
                <MemberBadge key={member.id} title={member.email}>
                  {member.name}
                </MemberBadge>
              ))}
            </MemberList>
          ) : (
            <p>Nenhum membro vinculado.</p>
          )}
        </TeamCard>
      ))}
    </TeamsGrid>
  );
}

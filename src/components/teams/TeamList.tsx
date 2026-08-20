import type { Team } from "../../interfaces/tasks/team";
import { MemberBadge, MemberList, TeamCard, TeamsGrid } from "./styles";

type TeamListProps = {
  teams: Team[];
};

export function TeamList({ teams }: TeamListProps) {
  return (
    <TeamsGrid>
      {teams.map((team) => (
        <TeamCard key={team.id}>
          <div>
            <h2>{team.name}</h2>
            <p>
              {team.members.length} {team.members.length === 1 ? "membro" : "membros"}
            </p>
          </div>

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

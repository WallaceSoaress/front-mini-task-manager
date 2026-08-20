export type TeamMember = {
  id: string;
  name: string;
  email: string;
};

export type Team = {
  id: string;
  name: string;
  members: TeamMember[];
};

export type TeamRequest = {
  name: string;
  memberIds: string[];
};

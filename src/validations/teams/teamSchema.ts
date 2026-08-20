import * as yup from "yup";
import type { TeamRequest } from "../../interfaces/tasks/team";

export type TeamFormData = {
  name: string;
  memberIds: string[];
};

export const teamSchema: yup.ObjectSchema<TeamFormData> = yup.object({
  name: yup.string().trim().max(120, "Use no maximo 120 caracteres.").required("Informe o nome do time."),
  memberIds: yup.array().of(yup.string().required()).default([]).required(),
});

export async function validateTeamForm(data: TeamFormData) {
  return teamSchema.validate(data, { abortEarly: false });
}

export function toTeamRequest(data: TeamFormData): TeamRequest {
  return {
    name: data.name.trim(),
    memberIds: data.memberIds,
  };
}

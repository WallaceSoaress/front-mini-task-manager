import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { ValidationError } from "yup";
import type { User } from "../../interfaces/tasks/user";
import type { TeamFormData } from "../../validations/teams/teamSchema";
import { toTeamRequest, validateTeamForm } from "../../validations/teams/teamSchema";
import { Button, Field, FieldError, FormGrid, ModalActions, ModalBackdrop, ModalBody, ModalHeader, ModalPanel } from "../tasks/styles";
import { HelperText, MemberOption, MemberOptionList } from "./styles";

type TeamFormModalProps = {
  users: User[];
  isLoading?: boolean;
  isLoadingUsers?: boolean;
  usersError?: string;
  apiError?: string;
  onClose: () => void;
  onSubmit: (data: ReturnType<typeof toTeamRequest>) => Promise<void>;
};

const defaultValues: TeamFormData = {
  name: "",
  memberIds: [],
};

export function TeamFormModal({ users, isLoading, isLoadingUsers, usersError, apiError, onClose, onSubmit }: TeamFormModalProps) {
  const [formError, setFormError] = useState("");
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setError,
    setValue,
  } = useForm<TeamFormData>({
    defaultValues,
  });
  const selectedMemberIds = useWatch({ control, name: "memberIds" }) ?? [];
  const selectedMemberIdSet = new Set(selectedMemberIds);

  function toggleMember(memberId: string) {
    const nextMemberIds = selectedMemberIdSet.has(memberId)
      ? selectedMemberIds.filter((selectedMemberId) => selectedMemberId !== memberId)
      : [...selectedMemberIds, memberId];

    setValue("memberIds", nextMemberIds, { shouldDirty: true, shouldValidate: true });
  }

  async function submit(data: TeamFormData) {
    setFormError("");

    try {
      const validData = await validateTeamForm({
        ...data,
        memberIds: selectedMemberIds,
      });
      await onSubmit(toTeamRequest(validData));
    } catch (err) {
      if (err instanceof ValidationError) {
        err.inner.forEach((issue) => {
          if (issue.path) {
            setError(issue.path as keyof TeamFormData, { message: issue.message });
          }
        });
        return;
      }

      setFormError("Nao foi possivel salvar o time.");
    }
  }

  return (
    <ModalBackdrop role="presentation">
      <ModalPanel role="dialog" aria-modal="true" aria-labelledby="team-form-title">
        <ModalHeader>
          <div>
            <h2 id="team-form-title">Novo Time</h2>
            <p>Cadastre um time e selecione os membros disponiveis.</p>
          </div>
          <Button type="button" $variant="ghost" onClick={onClose} disabled={isLoading}>
            Fechar
          </Button>
        </ModalHeader>

        <ModalBody>
          <FormGrid onSubmit={handleSubmit(submit)}>
            <Field className="full">
              Nome do time
              <input {...register("name")} autoFocus maxLength={120} placeholder="Time Front-end" />
              {errors.name?.message ? <FieldError>{errors.name.message}</FieldError> : null}
            </Field>

            <Field className="full">
              Membros
              <MemberOptionList aria-label="Membros disponiveis">
                {users.map((user) => {
                  const isSelected = selectedMemberIdSet.has(user.id);

                  return (
                    <MemberOption key={user.id} $selected={isSelected}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        disabled={isLoadingUsers || Boolean(usersError)}
                        onChange={() => toggleMember(user.id)}
                      />
                      <span>
                        <strong>{user.name}</strong>
                        <small>{user.email}</small>
                      </span>
                    </MemberOption>
                  );
                })}
              </MemberOptionList>
              <HelperText>
                {usersError ||
                  (isLoadingUsers
                    ? "Carregando usuarios..."
                    : "Selecione um ou mais membros. Este campo e opcional.")}
              </HelperText>
              {errors.memberIds?.message ? <FieldError>{errors.memberIds.message}</FieldError> : null}
            </Field>

            {apiError || formError ? <FieldError className="full">{apiError || formError}</FieldError> : null}

            <ModalActions>
              <Button type="button" $variant="ghost" onClick={onClose} disabled={isLoading}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar"}
              </Button>
            </ModalActions>
          </FormGrid>
        </ModalBody>
      </ModalPanel>
    </ModalBackdrop>
  );
}

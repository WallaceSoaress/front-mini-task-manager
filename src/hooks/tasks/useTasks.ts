import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { TaskPageParams, TaskRequest } from "../../interfaces/tasks/task";
import type { TeamRequest } from "../../interfaces/tasks/team";
import { createTask, deleteTask, getTask, listTasks, updateTask } from "../../services/taskService";
import { createTeam, deleteTeam, listTeams } from "../../services/teamService";
import { listUsers } from "../../services/userService";
import { taskKeys, teamKeys, userKeys } from "./queryKeys";

export function useTasks(params: TaskPageParams) {
  return useQuery({
    queryKey: taskKeys.list(params),
    queryFn: () => listTasks(params),
  });
}

export function useTask(id?: string) {
  return useQuery({
    enabled: Boolean(id),
    queryKey: taskKeys.detail(id),
    queryFn: () => getTask(id ?? ""),
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TaskRequest) => createTask(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: taskKeys.all }),
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TaskRequest }) => updateTask(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
      queryClient.invalidateQueries({ queryKey: taskKeys.detail(variables.id) });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: taskKeys.all }),
  });
}

export function useUsers() {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: listUsers,
  });
}

export function useTeams() {
  return useQuery({
    queryKey: teamKeys.all,
    queryFn: listTeams,
  });
}

export function useCreateTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TeamRequest) => createTeam(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: teamKeys.all }),
  });
}

export function useDeleteTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTeam(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: teamKeys.all }),
  });
}

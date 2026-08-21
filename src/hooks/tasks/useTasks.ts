import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { PageableResponse, Task, TaskPageParams, TaskRequest } from "../../interfaces/tasks/task";
import type { Team } from "../../interfaces/tasks/team";
import type { User } from "../../interfaces/tasks/user";
import type { TeamRequest } from "../../interfaces/tasks/team";
import { createTask, deleteTask, getTask, listTasks, updateTask } from "../../services/taskService";
import { createTeam, deleteTeam, listTeams } from "../../services/teamService";
import { listUsers } from "../../services/userService";
import { taskKeys, teamKeys, userKeys } from "./queryKeys";

function getResponsibleSummary(responsibleId: string | null | undefined, teams: Team[], users: User[]) {
  if (!responsibleId) {
    return null;
  }

  const teamMember = teams.flatMap((team) => team.members).find((member) => member.id === responsibleId);
  const user = users.find((userItem) => userItem.id === responsibleId);
  const responsible = teamMember ?? user;

  return responsible ? { id: responsible.id, name: responsible.name } : null;
}

function getTeamSummary(teamId: string, teams: Team[], currentTask: Task) {
  const team = teams.find((teamItem) => teamItem.id === teamId);

  return team ? { id: team.id, name: team.name } : currentTask.team;
}

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
    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.all });
      await queryClient.cancelQueries({ queryKey: taskKeys.detail(id) });

      const previousLists = queryClient.getQueriesData<PageableResponse<Task>>({ queryKey: taskKeys.all });
      const previousDetail = queryClient.getQueryData<Task>(taskKeys.detail(id));
      const teams = queryClient.getQueryData<Team[]>(teamKeys.all) ?? [];
      const users = queryClient.getQueryData<User[]>(userKeys.all) ?? [];

      const applyPayload = (task: Task): Task => ({
        ...task,
        title: payload.title,
        description: payload.description,
        status: payload.status,
        priority: payload.priority,
        responsible: getResponsibleSummary(payload.responsibleId, teams, users),
        team: getTeamSummary(payload.teamId, teams, task),
        dueDate: payload.dueDate,
      });

      queryClient.setQueriesData<PageableResponse<Task>>({ queryKey: taskKeys.all }, (current) => {
        if (!current?.content) {
          return current;
        }

        return {
          ...current,
          content: current.content.map((task) => (task.id === id ? applyPayload(task) : task)),
        };
      });

      queryClient.setQueryData<Task>(taskKeys.detail(id), (current) => (current ? applyPayload(current) : current));

      return { previousLists, previousDetail };
    },
    onError: (_, variables, context) => {
      context?.previousLists.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
      queryClient.setQueryData(taskKeys.detail(variables.id), context?.previousDetail);
    },
    onSuccess: (updatedTask, variables) => {
      queryClient.setQueriesData<PageableResponse<Task>>({ queryKey: taskKeys.all }, (current) => {
        if (!current?.content) {
          return current;
        }

        return {
          ...current,
          content: current.content.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
        };
      });
      queryClient.setQueryData(taskKeys.detail(variables.id), updatedTask);
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

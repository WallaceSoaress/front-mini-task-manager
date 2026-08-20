import styled from "styled-components";
import { TasksShell, TopBar, UserInfo } from "../Tasks/styles";

export const TeamsShell = TasksShell;
export const TeamsTopBar = TopBar;
export const TeamsUserInfo = UserInfo;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: 560px) {
    width: 100%;

    button {
      flex: 1;
    }
  }
`;

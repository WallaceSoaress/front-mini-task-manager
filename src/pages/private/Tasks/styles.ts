import styled from "styled-components";

export const TasksShell = styled.main`
  min-height: 100svh;
  width: 100%;
  display: grid;
  align-content: start;
  gap: 16px;
  padding: 20px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: 640px) {
    padding: 12px;
  }
`;

export const TopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.dark};
  font-size: 14px;

  strong {
    color: ${({ theme }) => theme.colors.text_black};
  }
`;

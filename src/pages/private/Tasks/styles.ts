import styled from "styled-components";

export const TasksShell = styled.main`
  min-height: 100svh;
  width: 100%;
  display: grid;
  align-content: start;
  gap: 18px;
  padding: 24px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.background};

  > * {
    width: min(100%, 1440px);
    margin-right: auto;
    margin-left: auto;
  }

  @media (max-width: 640px) {
    padding: 14px;
  }
`;

export const TopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 12px 14px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 10px 24px rgba(16, 24, 40, 0.05);
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.dark};
  font-size: 14px;
  line-height: 1.35;

  strong {
    color: ${({ theme }) => theme.colors.darker};
    font-weight: 800;
  }

  @media (max-width: 560px) {
    width: 100%;
    justify-content: space-between;
  }
`;

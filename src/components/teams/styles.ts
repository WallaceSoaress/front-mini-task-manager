import styled from "styled-components";

export const TeamsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const TeamCard = styled.article`
  display: grid;
  gap: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 18px;
  color: ${({ theme }) => theme.colors.text_black};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 10px 22px rgba(16, 24, 40, 0.06);

  h2 {
    margin: 0;
    color: ${({ theme }) => theme.colors.darker};
    font-size: 18px;
    font-weight: 800;
    line-height: 1.25;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.dark};
    font-size: 14px;
    line-height: 1.45;
  }
`;

export const TeamCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 480px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

export const TeamActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    button {
      flex: 1;
    }
  }
`;

export const MemberList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const MemberBadge = styled.li`
  max-width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  padding: 6px 9px;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.primary_dark};
  background: ${({ theme }) => theme.colors.lighter};
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 700;
`;

export const HelperText = styled.span`
  color: ${({ theme }) => theme.colors.dark};
  font-size: 13px;
  font-weight: 650;
  line-height: 1.4;
`;

export const MemberOptionList = styled.div`
  display: grid;
  gap: 8px;
  max-height: 220px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 8px;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.lighter};
`;

export const MemberOption = styled.label<{ $selected: boolean }>`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  border: 1px solid
    ${({ $selected, theme }) => ($selected ? theme.colors.primary : theme.colors.border)};
  border-radius: 8px;
  padding: 10px 12px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text_black};
  background: ${({ $selected, theme }) => ($selected ? theme.colors.primary_light : theme.colors.white)};
  transition:
    border-color 140ms ease,
    background 140ms ease,
    box-shadow 140ms ease;

  input {
    width: 18px;
    height: 18px;
    margin: 0;
    accent-color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }

  span {
    display: grid;
    gap: 2px;
    min-width: 0;
  }

  strong,
  small {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  strong {
    color: ${({ theme }) => theme.colors.darker};
    font-size: 14px;
  }

  small {
    color: ${({ theme }) => theme.colors.dark};
    font-size: 13px;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary_dark};
    box-shadow: 0 0 0 3px rgba(17, 153, 163, 0.16);
  }

  &:has(input:disabled) {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const SuccessMessage = styled.p`
  margin: 0;
  border: 1px solid ${({ theme }) => theme.colors.success};
  border-radius: 8px;
  padding: 12px 14px;
  color: ${({ theme }) => theme.colors.success};
  background: ${({ theme }) => theme.colors.success_light};
  font-weight: 700;
`;

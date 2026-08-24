import styled from "styled-components";

export const TeamsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
`;

export const TeamCard = styled.article`
  display: grid;
  gap: 14px;
  border: 1px solid #d9dce1;
  border-radius: 8px;
  padding: 16px;
  color: ${({ theme }) => theme.colors.text_black};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 1px 2px rgba(9, 30, 66, 0.12);

  h2 {
    margin: 0;
    font-size: 18px;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.dark};
    font-size: 14px;
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
  padding: 5px 8px;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.text_black};
  background: ${({ theme }) => theme.colors.lighter};
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 700;
`;

export const HelperText = styled.span`
  color: ${({ theme }) => theme.colors.dark};
  font-size: 13px;
  font-weight: 500;
`;

export const MemberOptionList = styled.div`
  display: grid;
  gap: 8px;
  max-height: 220px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 8px;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.white};
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
  background: ${({ $selected, theme }) => ($selected ? theme.colors.primary_light : theme.colors.lighter)};

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
    font-size: 14px;
  }

  small {
    color: ${({ theme }) => theme.colors.dark};
    font-size: 13px;
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
  color: ${({ theme }) => theme.colors.completed};
  background: ${({ theme }) => theme.colors.success_light};
  font-weight: 700;
`;

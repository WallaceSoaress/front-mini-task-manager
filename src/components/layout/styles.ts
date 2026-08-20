import styled from "styled-components";

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  a {
    min-height: 36px;
    display: inline-flex;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    padding: 0 12px;
    color: ${({ theme }) => theme.colors.text_black};
    background: ${({ theme }) => theme.colors.white};
    font-size: 14px;
    font-weight: 700;
    text-decoration: none;
  }

  a.active {
    border-color: ${({ theme }) => theme.colors.primary_dark};
    color: ${({ theme }) => theme.colors.text_white};
    background: ${({ theme }) => theme.colors.primary_dark};
  }

  @media (max-width: 560px) {
    width: 100%;

    a {
      flex: 1;
      justify-content: center;
    }
  }
`;

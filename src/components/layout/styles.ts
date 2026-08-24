import styled from "styled-components";

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 4px;
  background: ${({ theme }) => theme.colors.lighter};

  a {
    min-height: 36px;
    display: inline-flex;
    align-items: center;
    border: 1px solid transparent;
    border-radius: 6px;
    padding: 0 12px;
    color: ${({ theme }) => theme.colors.dark};
    background: transparent;
    font-size: 14px;
    font-weight: 700;
    text-decoration: none;
    transition:
      color 140ms ease,
      background 140ms ease,
      border-color 140ms ease;
  }

  a:hover,
  a:focus-visible {
    color: ${({ theme }) => theme.colors.primary_dark};
    background: ${({ theme }) => theme.colors.white};
    outline: none;
  }

  a.active {
    border-color: ${({ theme }) => theme.colors.primary_dark};
    color: ${({ theme }) => theme.colors.text_white};
    background: ${({ theme }) => theme.colors.primary_dark};
    box-shadow: 0 6px 14px rgba(8, 119, 130, 0.16);
  }

  @media (max-width: 560px) {
    width: 100%;

    a {
      flex: 1;
      justify-content: center;
    }
  }
`;

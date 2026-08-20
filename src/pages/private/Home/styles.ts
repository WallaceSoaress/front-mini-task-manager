import styled from "styled-components";

export const HomeShell = styled.main`
  min-height: 100svh;
  width: 100%;
  display: grid;
  place-items: center;
  padding: 32px 16px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.background};
`;

export const Panel = styled.section`
  width: min(100%, 760px);
  display: grid;
  gap: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 32px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 18px 50px rgba(41, 67, 78, 0.1);
  text-align: left;

  span {
    color: ${({ theme }) => theme.colors.primary_dark};
    font-size: ${({ theme }) => theme.fonts.size.small};
    font-weight: 700;
    text-transform: uppercase;
  }

  h1 {
    margin: 0;
  }

  p {
    color: ${({ theme }) => theme.colors.text_black};
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-start;

  button {
    min-height: 42px;
    border: 0;
    border-radius: 8px;
    padding: 0 18px;
    color: ${({ theme }) => theme.colors.text_white};
    background: ${({ theme }) => theme.colors.primary_dark};
    cursor: pointer;
    font: inherit;
    font-weight: 700;
  }
`;

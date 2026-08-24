import styled from "styled-components";

export const PageShell = styled.main`
  min-height: 100svh;
  width: 100%;
  display: grid;
  place-items: center;
  padding: 32px 16px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.background};
`;

export const LoginPanel = styled.section`
  width: min(100%, 420px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 34px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 18px 46px rgba(16, 24, 40, 0.1);
  text-align: left;

  @media (max-width: 480px) {
    padding: 24px;
  }
`;

export const HeaderGroup = styled.header`
  display: grid;
  gap: 8px;
  margin-bottom: 28px;

  span {
    color: ${({ theme }) => theme.colors.primary_dark};
    font-size: ${({ theme }) => theme.fonts.size.small};
    font-weight: 800;
    text-transform: uppercase;
  }

  h1 {
    margin: 0;
    color: ${({ theme }) => theme.colors.darker};
    font-size: 28px;
    font-weight: 800;
    line-height: 1.15;
  }
`;

export const Form = styled.form`
  display: grid;
  gap: 18px;

  button {
    min-height: 48px;
    border: 0;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.primary_dark};
    color: ${({ theme }) => theme.colors.text_white};
    cursor: pointer;
    font: inherit;
    font-weight: 700;
    box-shadow: 0 8px 18px rgba(8, 119, 130, 0.18);
    transition:
      background 140ms ease,
      box-shadow 140ms ease,
      transform 140ms ease;
  }

  button:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary};
  }

  button:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(17, 153, 163, 0.2);
  }

  button:active:not(:disabled) {
    transform: translateY(1px);
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }
`;

export const Field = styled.div`
  display: grid;
  gap: 8px;

  label {
    color: ${({ theme }) => theme.colors.text_black};
    font-size: ${({ theme }) => theme.fonts.size.small};
    font-weight: 700;
  }

  input {
    min-height: 46px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    padding: 0 14px;
    color: ${({ theme }) => theme.colors.text_black};
    background: ${({ theme }) => theme.colors.white};
    font: inherit;
    box-sizing: border-box;
    transition:
      border-color 140ms ease,
      box-shadow 140ms ease,
      background 140ms ease;
  }

  input::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
  }

  input:focus {
    border-color: ${({ theme }) => theme.colors.primary_dark};
    outline: none;
    box-shadow: 0 0 0 3px rgba(17, 153, 163, 0.16);
  }
`;

export const ErrorMessage = styled.p`
  border-radius: 8px;
  padding: 12px 14px;
  margin: 0;
  color: ${({ theme }) => theme.colors.danger};
  background: ${({ theme }) => theme.colors.error_light};
  font-size: ${({ theme }) => theme.fonts.size.small};
  line-height: 1.45;
`;

export const SuccessMessage = styled.p`
  border-radius: 8px;
  padding: 12px 14px;
  margin: 0;
  color: ${({ theme }) => theme.colors.success};
  background: ${({ theme }) => theme.colors.success_light};
  font-size: ${({ theme }) => theme.fonts.size.small};
  line-height: 1.45;
`;

export const SwitchAuthText = styled.p`
  margin: 18px 0 0;
  color: ${({ theme }) => theme.colors.dark};
  font-size: ${({ theme }) => theme.fonts.size.small};
  text-align: center;

  a {
    color: ${({ theme }) => theme.colors.primary_dark};
    font-weight: 800;
    text-decoration: none;
  }

  a:focus,
  a:hover {
    text-decoration: underline;
  }
`;

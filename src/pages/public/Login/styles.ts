import styled from "styled-components";

export const PageShell = styled.main`
  min-height: 100svh;
  width: 100%;
  display: grid;
  place-items: center;
  padding: 32px 16px;
  box-sizing: border-box;
  background:
    linear-gradient(135deg, rgba(67, 190, 198, 0.12), rgba(21, 119, 67, 0.08)),
    ${({ theme }) => theme.colors.background};
`;

export const LoginPanel = styled.section`
  width: min(100%, 420px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 32px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 18px 50px rgba(41, 67, 78, 0.12);
  text-align: left;
`;

export const HeaderGroup = styled.header`
  display: grid;
  gap: 8px;
  margin-bottom: 28px;

  span {
    color: ${({ theme }) => theme.colors.primary_dark};
    font-size: ${({ theme }) => theme.fonts.size.small};
    font-weight: 700;
    text-transform: uppercase;
  }

  h1 {
    margin: 0;
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
  }

  input:focus {
    border-color: ${({ theme }) => theme.colors.primary_dark};
    outline: 3px solid rgba(67, 190, 198, 0.18);
  }
`;

export const ErrorMessage = styled.p`
  border-radius: 8px;
  padding: 12px 14px;
  margin: 0;
  color: ${({ theme }) => theme.colors.danger};
  background: ${({ theme }) => theme.colors.error_light};
  font-size: ${({ theme }) => theme.fonts.size.small};
`;

export const SuccessMessage = styled.p`
  border-radius: 8px;
  padding: 12px 14px;
  margin: 0;
  color: ${({ theme }) => theme.colors.success};
  background: ${({ theme }) => theme.colors.success_light};
  font-size: ${({ theme }) => theme.fonts.size.small};
`;

export const SwitchAuthText = styled.p`
  margin: 18px 0 0;
  color: ${({ theme }) => theme.colors.dark};
  font-size: ${({ theme }) => theme.fonts.size.small};
  text-align: center;

  a {
    color: ${({ theme }) => theme.colors.primary_dark};
    font-weight: 700;
    text-decoration: none;
  }

  a:focus,
  a:hover {
    text-decoration: underline;
  }
`;

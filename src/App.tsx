import { useState } from "react";
import type { FormEvent } from "react";
import styled, { ThemeProvider } from "styled-components";
import { ApiRequestError } from "./services/api";
import { login } from "./services/authService";
import type { AuthenticatedUser } from "./services/authService";
import "./styles/global-styles.css";
import themeDefault from "./styles/themeDefault";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const authenticatedUser = await login({ email, password });
      setUser(authenticatedUser);
    } catch (err) {
      const message =
        err instanceof ApiRequestError ? err.message : "Nao foi possivel realizar o login.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ThemeProvider theme={themeDefault}>
      <PageShell>
        <LoginPanel>
          <HeaderGroup>
            <span>Mini Task Manager</span>
            <h1>Login</h1>
          </HeaderGroup>

          {user ? (
            <SuccessBox>
              <strong>Login realizado com sucesso.</strong>
              <p>
                {user.name} esta autenticado. As proximas requisicoes usarao o cookie
                HttpOnly enviado pela API.
              </p>
            </SuccessBox>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Field>
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </Field>

              <Field>
                <label htmlFor="password">Senha</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </Field>

              {error ? <ErrorMessage role="alert">{error}</ErrorMessage> : null}

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Entrando..." : "Entrar"}
              </button>
            </Form>
          )}
        </LoginPanel>
      </PageShell>
    </ThemeProvider>
  );
}

export default App;

const PageShell = styled.main`
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

const LoginPanel = styled.section`
  width: min(100%, 420px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 32px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 18px 50px rgba(41, 67, 78, 0.12);
  text-align: left;
`;

const HeaderGroup = styled.header`
  display: grid;
  gap: 8px;
  margin-bottom: 28px;

  span {
    color: ${({ theme }) => theme.colors.primary_dark};
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  h1 {
    margin: 0;
  }
`;

const Form = styled.form`
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

const Field = styled.div`
  display: grid;
  gap: 8px;

  label {
    color: ${({ theme }) => theme.colors.text_black};
    font-size: 0.9rem;
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

const ErrorMessage = styled.p`
  border-radius: 8px;
  padding: 12px 14px;
  color: ${({ theme }) => theme.colors.danger};
  background: ${({ theme }) => theme.colors.error_light};
  font-size: 0.9rem;
`;

const SuccessBox = styled.div`
  display: grid;
  gap: 8px;
  border-radius: 8px;
  padding: 16px;
  color: ${({ theme }) => theme.colors.completed};
  background: ${({ theme }) => theme.colors.success_light};

  p {
    color: ${({ theme }) => theme.colors.text_black};
  }
`;

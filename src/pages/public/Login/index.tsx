import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router";
import { useAuth } from "../../../hooks/auth";
import { ApiRequestError } from "../../../services/api";
import {
  ErrorMessage,
  Field,
  Form,
  HeaderGroup,
  LoginPanel,
  PageShell,
  SwitchAuthText,
} from "./styles";

const Login = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await signIn({ email, password });
    } catch (err) {
      const message =
        err instanceof ApiRequestError
          ? err.message
          : "Nao foi possivel realizar o login.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PageShell>
      <LoginPanel>
        <HeaderGroup>
          <span>Mini Task Manager</span>
        </HeaderGroup>

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

        <SwitchAuthText>
          Nao possui uma conta? <Link to="/register">Cadastre-se</Link>
        </SwitchAuthText>
      </LoginPanel>
    </PageShell>
  );
};

export default Login;

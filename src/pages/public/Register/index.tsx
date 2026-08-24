import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { ApiRequestError } from "../../../services/api";
import { registerUser } from "../../../services/authService";
import {
  ErrorMessage,
  Field,
  Form,
  HeaderGroup,
  LoginPanel,
  PageShell,
  SuccessMessage,
  SwitchAuthText,
} from "../Login/styles";

type RegisterFormErrors = Partial<{
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}>;

const successMessage =
  "Cadastro realizado com sucesso! Faca login para continuar.";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!success) {
      return;
    }

    const timer = window.setTimeout(() => {
      navigate("/login", { replace: true });
    }, 800);

    return () => window.clearTimeout(timer);
  }, [navigate, success]);

  function validateForm() {
    const nextErrors: RegisterFormErrors = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      nextErrors.name = "Informe o nome.";
    }

    if (!trimmedEmail) {
      nextErrors.email = "Informe o e-mail.";
    } else if (!isValidEmail(trimmedEmail)) {
      nextErrors.email = "Informe um e-mail valido.";
    }

    if (!password) {
      nextErrors.password = "Informe a senha.";
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = "Confirme a senha.";
    } else if (password && password !== confirmPassword) {
      nextErrors.confirmPassword = "As senhas devem ser iguais.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await registerUser({
        name: name.trim(),
        email: email.trim(),
        password,
      });
      setSuccess(successMessage);
    } catch (err) {
      const message =
        err instanceof ApiRequestError
          ? err.message
          : "Nao foi possivel realizar o cadastro.";
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  function clearFieldError(field: keyof RegisterFormErrors) {
    setErrors((current) => ({ ...current, [field]: undefined }));
    setFormError("");
  }

  return (
    <PageShell>
      <LoginPanel>
        <HeaderGroup>
          <span>Mini Task Manager</span>
        </HeaderGroup>

        <Form onSubmit={handleSubmit} noValidate>
          <Field>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                clearFieldError("name");
              }}
            />
            {errors.name ? <ErrorMessage role="alert">{errors.name}</ErrorMessage> : null}
          </Field>

          <Field>
            <label htmlFor="register-email">E-mail</label>
            <input
              id="register-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                clearFieldError("email");
              }}
            />
            {errors.email ? <ErrorMessage role="alert">{errors.email}</ErrorMessage> : null}
          </Field>

          <Field>
            <label htmlFor="register-password">Senha</label>
            <input
              id="register-password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                clearFieldError("password");
              }}
            />
            {errors.password ? (
              <ErrorMessage role="alert">{errors.password}</ErrorMessage>
            ) : null}
          </Field>

          <Field>
            <label htmlFor="confirm-password">Confirmar senha</label>
            <input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                clearFieldError("confirmPassword");
              }}
            />
            {errors.confirmPassword ? (
              <ErrorMessage role="alert">{errors.confirmPassword}</ErrorMessage>
            ) : null}
          </Field>

          {formError ? <ErrorMessage role="alert">{formError}</ErrorMessage> : null}
          {success ? <SuccessMessage role="status">{success}</SuccessMessage> : null}

          <button type="submit" disabled={isSubmitting || Boolean(success)}>
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </button>
        </Form>

        <SwitchAuthText>
          Ja possui uma conta? <Link to="/login">Entrar</Link>
        </SwitchAuthText>
      </LoginPanel>
    </PageShell>
  );
};

export default Register;

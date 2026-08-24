const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type ApiErrorResponse = {
  error?: string;
  details?: string[];
  message?: string;
};

export class ApiRequestError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
  }
}

export async function apiFetch<TResponse>(
  path: string,
  options: RequestInit = {},
): Promise<TResponse> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  } catch {
    throw new ApiRequestError("Nao foi possivel conectar a API.");
  }

  if (!response.ok) {
    throw new ApiRequestError(
      await readErrorMessage(response),
      response.status,
    );
  }

  if (response.status === 204) {
    return undefined as TResponse;
  }

  const text = await response.text();

  if (!text) {
    return undefined as TResponse;
  }

  return JSON.parse(text) as TResponse;
}

async function readErrorMessage(response: Response) {
  try {
    const data = (await response.json()) as ApiErrorResponse;
    return (
      data.details?.[0] ??
      data.message ??
      data.error ??
      "Erro ao processar a requisicao."
    );
  } catch {
    return response.status === 401 || response.status === 403
      ? "E-mail ou senha invalidos."
      : "Erro ao processar a requisicao.";
  }
}

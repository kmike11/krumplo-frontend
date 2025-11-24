import type {
  AuthResponse,
  Board,
  BoardCard,
  BoardSummary,
  CreateBoardInput,
  CreateCardInput,
  CreateColumnInput,
  MoveCardInput,
  ReorderColumnsInput,
  UpdateBoardInput,
  UpdateCardInput,
  UpdateColumnInput,
  User
} from "../types/api";

const apiBaseFromEnv = import.meta.env.RSBUILD_PUBLIC_API_URL;
const API_BASE = (apiBaseFromEnv ?? "http://localhost:3000/api").replace(
  /\/$/,
  ""
);

const request = async <TResponse>(
  path: string,
  options: RequestInit & { token?: string } = {}
): Promise<TResponse> => {
  const { token, ...init } = options;
  const headers = new Headers(init.headers ?? {});
  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }
  if (
    init.body &&
    !(init.body instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE}${path}`, { ...init, headers });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const payload: unknown = await response.json();
      if (payload && typeof payload === "object" && "message" in payload) {
        const { message: serverMessage } = payload as {
          message?: unknown;
        };
        if (typeof serverMessage === "string") {
          message = serverMessage;
        } else if (Array.isArray(serverMessage)) {
          const normalized = serverMessage.filter(
            (entry): entry is string => typeof entry === "string"
          );
          if (normalized.length > 0) {
            message = normalized.join(", ");
          }
        }
      }
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as TResponse;
  }

  return (await response.json()) as TResponse;
};

export const loginRequest = async (input: {
  email: string;
  password: string;
}) => {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input)
  });
};

export const registerRequest = async (input: {
  email: string;
  password: string;
  displayName: string;
}) => {
  return request<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ ...input, role: "USER" })
  });
};

export const getCurrentUser = async (token: string) => {
  return request<User>("/users/me", {
    method: "GET",
    token
  });
};

export const getBoards = async (token: string) => {
  return request<BoardSummary[]>("/boards", {
    method: "GET",
    token
  });
};

export const getBoardById = async (boardId: string, token: string) => {
  return request<Board>(`/boards/${boardId}`, {
    method: "GET",
    token
  });
};

export const createBoard = async (input: CreateBoardInput, token: string) => {
  return request<Board>("/boards", {
    method: "POST",
    token,
    body: JSON.stringify(input)
  });
};

export const updateBoard = async (
  boardId: string,
  input: UpdateBoardInput,
  token: string
) => {
  return request<Board>(`/boards/${boardId}`, {
    method: "PATCH",
    token,
    body: JSON.stringify(input)
  });
};

export const deleteBoard = async (boardId: string, token: string) => {
  return request<void>(`/boards/${boardId}`, {
    method: "DELETE",
    token
  });
};

export const createColumn = async (
  boardId: string,
  input: CreateColumnInput,
  token: string
) => {
  return request<Board>(`/boards/${boardId}/columns`, {
    method: "POST",
    token,
    body: JSON.stringify(input)
  });
};

export const updateColumn = async (
  boardId: string,
  columnId: string,
  input: UpdateColumnInput,
  token: string
) => {
  return request<Board>(`/boards/${boardId}/columns/${columnId}`, {
    method: "PATCH",
    token,
    body: JSON.stringify(input)
  });
};

export const deleteColumn = async (
  boardId: string,
  columnId: string,
  token: string
) => {
  return request<Board>(`/boards/${boardId}/columns/${columnId}`, {
    method: "DELETE",
    token
  });
};

export const reorderColumns = async (
  boardId: string,
  input: ReorderColumnsInput,
  token: string
) => {
  return request<Board>(`/boards/${boardId}/columns/reorder`, {
    method: "PATCH",
    token,
    body: JSON.stringify(input)
  });
};

export const createCard = async (
  boardId: string,
  columnId: string,
  input: CreateCardInput,
  token: string
) => {
  return request<BoardCard>(`/boards/${boardId}/columns/${columnId}/cards`, {
    method: "POST",
    token,
    body: JSON.stringify(input)
  });
};

export const updateCard = async (
  cardId: string,
  input: UpdateCardInput,
  token: string
) => {
  return request<BoardCard>(`/boards/cards/${cardId}`, {
    method: "PATCH",
    token,
    body: JSON.stringify(input)
  });
};

export const deleteCard = async (cardId: string, token: string) => {
  return request<void>(`/boards/cards/${cardId}`, {
    method: "DELETE",
    token
  });
};

export const moveCard = async (
  cardId: string,
  input: MoveCardInput,
  token: string
) => {
  return request<BoardCard>(`/boards/cards/${cardId}/move`, {
    method: "PATCH",
    token,
    body: JSON.stringify(input)
  });
};

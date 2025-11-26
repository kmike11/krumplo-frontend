import type {
  AuthResponse,
  Board,
  BoardCard,
  BoardSummary,
  AddBoardMemberInput,
  AddCommentInput,
  CreateBoardInput,
  CreateCardInput,
  CreateColumnInput,
  MoveCardInput,
  ReorderColumnsInput,
  UpdateBoardInput,
  UpdateCardInput,
  UpdateColumnInput,
  UpdateCommentInput,
  User
} from "../types/api";
import { parseAuthResponse, parseUser } from "../utils/apiGuards";
import {
  AuthApi,
  BoardsApi,
  UsersApi,
  Configuration,
  ResponseError,
  VoidApiResponse
} from "../api";
import type { CreateCardDto, UpdateCardDto } from "../api";

const apiBaseFromEnv = import.meta.env.RSBUILD_PUBLIC_API_URL;
const API_BASE = (apiBaseFromEnv ?? "http://localhost:3000/api").replace(
  /\/$/,
  ""
);
const API_ROOT = API_BASE.endsWith("/api")
  ? API_BASE.slice(0, Math.max(0, API_BASE.length - 4))
  : API_BASE;

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

const requireToken = (token?: string) => {
  if (!token) {
    throw new Error("Missing authentication token");
  }
  return token;
};

const createConfiguration = (token?: string) =>
  new Configuration({
    basePath: API_ROOT,
    accessToken: token ? async () => token : undefined
  });

const getAuthApi = () => new AuthApi(createConfiguration());
const getBoardsApi = (token: string) =>
  new BoardsApi(createConfiguration(token));
const getUsersApi = (token: string) => new UsersApi(createConfiguration(token));

const readJsonResponse = async <T>(
  response: VoidApiResponse
): Promise<T | undefined> => {
  if (response.raw.status === 204) {
    return undefined;
  }
  const text = await response.raw.text();
  if (!text) {
    return undefined;
  }
  return JSON.parse(text) as T;
};

const ensurePayload = <T>(payload: T | undefined, message: string): T => {
  if (payload === undefined || payload === null) {
    throw new Error(message);
  }
  return payload;
};

const withErrorHandling = async <T>(operation: () => Promise<T>) => {
  try {
    return await operation();
  } catch (error) {
    throw await normalizeError(error);
  }
};

const normalizeError = async (error: unknown): Promise<Error> => {
  if (error instanceof ResponseError) {
    const message = await extractErrorMessage(error);
    return new Error(message);
  }
  if (error instanceof Error) {
    return error;
  }
  return new Error("An unexpected error occurred");
};

const extractErrorMessage = async (error: ResponseError) => {
  try {
    const text = await error.response.text();
    if (!text) {
      return `Request failed with status ${error.response.status}`;
    }
    const payload = JSON.parse(text) as unknown;
    if (isRecord(payload) && "message" in payload) {
      const { message } = payload as { message?: unknown };
      if (typeof message === "string") {
        return message;
      }
      if (Array.isArray(message)) {
        const normalized = message.filter(
          (entry): entry is string => typeof entry === "string"
        );
        if (normalized.length) {
          return normalized.join(", ");
        }
      }
    }
    if (typeof payload === "string") {
      return payload;
    }
  } catch {
    // ignore JSON parse failures
  }
  return `Request failed with status ${error.response.status}`;
};

const withBoardsApi = async <T>(
  token: string | undefined,
  callback: (api: BoardsApi) => Promise<T>
) => {
  const resolvedToken = requireToken(token);
  return withErrorHandling(() => callback(getBoardsApi(resolvedToken)));
};

const withUsersApi = async <T>(
  token: string | undefined,
  callback: (api: UsersApi) => Promise<T>
) => {
  const resolvedToken = requireToken(token);
  return withErrorHandling(() => callback(getUsersApi(resolvedToken)));
};

const withAuthApi = async <T>(callback: (api: AuthApi) => Promise<T>) => {
  return withErrorHandling(() => callback(getAuthApi()));
};

const toDateOrUndefined = (value?: string) => {
  return value ? new Date(value) : undefined;
};

const toCreateCardDto = (input: CreateCardInput): CreateCardDto => ({
  ...input,
  dueDate: toDateOrUndefined(input.dueDate)
});

const toUpdateCardDto = (input: UpdateCardInput): UpdateCardDto => ({
  ...input,
  dueDate: toDateOrUndefined(input.dueDate)
});

export const loginRequest = async (input: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  return withAuthApi(async (api) => {
    const response = await api.authControllerLoginRaw({
      loginDto: { email: input.email, password: input.password }
    });
    const payload = await readJsonResponse<unknown>(response);
    return parseAuthResponse(payload);
  });
};

export const registerRequest = async (input: {
  email: string;
  password: string;
  displayName: string;
}): Promise<AuthResponse> => {
  return withAuthApi(async (api) => {
    const response = await api.authControllerRegisterRaw({
      registerDto: {
        email: input.email,
        password: input.password,
        displayName: input.displayName,
        role: "USER"
      }
    });
    const payload = await readJsonResponse<unknown>(response);
    return parseAuthResponse(payload);
  });
};

export const getCurrentUser = async (token: string): Promise<User> => {
  return withUsersApi(token, async (api) => {
    const response = await api.usersControllerGetCurrentUserRaw();
    const payload = await readJsonResponse<unknown>(response);
    return parseUser(payload);
  });
};

export const getBoards = async (token: string) => {
  return withBoardsApi(token, async (api) => {
    const response = await api.boardsControllerListBoardsRaw();
    return ensurePayload<BoardSummary[]>(
      await readJsonResponse(response),
      "Unable to load boards"
    );
  });
};

export const getBoardById = async (boardId: string, token: string) => {
  return withBoardsApi(token, async (api) => {
    const response = await api.boardsControllerGetBoardRaw({ boardId });
    return ensurePayload<Board>(
      await readJsonResponse(response),
      "Unable to load board"
    );
  });
};

export const createBoard = async (input: CreateBoardInput, token: string) => {
  return withBoardsApi(token, async (api) => {
    const response = await api.boardsControllerCreateBoardRaw({
      createBoardDto: input
    });
    return ensurePayload<Board>(
      await readJsonResponse(response),
      "Unable to create board"
    );
  });
};

export const updateBoard = async (
  boardId: string,
  input: UpdateBoardInput,
  token: string
) => {
  return withBoardsApi(token, async (api) => {
    const response = await api.boardsControllerUpdateBoardRaw({
      boardId,
      updateBoardDto: input
    });
    return ensurePayload<Board>(
      await readJsonResponse(response),
      "Unable to update board"
    );
  });
};

export const deleteBoard = async (boardId: string, token: string) => {
  return withBoardsApi(token, async (api) => {
    await api.boardsControllerDeleteBoard({ boardId });
  });
};

export const addBoardMember = async (
  boardId: string,
  input: AddBoardMemberInput,
  token: string
) => {
  return withBoardsApi(token, async (api) => {
    const response = await api.boardsControllerAddMemberRaw({
      boardId,
      addBoardMemberDto: input
    });
    return ensurePayload<Board>(
      await readJsonResponse(response),
      "Unable to add board member"
    );
  });
};

export const createComment = async (
  cardId: string,
  input: AddCommentInput,
  token: string
) => {
  return withBoardsApi(token, async (api) => {
    const response = await api.boardsControllerAddCommentRaw({
      cardId,
      addCommentDto: input
    });
    return ensurePayload<BoardCard>(
      await readJsonResponse(response),
      "Unable to add comment"
    );
  });
};

export const updateComment = async (
  cardId: string,
  commentId: string,
  input: UpdateCommentInput,
  token: string
) => {
  return withBoardsApi(token, async (api) => {
    const response = await api.boardsControllerUpdateCommentRaw({
      cardId,
      commentId,
      updateCommentDto: input
    });
    return ensurePayload<BoardCard>(
      await readJsonResponse(response),
      "Unable to update comment"
    );
  });
};

export const deleteComment = async (
  cardId: string,
  commentId: string,
  token: string
) => {
  return withBoardsApi(token, async (api) => {
    const response = await api.boardsControllerDeleteCommentRaw({
      cardId,
      commentId
    });
    return ensurePayload<BoardCard>(
      await readJsonResponse(response),
      "Unable to delete comment"
    );
  });
};

export const createColumn = async (
  boardId: string,
  input: CreateColumnInput,
  token: string
) => {
  return withBoardsApi(token, async (api) => {
    const response = await api.boardsControllerCreateColumnRaw({
      boardId,
      createColumnDto: input
    });
    return ensurePayload<Board>(
      await readJsonResponse(response),
      "Unable to create column"
    );
  });
};

export const updateColumn = async (
  boardId: string,
  columnId: string,
  input: UpdateColumnInput,
  token: string
) => {
  return withBoardsApi(token, async (api) => {
    const response = await api.boardsControllerUpdateColumnRaw({
      boardId,
      columnId,
      updateColumnDto: input
    });
    return ensurePayload<Board>(
      await readJsonResponse(response),
      "Unable to update column"
    );
  });
};

export const deleteColumn = async (
  boardId: string,
  columnId: string,
  token: string
) => {
  return withBoardsApi(token, async (api) => {
    const response = await api.boardsControllerDeleteColumnRaw({
      boardId,
      columnId
    });
    return ensurePayload<Board>(
      await readJsonResponse(response),
      "Unable to delete column"
    );
  });
};

export const reorderColumns = async (
  boardId: string,
  input: ReorderColumnsInput,
  token: string
) => {
  return withBoardsApi(token, async (api) => {
    const response = await api.boardsControllerReorderColumnsRaw({
      boardId,
      reorderColumnsDto: input
    });
    return ensurePayload<Board>(
      await readJsonResponse(response),
      "Unable to reorder columns"
    );
  });
};

export const createCard = async (
  boardId: string,
  columnId: string,
  input: CreateCardInput,
  token: string
) => {
  return withBoardsApi(token, async (api) => {
    const response = await api.boardsControllerCreateCardRaw({
      boardId,
      columnId,
      createCardDto: toCreateCardDto(input)
    });
    return ensurePayload<BoardCard>(
      await readJsonResponse(response),
      "Unable to create card"
    );
  });
};

export const updateCard = async (
  cardId: string,
  input: UpdateCardInput,
  token: string
) => {
  return withBoardsApi(token, async (api) => {
    const response = await api.boardsControllerUpdateCardRaw({
      cardId,
      updateCardDto: toUpdateCardDto(input)
    });
    return ensurePayload<BoardCard>(
      await readJsonResponse(response),
      "Unable to update card"
    );
  });
};

export const deleteCard = async (cardId: string, token: string) => {
  return withBoardsApi(token, async (api) => {
    await api.boardsControllerDeleteCard({ cardId });
  });
};

export const moveCard = async (
  cardId: string,
  input: MoveCardInput,
  token: string
) => {
  return withBoardsApi(token, async (api) => {
    const response = await api.boardsControllerMoveCardRaw({
      cardId,
      moveCardDto: input
    });
    return ensurePayload<BoardCard>(
      await readJsonResponse(response),
      "Unable to move card"
    );
  });
};

import type { AuthResponse, User } from "../types/api";

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

export const isUser = (payload: unknown): payload is User => {
  if (!isRecord(payload)) {
    return false;
  }

  return (
    typeof payload.id === "string" &&
    typeof payload.email === "string" &&
    typeof payload.displayName === "string" &&
    typeof payload.role === "string"
  );
};

export const parseUser = (payload: unknown): User => {
  if (!isUser(payload)) {
    throw new Error("Received malformed user payload");
  }
  return payload;
};

export const parseAuthResponse = (payload: unknown): AuthResponse => {
  if (!isRecord(payload)) {
    throw new Error("Received malformed auth payload");
  }

  const { accessToken, user } = payload;
  if (typeof accessToken !== "string" || !isUser(user)) {
    throw new Error("Received malformed auth payload");
  }

  return {
    accessToken,
    user
  };
};

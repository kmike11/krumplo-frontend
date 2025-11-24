import { Configuration, AuthApi, BoardsApi, UsersApi } from "../api";

const apiBaseFromEnv = import.meta.env.RSBUILD_PUBLIC_API_URL;
const basePath = (apiBaseFromEnv ?? "http://localhost:3000").replace(/\/$/, "");

const getConfiguration = (token?: string | null) =>
  new Configuration({
    basePath,
    accessToken: () => token ?? ""
  });

export const createAuthApi = (token?: string | null) =>
  new AuthApi(getConfiguration(token));

export const createBoardsApi = (token?: string | null) =>
  new BoardsApi(getConfiguration(token));

export const createUsersApi = (token?: string | null) =>
  new UsersApi(getConfiguration(token));

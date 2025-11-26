import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import type { ContextType } from "react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { BoardListPage, parseBoardSummaries } from "./BoardListPage";
import { getBoards, createBoard } from "../services/api";

type AuthContextValue = NonNullable<ContextType<typeof AuthContext>>;

jest.mock("../services/api", () => ({
  getBoards: jest.fn(),
  createBoard: jest.fn()
}));

const getBoardsMock = jest.mocked(getBoards);
const createBoardMock = jest.mocked(createBoard);

const buildAuthContextValue = (): AuthContextValue => ({
  user: null,
  token: "test-token",
  isAuthenticated: true,
  isLoading: false,
  login: jest.fn(),
  logout: jest.fn(),
  refresh: jest.fn().mockResolvedValue(undefined),
  setUser: jest.fn()
});

const renderBoardListPage = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  });

  const view = render(
    <AuthContext.Provider value={buildAuthContextValue()}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <BoardListPage />
        </MemoryRouter>
      </QueryClientProvider>
    </AuthContext.Provider>
  );

  return { ...view, queryClient };
};

describe("parseBoardSummaries", () => {
  it("normalizes raw board payloads", () => {
    const payload = [
      {
        id: "board-1",
        name: "Roadmap",
        description: "Main initiatives",
        updatedAt: "2024-01-01T00:00:00.000Z",
        favorite: true,
        memberCount: 3,
        columnCount: 4
      }
    ];

    const result = parseBoardSummaries(payload);

    expect(result).toEqual([
      {
        id: "board-1",
        name: "Roadmap",
        description: "Main initiatives",
        updatedAt: "2024-01-01T00:00:00.000Z",
        favorite: true,
        memberCount: 3,
        columnCount: 4
      }
    ]);
  });

  it("throws for malformed payloads", () => {
    expect(() => parseBoardSummaries([{ id: 123 }])).toThrow(
      "Received malformed board payload"
    );
  });
});

describe("BoardListPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("requests boards and renders the list", async () => {
    getBoardsMock.mockResolvedValueOnce([
      {
        id: "board-2",
        name: "Growth Experiments",
        description: "Validate next bet",
        updatedAt: "2024-02-05T10:00:00.000Z"
      }
    ]);

    createBoardMock.mockResolvedValue({} as any);

    const { queryClient } = renderBoardListPage();

    await waitFor(() => {
      expect(getBoardsMock).toHaveBeenCalledWith("test-token");
    });

    expect(await screen.findByText("Growth Experiments")).toBeInTheDocument();
    expect(screen.getByText("Boards")).toBeInTheDocument();

    queryClient.clear();
  });
});

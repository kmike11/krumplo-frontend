import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { LoadingScreen } from "../components/shared/LoadingScreen";
import { createBoardsApi } from "../services/apiClient";
import type { BoardSummary, CreateBoardInput } from "../types/api";

const parseBoardSummaries = (payload: unknown): BoardSummary[] => {
  if (!Array.isArray(payload)) {
    throw new Error("Unexpected response when loading boards");
  }

  return payload.map((item) => {
    if (typeof item !== "object" || item === null) {
      throw new Error("Received malformed board payload");
    }
    const candidate = item as Partial<BoardSummary>;
    if (
      typeof candidate.id !== "string" ||
      typeof candidate.name !== "string" ||
      typeof candidate.updatedAt !== "string"
    ) {
      throw new Error("Received malformed board payload");
    }
    return {
      id: candidate.id,
      name: candidate.name,
      description: candidate.description ?? null,
      updatedAt: candidate.updatedAt,
      favorite: candidate.favorite,
      memberCount: candidate.memberCount,
      columnCount: candidate.columnCount
    };
  });
};

export const BoardListPage = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState<CreateBoardInput>({
    name: "",
    description: ""
  });

  const { data, isLoading, isError, error, refetch } = useQuery<
    BoardSummary[],
    Error
  >({
    queryKey: ["boards"],
    queryFn: async () => {
      const boardsApi = createBoardsApi(token);
      const response = await boardsApi.boardsControllerListBoardsRaw();
      const payload: unknown = await response.raw.json();
      return parseBoardSummaries(payload);
    },
    enabled: Boolean(token)
  });

  const createBoardMutation = useMutation<void, Error, CreateBoardInput>({
    mutationFn: async (input: CreateBoardInput) => {
      const boardsApi = createBoardsApi(token);
      const response = await boardsApi.boardsControllerCreateBoardRaw({
        createBoardDto: input
      });
      await response.raw.json();
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["boards"] });
      setCreateForm({ name: "", description: "" });
      setIsCreateOpen(false);
    }
  });

  const handleCreateChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setCreateForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) {
      return;
    }

    createBoardMutation.mutate({
      name: createForm.name.trim(),
      description: createForm.description?.trim()
        ? createForm.description.trim()
        : undefined
    });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    const handleRetry = () => {
      void refetch();
    };
    return (
      <div className="card-surface" style={{ padding: "2rem" }}>
        <p className="error-text">
          {error?.message ?? "Unable to load boards right now."}
        </p>
        <button
          type="button"
          className="button secondary"
          onClick={handleRetry}
          style={{ marginTop: "1rem" }}
        >
          Try again
        </button>
      </div>
    );
  }

  const renderCreateDrawer = () => {
    if (!isCreateOpen) {
      return null;
    }

    return (
      <div className="drawer-backdrop" role="presentation">
        <div
          className="drawer"
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-board-title"
        >
          <header className="drawer__section-header">
            <div>
              <h2 id="create-board-title" style={{ margin: 0 }}>
                Create board
              </h2>
              <p className="helper-text" style={{ marginTop: "0.25rem" }}>
                Stand up a new collaborative space for your initiative.
              </p>
            </div>
            <button
              type="button"
              className="button ghost"
              onClick={() => setIsCreateOpen(false)}
            >
              Close
            </button>
          </header>

          <form
            onSubmit={handleCreateSubmit}
            className="drawer__section"
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="board-name">Board name</label>
              <input
                id="board-name"
                name="name"
                className="form-control"
                value={createForm.name}
                onChange={handleCreateChange}
                placeholder="Product roadmap"
                required
                autoFocus
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="board-description">Description</label>
              <textarea
                id="board-description"
                name="description"
                className="form-control"
                rows={4}
                value={createForm.description}
                onChange={handleCreateChange}
                placeholder="What is this board for?"
              />
            </div>

            {createBoardMutation.isError && createBoardMutation.error ? (
              <p className="error-text" role="alert">
                {createBoardMutation.error.message}
              </p>
            ) : null}

            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                justifyContent: "flex-end"
              }}
            >
              <button
                type="button"
                className="button ghost"
                onClick={() => setIsCreateOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="button"
                disabled={
                  createBoardMutation.isPending || !createForm.name.trim()
                }
              >
                {createBoardMutation.isPending ? "Creating…" : "Create board"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  if (!data || data.length === 0) {
    return (
      <>
        <div
          className="card-surface"
          style={{ padding: "2.5rem", textAlign: "center" }}
        >
          <h2 style={{ marginTop: 0 }}>No boards yet</h2>
          <p className="helper-text">
            Create your first board to start planning workstreams.
          </p>
          <button
            type="button"
            className="button"
            style={{ marginTop: "1.5rem" }}
            onClick={() => setIsCreateOpen(true)}
          >
            Create board
          </button>
        </div>
        {renderCreateDrawer()}
      </>
    );
  }

  return (
    <>
      <section
        style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: "1.8rem" }}>Boards</h1>
            <p className="helper-text" style={{ marginTop: "0.35rem" }}>
              Browse all product and delivery boards your team collaborates on.
            </p>
          </div>
          <button
            type="button"
            className="button secondary"
            onClick={() => setIsCreateOpen(true)}
          >
            New board
          </button>
        </header>
        <div
          style={{
            display: "grid",
            gap: "1.25rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))"
          }}
        >
          {data.map((board: BoardSummary) => (
            <Link
              key={board.id}
              to={`/boards/${board.id}`}
              className="card-surface"
              style={{ padding: "1.5rem" }}
            >
              <span className="badge" style={{ marginBottom: "0.85rem" }}>
                Updated {new Date(board.updatedAt).toLocaleDateString()}
              </span>
              <h3 style={{ marginTop: 0, marginBottom: "0.5rem" }}>
                {board.name}
              </h3>
              {board.description ? (
                <p className="helper-text" style={{ marginBottom: 0 }}>
                  {board.description}
                </p>
              ) : (
                <p className="helper-text" style={{ marginBottom: 0 }}>
                  No description yet.
                </p>
              )}
            </Link>
          ))}
        </div>
      </section>

      {renderCreateDrawer()}
    </>
  );
};

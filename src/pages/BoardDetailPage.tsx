import { useCallback, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoadingScreen } from "../components/shared/LoadingScreen";
import { BoardColumnSection } from "../components/board/BoardColumnSection";
import { CardDetailsDrawer } from "../components/board/CardDetailsDrawer";
import { ConfirmDialog } from "../components/board/ConfirmDialog";
import { BoardSettingsDrawer } from "../components/board/BoardSettingsDrawer";
import { useAuth } from "../hooks/useAuth";
import { createBoardsApi } from "../services/apiClient";
import type { AddBoardMemberDto } from "../api/models/AddBoardMemberDto";
import type { DraggedCard } from "../components/board/dnd";
import type {
  Board,
  BoardCard,
  BoardColumn,
  UpdateBoardInput,
  UpdateCardInput,
  UpdateColumnInput
} from "../types/api";
import type {
  AddCommentDto,
  UpdateBoardDto,
  UpdateCardDto,
  UpdateCommentDto
} from "../api";

interface CreateCardVariables {
  columnId: string;
  title: string;
}

interface MoveCardVariables {
  cardId: string;
  targetColumnId: string;
  targetPosition: number;
}

interface UpdateCardVariables {
  cardId: string;
  payload: Partial<UpdateCardInput>;
}

interface AddCommentVariables {
  cardId: string;
  content: string;
}

interface UpdateCommentVariables {
  cardId: string;
  commentId: string;
  content: string;
}

interface DeleteCommentVariables {
  cardId: string;
  commentId: string;
}

export const BoardDetailPage = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const replaceCardInBoard = useCallback(
    (nextCard: BoardCard) => {
      if (!boardId) {
        return;
      }
      queryClient.setQueryData(["board", boardId], (current?: Board) => {
        if (!current) {
          return current;
        }
        return {
          ...current,
          columns: current.columns.map((column) => ({
            ...column,
            cards: column.cards.map((card) =>
              card.id === nextCard.id ? nextCard : card
            )
          }))
        };
      });
    },
    [boardId, queryClient]
  );
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [cardDrafts, setCardDrafts] = useState<Record<string, string>>({});
  const [activeCardColumn, setActiveCardColumn] = useState<string | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [cardPendingDeletion, setCardPendingDeletion] =
    useState<BoardCard | null>(null);
  const [isBoardSettingsOpen, setIsBoardSettingsOpen] = useState(false);
  const [isBoardDeleteDialogOpen, setIsBoardDeleteDialogOpen] = useState(false);
  const [columnPendingDeletion, setColumnPendingDeletion] =
    useState<BoardColumn | null>(null);
  const [inviteEmail, setInviteEmail] = useState("");

  const boardQuery = useQuery<Board, Error>({
    queryKey: ["board", boardId],
    enabled: Boolean(boardId && token),
    queryFn: async () => {
      if (!boardId || !token) {
        throw new Error("Missing board context");
      }
      const boardsApi = createBoardsApi(token);
      const response = await boardsApi.boardsControllerGetBoardRaw({
        boardId
      });
      return (await response.raw.json()) as Board;
    }
  });

  const handleRefetchBoard = () => {
    void boardQuery.refetch();
  };

  const canManageBoard = useMemo(() => {
    if (!user || !boardQuery.data) {
      return false;
    }
    const isOwner = boardQuery.data.owner?.id === user.id;
    return isOwner || user.role === "ADMIN";
  }, [boardQuery.data, user]);

  const isBoardMember = useMemo(() => {
    if (!user || !boardQuery.data) {
      return false;
    }
    if (canManageBoard) {
      return true;
    }
    return boardQuery.data.members.some((member) => member.id === user.id);
  }, [boardQuery.data, canManageBoard, user]);

  const canManageTasks = isBoardMember;

  const createColumnMutation = useMutation<Board, Error, { title: string }>({
    mutationFn: async ({ title }) => {
      if (!boardId || !token) {
        throw new Error("Missing board context");
      }
      const boardsApi = createBoardsApi(token);
      const response = await boardsApi.boardsControllerCreateColumnRaw({
        boardId,
        createColumnDto: { title: title.trim() }
      });
      return (await response.raw.json()) as Board;
    },
    onSuccess: (updatedBoard) => {
      if (boardId) {
        queryClient.setQueryData(["board", boardId], updatedBoard);
      }
      setNewColumnTitle("");
    }
  });

  const createCardMutation = useMutation<BoardCard, Error, CreateCardVariables>(
    {
      mutationFn: async ({ columnId, title }) => {
        if (!boardId || !token) {
          throw new Error("Missing board context");
        }
        const boardsApi = createBoardsApi(token);
        const response = await boardsApi.boardsControllerCreateCardRaw({
          boardId,
          columnId,
          createCardDto: { title: title.trim() }
        });
        return (await response.raw.json()) as BoardCard;
      },
      onMutate: ({ columnId }) => {
        setActiveCardColumn(columnId);
      },
      onSuccess: (_, { columnId }) => {
        setCardDrafts((prev) => ({ ...prev, [columnId]: "" }));
        if (boardId) {
          void queryClient.invalidateQueries({ queryKey: ["board", boardId] });
        }
      },
      onSettled: () => {
        setActiveCardColumn(null);
      }
    }
  );

  const moveCardMutation = useMutation<BoardCard, Error, MoveCardVariables>({
    mutationFn: async ({ cardId, targetColumnId, targetPosition }) => {
      if (!token) {
        throw new Error("Missing board context");
      }
      const boardsApi = createBoardsApi(token);
      const response = await boardsApi.boardsControllerMoveCardRaw({
        cardId,
        moveCardDto: {
          targetColumnId,
          targetPosition
        }
      });
      return (await response.raw.json()) as BoardCard;
    },
    onSuccess: () => {
      if (boardId) {
        void queryClient.invalidateQueries({ queryKey: ["board", boardId] });
      }
    }
  });

  const updateCardMutation = useMutation<BoardCard, Error, UpdateCardVariables>(
    {
      mutationFn: async ({ cardId, payload }) => {
        if (!token) {
          throw new Error("Missing board context");
        }
        const boardsApi = createBoardsApi(token);
        const updatePayload: UpdateCardDto = {
          ...payload,
          dueDate: payload.dueDate ? new Date(payload.dueDate) : undefined
        };
        const response = await boardsApi.boardsControllerUpdateCardRaw({
          cardId,
          updateCardDto: updatePayload
        });
        return (await response.raw.json()) as BoardCard;
      },
      onSuccess: (updatedCard) => {
        replaceCardInBoard(updatedCard);
      }
    }
  );

  const addCommentMutation = useMutation<BoardCard, Error, AddCommentVariables>(
    {
      mutationFn: async ({ cardId, content }) => {
        if (!token) {
          throw new Error("Missing board context");
        }
        const normalized = content.trim();
        if (!normalized) {
          throw new Error("Comment cannot be empty");
        }
        const boardsApi = createBoardsApi(token);
        const payload: AddCommentDto = { content: normalized };
        const response = await boardsApi.boardsControllerAddCommentRaw({
          cardId,
          addCommentDto: payload
        });
        return (await response.raw.json()) as BoardCard;
      },
      onSuccess: (updatedCard) => {
        replaceCardInBoard(updatedCard);
      }
    }
  );

  const updateCommentMutation = useMutation<
    BoardCard,
    Error,
    UpdateCommentVariables
  >({
    mutationFn: async ({ cardId, commentId, content }) => {
      if (!token) {
        throw new Error("Missing board context");
      }
      const normalized = content.trim();
      if (!normalized) {
        throw new Error("Comment cannot be empty");
      }
      const boardsApi = createBoardsApi(token);
      const payload: UpdateCommentDto = { content: normalized };
      const response = await boardsApi.boardsControllerUpdateCommentRaw({
        cardId,
        commentId,
        updateCommentDto: payload
      });
      return (await response.raw.json()) as BoardCard;
    },
    onSuccess: (updatedCard) => {
      replaceCardInBoard(updatedCard);
    }
  });

  const deleteCommentMutation = useMutation<
    BoardCard,
    Error,
    DeleteCommentVariables
  >({
    mutationFn: async ({ cardId, commentId }) => {
      if (!token) {
        throw new Error("Missing board context");
      }
      const boardsApi = createBoardsApi(token);
      const response = await boardsApi.boardsControllerDeleteCommentRaw({
        cardId,
        commentId
      });
      return (await response.raw.json()) as BoardCard;
    },
    onSuccess: (updatedCard) => {
      replaceCardInBoard(updatedCard);
    }
  });

  const updateBoardMutation = useMutation<
    Board,
    Error,
    Partial<UpdateBoardInput>
  >({
    mutationFn: async (payload) => {
      if (!boardId || !token) {
        throw new Error("Missing board context");
      }
      const boardsApi = createBoardsApi(token);
      const updatePayload: UpdateBoardDto = { ...payload };
      const response = await boardsApi.boardsControllerUpdateBoardRaw({
        boardId,
        updateBoardDto: updatePayload
      });
      return (await response.raw.json()) as Board;
    },
    onSuccess: (updatedBoard) => {
      if (boardId) {
        queryClient.setQueryData(["board", boardId], updatedBoard);
      }
      setIsBoardSettingsOpen(false);
      void queryClient.invalidateQueries({ queryKey: ["boards"] });
    }
  });

  const deleteBoardMutation = useMutation<void, Error>({
    mutationFn: async () => {
      if (!boardId || !token) {
        throw new Error("Missing board context");
      }
      const boardsApi = createBoardsApi(token);
      await boardsApi.boardsControllerDeleteBoard({ boardId });
    },
    onSuccess: () => {
      setIsBoardDeleteDialogOpen(false);
      setIsBoardSettingsOpen(false);
      if (boardId) {
        queryClient.removeQueries({
          queryKey: ["board", boardId],
          exact: true
        });
      }
      void queryClient.invalidateQueries({ queryKey: ["boards"] });
      navigate("/boards");
    }
  });

  const deleteCardMutation = useMutation<void, Error, { cardId: string }>({
    mutationFn: async ({ cardId }) => {
      if (!token) {
        throw new Error("Missing board context");
      }
      const boardsApi = createBoardsApi(token);
      await boardsApi.boardsControllerDeleteCard({ cardId });
    },
    onSuccess: (_, { cardId }) => {
      if (boardId) {
        queryClient.setQueryData(["board", boardId], (current?: Board) => {
          if (!current) {
            return current;
          }
          return {
            ...current,
            columns: current.columns.map((column) => ({
              ...column,
              cards: column.cards.filter((card) => card.id !== cardId)
            }))
          };
        });
      }
      setSelectedCardId((current) => (current === cardId ? null : current));
      setCardPendingDeletion(null);
    }
  });

  const updateColumnMutation = useMutation<
    Board,
    Error,
    { columnId: string; payload: Partial<UpdateColumnInput> }
  >({
    mutationFn: async ({ columnId, payload }) => {
      if (!boardId || !token) {
        throw new Error("Missing board context");
      }
      const boardsApi = createBoardsApi(token);
      const response = await boardsApi.boardsControllerUpdateColumnRaw({
        boardId,
        columnId,
        updateColumnDto: payload as UpdateColumnInput
      });
      return (await response.raw.json()) as Board;
    },
    onSuccess: (updatedBoard) => {
      if (boardId) {
        queryClient.setQueryData(["board", boardId], updatedBoard);
      }
    }
  });

  const deleteColumnMutation = useMutation<Board, Error, string>({
    mutationFn: async (columnId) => {
      if (!boardId || !token) {
        throw new Error("Missing board context");
      }
      const boardsApi = createBoardsApi(token);
      const response = await boardsApi.boardsControllerDeleteColumnRaw({
        boardId,
        columnId
      });
      return (await response.raw.json()) as Board;
    },
    onSuccess: (updatedBoard) => {
      setColumnPendingDeletion(null);
      if (boardId) {
        queryClient.setQueryData(["board", boardId], updatedBoard);
      }
    }
  });

  const addMemberMutation = useMutation<Board, Error, { email: string }>({
    mutationFn: async ({ email }) => {
      if (!boardId || !token) {
        throw new Error("Missing board context");
      }
      const boardsApi = createBoardsApi(token);
      const response = await boardsApi.boardsControllerAddMemberRaw({
        boardId,
        addBoardMemberDto: {
          email
        } as AddBoardMemberDto
      });
      return (await response.raw.json()) as Board;
    },
    onSuccess: (updatedBoard) => {
      setInviteEmail("");
      if (boardId) {
        queryClient.setQueryData(["board", boardId], updatedBoard);
      }
    }
  });
  const sortedColumns = useMemo(() => {
    if (!boardQuery.data) {
      return [];
    }
    return [...boardQuery.data.columns]
      .sort((a, b) => a.position - b.position)
      .map((column) => ({
        ...column,
        cards: [...column.cards].sort((a, b) => a.position - b.position)
      }));
  }, [boardQuery.data]);

  const selectedCard = useMemo(() => {
    if (!selectedCardId) {
      return null;
    }
    for (const column of sortedColumns) {
      const match = column.cards.find((card) => card.id === selectedCardId);
      if (match) {
        return match;
      }
    }
    return null;
  }, [selectedCardId, sortedColumns]);

  const commentActionState = {
    isAdding: addCommentMutation.isPending,
    addError: addCommentMutation.isError
      ? addCommentMutation.error.message
      : null,
    isUpdating: updateCommentMutation.isPending,
    updatingCommentId: updateCommentMutation.variables?.commentId ?? null,
    updateError: updateCommentMutation.isError
      ? updateCommentMutation.error.message
      : null,
    isDeleting: deleteCommentMutation.isPending,
    deletingCommentId: deleteCommentMutation.variables?.commentId ?? null,
    deleteError: deleteCommentMutation.isError
      ? deleteCommentMutation.error.message
      : null
  };

  const handleMoveCard = useCallback(
    (item: DraggedCard, targetColumnId: string, requestedIndex: number) => {
      if (!boardId || !canManageTasks) {
        return;
      }

      const targetColumn = sortedColumns.find(
        (col) => col.id === targetColumnId
      );
      const maxIndex = targetColumn ? targetColumn.cards.length : 0;
      const normalizedIndex = Math.max(0, Math.min(requestedIndex, maxIndex));

      if (
        item.sourceColumnId === targetColumnId &&
        item.sourceIndex === normalizedIndex
      ) {
        return;
      }

      moveCardMutation.mutate({
        cardId: item.cardId,
        targetColumnId,
        targetPosition: normalizedIndex
      });
    },
    [boardId, canManageTasks, moveCardMutation, sortedColumns]
  );

  const totalCards = useMemo(() => {
    return sortedColumns.reduce((sum, column) => sum + column.cards.length, 0);
  }, [sortedColumns]);

  const handleCreateColumn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newColumnTitle.trim() || createColumnMutation.isPending) {
      return;
    }
    createColumnMutation.mutate({ title: newColumnTitle });
  };

  const handleCreateCardSubmit = (columnId: string) => {
    if (!canManageTasks) {
      return;
    }
    const draft = cardDrafts[columnId]?.trim();
    if (!draft || createCardMutation.isPending) {
      return;
    }
    createCardMutation.mutate({ columnId, title: draft });
  };

  const handleCardDraftChange = (columnId: string, value: string) => {
    setCardDrafts((prev) => ({ ...prev, [columnId]: value }));
  };

  const handleCardSelect = (card: BoardCard) => {
    setSelectedCardId(card.id);
    updateCardMutation.reset();
  };

  const handleInviteSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canManageBoard) {
      return;
    }
    const normalized = inviteEmail.trim().toLowerCase();
    if (!normalized || addMemberMutation.isPending) {
      return;
    }
    addMemberMutation.mutate({ email: normalized });
  };

  const handleRenameColumn = (columnId: string, title: string) => {
    if (!canManageTasks || !boardId || !title.trim()) {
      return;
    }
    updateColumnMutation.mutate({ columnId, payload: { title: title.trim() } });
  };

  const handleRequestDeleteColumn = (column: BoardColumn) => {
    if (!canManageTasks) {
      return;
    }
    setColumnPendingDeletion(column);
    deleteColumnMutation.reset();
  };

  const handleCancelDeleteColumn = () => {
    setColumnPendingDeletion(null);
    deleteColumnMutation.reset();
  };

  const handleConfirmDeleteColumn = () => {
    if (!columnPendingDeletion || !canManageTasks) {
      return;
    }
    deleteColumnMutation.mutate(columnPendingDeletion.id);
  };

  const handleCloseCardDrawer = () => {
    setSelectedCardId(null);
    updateCardMutation.reset();
    setCardPendingDeletion(null);
    deleteCardMutation.reset();
    addCommentMutation.reset();
    updateCommentMutation.reset();
    deleteCommentMutation.reset();
  };

  const handleCardDetailsSubmit = (changes: Partial<UpdateCardInput>) => {
    if (!canManageTasks || !selectedCard || Object.keys(changes).length === 0) {
      return;
    }
    updateCardMutation.mutate({ cardId: selectedCard.id, payload: changes });
  };

  const handleAddComment = useCallback(
    async (content: string) => {
      if (!selectedCard) {
        return;
      }
      await addCommentMutation.mutateAsync({
        cardId: selectedCard.id,
        content
      });
    },
    [addCommentMutation, selectedCard]
  );

  const handleUpdateComment = useCallback(
    async (commentId: string, content: string) => {
      if (!selectedCard) {
        return;
      }
      await updateCommentMutation.mutateAsync({
        cardId: selectedCard.id,
        commentId,
        content
      });
    },
    [selectedCard, updateCommentMutation]
  );

  const handleDeleteComment = useCallback(
    async (commentId: string) => {
      if (!selectedCard) {
        return;
      }
      await deleteCommentMutation.mutateAsync({
        cardId: selectedCard.id,
        commentId
      });
    },
    [deleteCommentMutation, selectedCard]
  );

  const handleOpenBoardSettings = () => {
    if (!canManageBoard) {
      return;
    }
    setIsBoardSettingsOpen(true);
    updateBoardMutation.reset();
  };

  const handleCloseBoardSettings = () => {
    setIsBoardSettingsOpen(false);
    updateBoardMutation.reset();
  };

  const handleBoardSettingsSubmit = (changes: Partial<UpdateBoardInput>) => {
    if (!canManageBoard || !boardId || Object.keys(changes).length === 0) {
      return;
    }
    updateBoardMutation.mutate(changes);
  };

  const handleRequestDeleteBoard = () => {
    if (!canManageBoard) {
      return;
    }
    setIsBoardDeleteDialogOpen(true);
    deleteBoardMutation.reset();
  };

  const handleConfirmDeleteBoard = () => {
    if (!canManageBoard) {
      return;
    }
    deleteBoardMutation.mutate();
  };

  const handleCancelDeleteBoard = () => {
    setIsBoardDeleteDialogOpen(false);
    deleteBoardMutation.reset();
  };

  const handleRequestDeleteCard = (card: BoardCard) => {
    if (!canManageTasks) {
      return;
    }
    setCardPendingDeletion(card);
    deleteCardMutation.reset();
  };

  const handleConfirmDeleteCard = () => {
    if (!canManageTasks || !cardPendingDeletion) {
      return;
    }
    deleteCardMutation.mutate({ cardId: cardPendingDeletion.id });
  };

  const handleCancelDeleteCard = () => {
    setCardPendingDeletion(null);
    deleteCardMutation.reset();
  };

  if (!boardId) {
    return (
      <div className="card-surface" style={{ padding: "2rem" }}>
        <p className="error-text">Unable to determine which board to open.</p>
        <Link to="/boards" className="button" style={{ marginTop: "1rem" }}>
          Go back to boards
        </Link>
      </div>
    );
  }

  if (boardQuery.isLoading) {
    return <LoadingScreen />;
  }

  if (boardQuery.isError) {
    return (
      <div className="card-surface" style={{ padding: "2rem" }}>
        <p className="error-text">{boardQuery.error.message}</p>
        <button
          type="button"
          className="button secondary"
          onClick={handleRefetchBoard}
          style={{ marginTop: "1rem" }}
        >
          Try again
        </button>
      </div>
    );
  }

  const board = boardQuery.data;

  if (!board) {
    return null;
  }

  const lastUpdated = new Date(board.updatedAt).toLocaleString();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <Link to="/boards" className="button ghost">
          ← All boards
        </Link>
        {boardQuery.isFetching ? (
          <span className="helper-text">Refreshing…</span>
        ) : null}
      </div>

      <section className="card-surface" style={{ padding: "1.75rem" }}>
        <header style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ margin: 0 }}>{board.name}</h1>
            <p className="helper-text" style={{ marginTop: "0.35rem" }}>
              {board.description || "No description yet."}
            </p>
            <p className="helper-text" style={{ marginTop: "0.35rem" }}>
              Last updated {lastUpdated}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "flex-end"
            }}
          >
            <div>
              <div className="helper-text">Columns</div>
              <strong>{sortedColumns.length}</strong>
            </div>
            <div>
              <div className="helper-text">Cards</div>
              <strong>{totalCards}</strong>
            </div>
            <div>
              <div className="helper-text">Members</div>
              <strong>{board.members.length}</strong>
            </div>
            <button
              type="button"
              className="button secondary"
              onClick={handleRefetchBoard}
            >
              Refresh
            </button>
            {canManageBoard ? (
              <>
                <button
                  type="button"
                  className="button"
                  onClick={handleOpenBoardSettings}
                >
                  Edit board
                </button>
                <button
                  type="button"
                  className="button danger"
                  onClick={handleRequestDeleteBoard}
                  disabled={deleteBoardMutation.isPending}
                >
                  {deleteBoardMutation.isPending ? "Deleting…" : "Delete board"}
                </button>
              </>
            ) : null}
          </div>
        </header>
        {moveCardMutation.isError ? (
          <p className="error-text" style={{ marginTop: "1rem" }} role="alert">
            {moveCardMutation.error.message}
          </p>
        ) : null}
      </section>

      <section className="board-layout">
        <div className="card-surface" style={{ padding: "1.25rem" }}>
          <h3 style={{ marginTop: 0 }}>Team</h3>
          <ul className="team-list">
            {board.members.map((member) => (
              <li key={member.id} className="team-list__item">
                <span style={{ fontWeight: 600 }}>{member.displayName}</span>
                <span className="team-list__email">{member.email}</span>
              </li>
            ))}
          </ul>
          {canManageBoard ? (
            <form
              onSubmit={handleInviteSubmit}
              style={{
                marginTop: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem"
              }}
            >
              <label htmlFor="invite-email" style={{ fontWeight: 600 }}>
                Invite teammate
              </label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  id="invite-email"
                  type="email"
                  className="form-control"
                  placeholder="teammate@example.com"
                  value={inviteEmail}
                  onChange={(event) => setInviteEmail(event.target.value)}
                  disabled={addMemberMutation.isPending}
                  required
                />
                <button
                  type="submit"
                  className="button secondary"
                  disabled={
                    addMemberMutation.isPending || !inviteEmail.trim().length
                  }
                >
                  {addMemberMutation.isPending ? "Inviting…" : "Invite"}
                </button>
              </div>
              <p className="helper-text" style={{ margin: 0 }}>
                Use a teammate’s Workboard email address.
              </p>
              {addMemberMutation.isError ? (
                <p className="error-text" role="alert" style={{ margin: 0 }}>
                  {addMemberMutation.error.message}
                </p>
              ) : null}
            </form>
          ) : null}
        </div>
        <div className="card-surface" style={{ padding: "1.25rem" }}>
          <h3 style={{ marginTop: 0 }}>Labels</h3>
          {board.labels.length === 0 ? (
            <p className="helper-text">No labels defined.</p>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {board.labels.map((label) => (
                <span
                  key={label.id}
                  className="label-pill"
                  style={{
                    background: label.color,
                    color: "#fff",
                    fontWeight: 600
                  }}
                >
                  {label.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="board-columns">
        {sortedColumns.map((column) => {
          const draftValue = cardDrafts[column.id] ?? "";
          const createCardError =
            createCardMutation.isError && activeCardColumn === column.id
              ? createCardMutation.error.message
              : null;
          const isCreatePending =
            createCardMutation.isPending && activeCardColumn === column.id;
          const isRenamePending =
            updateColumnMutation.isPending &&
            updateColumnMutation.variables?.columnId === column.id;
          const columnError =
            updateColumnMutation.isError &&
            updateColumnMutation.variables?.columnId === column.id
              ? updateColumnMutation.error.message
              : null;

          return (
            <BoardColumnSection
              key={`${column.id}:${column.updatedAt}`}
              column={column}
              cardDraft={draftValue}
              onCardDraftChange={handleCardDraftChange}
              onCreateCard={handleCreateCardSubmit}
              createCardError={createCardError}
              isCreateCardPending={isCreatePending}
              onMoveCard={handleMoveCard}
              onCardSelect={handleCardSelect}
              canManageCards={canManageTasks}
              onRenameColumn={canManageTasks ? handleRenameColumn : undefined}
              onRequestDeleteColumn={
                canManageTasks ? handleRequestDeleteColumn : undefined
              }
              columnError={columnError}
              isColumnActionPending={isRenamePending}
            />
          );
        })}

        <div className="board-column">
          <div className="card-surface" style={{ padding: "1rem" }}>
            <strong className="board-column__title">New column</strong>
            <form
              onSubmit={handleCreateColumn}
              style={{
                marginTop: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem"
              }}
            >
              <input
                className="form-control"
                placeholder="Column name"
                value={newColumnTitle}
                onChange={(event) => setNewColumnTitle(event.target.value)}
              />
              {createColumnMutation.isError ? (
                <p className="error-text" style={{ margin: 0 }}>
                  {createColumnMutation.error.message}
                </p>
              ) : null}
              <button
                type="submit"
                className="button secondary"
                disabled={
                  !newColumnTitle.trim() || createColumnMutation.isPending
                }
              >
                {createColumnMutation.isPending ? "Creating…" : "Add column"}
              </button>
            </form>
          </div>
        </div>
      </section>
      {selectedCard ? (
        <CardDetailsDrawer
          key={selectedCard.id}
          card={selectedCard}
          members={board.members}
          isSaving={updateCardMutation.isPending}
          isDeleting={deleteCardMutation.isPending}
          canManage={canManageTasks}
          error={
            updateCardMutation.isError ? updateCardMutation.error.message : null
          }
          currentUserId={user?.id ?? null}
          commentActions={commentActionState}
          onClose={handleCloseCardDrawer}
          onSubmit={handleCardDetailsSubmit}
          onDelete={
            canManageTasks
              ? () => handleRequestDeleteCard(selectedCard)
              : undefined
          }
          onAddComment={handleAddComment}
          onUpdateComment={handleUpdateComment}
          onDeleteComment={handleDeleteComment}
        />
      ) : null}
      {canManageTasks && cardPendingDeletion ? (
        <ConfirmDialog
          title="Delete this card?"
          description={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem"
              }}
            >
              <p style={{ margin: 0 }}>
                This will permanently remove{" "}
                <strong>{cardPendingDeletion.title}</strong> and all of its
                activity.
              </p>
              {deleteCardMutation.isError ? (
                <p className="error-text" role="alert" style={{ margin: 0 }}>
                  {deleteCardMutation.error.message}
                </p>
              ) : null}
            </div>
          }
          confirmLabel="Delete card"
          isDanger
          isSubmitting={deleteCardMutation.isPending}
          onCancel={handleCancelDeleteCard}
          onConfirm={handleConfirmDeleteCard}
        />
      ) : null}
      {canManageTasks && columnPendingDeletion ? (
        <ConfirmDialog
          title="Delete this column?"
          description={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem"
              }}
            >
              <p style={{ margin: 0 }}>
                Removing <strong>{columnPendingDeletion.title}</strong> will
                also delete all cards inside it.
              </p>
              {deleteColumnMutation.isError ? (
                <p className="error-text" role="alert" style={{ margin: 0 }}>
                  {deleteColumnMutation.error.message}
                </p>
              ) : null}
            </div>
          }
          confirmLabel="Delete column"
          isDanger
          isSubmitting={deleteColumnMutation.isPending}
          onCancel={handleCancelDeleteColumn}
          onConfirm={handleConfirmDeleteColumn}
        />
      ) : null}
      {canManageBoard && isBoardSettingsOpen ? (
        <BoardSettingsDrawer
          board={board}
          isSaving={updateBoardMutation.isPending}
          isDeleting={deleteBoardMutation.isPending}
          error={
            updateBoardMutation.isError
              ? updateBoardMutation.error.message
              : null
          }
          onClose={handleCloseBoardSettings}
          onSubmit={handleBoardSettingsSubmit}
          onDelete={handleRequestDeleteBoard}
        />
      ) : null}
      {canManageBoard && isBoardDeleteDialogOpen ? (
        <ConfirmDialog
          title="Delete this board?"
          description={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem"
              }}
            >
              <p style={{ margin: 0 }}>
                <strong>{board.name}</strong> and all of its cards will be
                permanently removed. This action cannot be undone.
              </p>
              {deleteBoardMutation.isError ? (
                <p className="error-text" role="alert" style={{ margin: 0 }}>
                  {deleteBoardMutation.error.message}
                </p>
              ) : null}
            </div>
          }
          confirmLabel="Delete board"
          isDanger
          isSubmitting={deleteBoardMutation.isPending}
          onCancel={handleCancelDeleteBoard}
          onConfirm={handleConfirmDeleteBoard}
        />
      ) : null}
    </div>
  );
};

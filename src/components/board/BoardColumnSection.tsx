import { useState } from "react";
import { useDrop } from "react-dnd";
import type { FormEvent } from "react";
import type { BoardCard, BoardColumn } from "../../types/api";
import { BoardCardItem } from "./BoardCardItem";
import { CARD_DND_TYPE } from "./dnd";
import type { DraggedCard } from "./dnd";

interface BoardColumnSectionProps {
  column: BoardColumn;
  cardDraft: string;
  onCardDraftChange: (columnId: string, value: string) => void;
  onCreateCard: (columnId: string) => void;
  createCardError?: string | null;
  isCreateCardPending: boolean;
  onMoveCard: (
    item: DraggedCard,
    targetColumnId: string,
    targetIndex: number
  ) => void;
  onCardSelect?: (card: BoardCard) => void;
  canManageCards?: boolean;
  onRenameColumn?: (columnId: string, title: string) => void;
  onRequestDeleteColumn?: (column: BoardColumn) => void;
  columnError?: string | null;
  isColumnActionPending?: boolean;
}

export const BoardColumnSection = ({
  column,
  cardDraft,
  onCardDraftChange,
  onCreateCard,
  createCardError,
  isCreateCardPending,
  onMoveCard,
  onCardSelect,
  canManageCards = true,
  onRenameColumn,
  onRequestDeleteColumn,
  columnError,
  isColumnActionPending = false
}: BoardColumnSectionProps) => {
  const [{ isOver, canDrop }, dropRef] = useDrop<
    DraggedCard,
    void,
    { isOver: boolean; canDrop: boolean }
  >(
    () => ({
      accept: CARD_DND_TYPE,
      drop: (item, monitor) => {
        if (!monitor.didDrop()) {
          onMoveCard(item, column.id, column.cards.length);
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop()
      })
    }),
    [column, onMoveCard]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canManageCards) {
      return;
    }
    onCreateCard(column.id);
  };

  const setColumnDropRef = (node: HTMLDivElement | null) => {
    dropRef(node);
  };

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(() => column.title);

  const handleRenameSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!onRenameColumn || !canManageCards) {
      return;
    }
    const trimmed = titleDraft.trim();
    if (!trimmed || trimmed === column.title) {
      setIsEditingTitle(false);
      return;
    }
    onRenameColumn(column.id, trimmed);
    setIsEditingTitle(false);
  };

  const handleDeleteColumn = () => {
    if (!onRequestDeleteColumn || !canManageCards) {
      return;
    }
    onRequestDeleteColumn(column);
  };

  return (
    <div className="board-column">
      <div className="card-surface" style={{ padding: "1rem" }}>
        <div className="board-column__header">
          <div>
            <strong className="board-column__title">{column.title}</strong>
            <span className="badge">{column.cards.length} cards</span>
          </div>
          {canManageCards && (onRenameColumn || onRequestDeleteColumn) ? (
            <div className="board-column__actions">
              {isEditingTitle ? (
                <form
                  onSubmit={handleRenameSubmit}
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center"
                  }}
                >
                  <input
                    className="form-control"
                    style={{ minWidth: "9rem" }}
                    value={titleDraft}
                    onChange={(event) => setTitleDraft(event.target.value)}
                    disabled={isColumnActionPending}
                  />
                  <button
                    type="submit"
                    className="button secondary"
                    disabled={isColumnActionPending || !titleDraft.trim()}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="button ghost"
                    onClick={() => {
                      setIsEditingTitle(false);
                      setTitleDraft(column.title);
                    }}
                    disabled={isColumnActionPending}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {onRenameColumn ? (
                    <button
                      type="button"
                      className="button ghost"
                      onClick={() => setIsEditingTitle(true)}
                      disabled={isColumnActionPending}
                    >
                      Rename
                    </button>
                  ) : null}
                  {onRequestDeleteColumn ? (
                    <button
                      type="button"
                      className="button ghost"
                      onClick={handleDeleteColumn}
                      disabled={isColumnActionPending}
                    >
                      Delete
                    </button>
                  ) : null}
                </div>
              )}
            </div>
          ) : null}
        </div>
        {columnError ? (
          <p className="error-text" style={{ marginTop: "0.5rem" }}>
            {columnError}
          </p>
        ) : null}
        <div
          ref={setColumnDropRef}
          className="board-column__cards"
          style={{
            background:
              isOver && canDrop ? "rgba(37, 99, 235, 0.07)" : "transparent",
            borderRadius: "0.75rem"
          }}
        >
          {column.cards.length === 0 ? (
            <p
              className="helper-text"
              style={{ textAlign: "center", margin: 0 }}
            >
              Drop a card here or create one below
            </p>
          ) : (
            column.cards.map((card, index) => (
              <BoardCardItem
                key={card.id}
                card={card}
                columnId={column.id}
                index={index}
                onMove={onMoveCard}
                onSelect={onCardSelect}
              />
            ))
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem"
          }}
        >
          <input
            className="form-control"
            placeholder="Add card title"
            value={cardDraft}
            onChange={(event) =>
              onCardDraftChange(column.id, event.target.value)
            }
            disabled={!canManageCards}
          />
          {createCardError ? (
            <p className="error-text" style={{ margin: 0 }}>
              {createCardError}
            </p>
          ) : null}
          <button
            type="submit"
            className="button secondary"
            disabled={
              !canManageCards || !cardDraft.trim() || isCreateCardPending
            }
          >
            {isCreateCardPending ? "Adding…" : "Add card"}
          </button>
          {!canManageCards ? (
            <p className="helper-text" style={{ margin: 0 }}>
              Only board members can add cards.
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
};

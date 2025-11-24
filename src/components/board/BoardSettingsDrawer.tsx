import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import type { Board, UpdateBoardInput } from "../../types/api";

interface BoardSettingsDrawerProps {
  board: Board;
  isSaving: boolean;
  isDeleting: boolean;
  error?: string | null;
  onClose: () => void;
  onSubmit: (changes: Partial<UpdateBoardInput>) => void;
  onDelete: () => void;
}

export const BoardSettingsDrawer = ({
  board,
  isSaving,
  isDeleting,
  error,
  onClose,
  onSubmit,
  onDelete
}: BoardSettingsDrawerProps) => {
  const [name, setName] = useState(() => board.name);
  const [description, setDescription] = useState(() => board.description ?? "");

  const changes = useMemo(() => {
    const updates: Partial<UpdateBoardInput> = {};
    const normalizedName = name.trim();
    if (normalizedName && normalizedName !== board.name) {
      updates.name = normalizedName;
    }
    if ((description ?? "") !== (board.description ?? "")) {
      updates.description = description.trim() || undefined;
    }
    return updates;
  }, [board.description, board.name, description, name]);

  const hasChanges = Object.keys(changes).length > 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!hasChanges || isSaving || isDeleting) {
      return;
    }
    onSubmit(changes);
  };

  return (
    <div className="drawer-backdrop" role="presentation">
      <div
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="board-settings-title"
      >
        <header className="drawer__section-header" style={{ gap: "0.75rem" }}>
          <div>
            <h2 id="board-settings-title" style={{ margin: 0 }}>
              Board settings
            </h2>
            <p className="helper-text" style={{ marginTop: "0.35rem" }}>
              Update the board name or description, or delete it entirely.
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button type="button" className="button ghost" onClick={onClose}>
              Close
            </button>
            <button
              type="button"
              className="button danger"
              onClick={onDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting…" : "Delete"}
            </button>
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="drawer__section"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="board-name">Name</label>
            <input
              id="board-name"
              className="form-control"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="board-description">Description</label>
            <textarea
              id="board-description"
              className="form-control"
              rows={4}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Share context about this board"
            />
          </div>

          {error ? (
            <p className="error-text" role="alert" style={{ margin: 0 }}>
              {error}
            </p>
          ) : null}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "0.75rem"
            }}
          >
            <button type="button" className="button ghost" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="button"
              disabled={!hasChanges || isSaving || isDeleting}
            >
              {isSaving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

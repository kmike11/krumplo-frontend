import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import type {
  BoardCard,
  CardPriority,
  UpdateCardInput,
  User
} from "../../types/api";

interface CommentActionState {
  isAdding: boolean;
  addError?: string | null;
  isUpdating: boolean;
  updatingCommentId?: string | null;
  updateError?: string | null;
  isDeleting: boolean;
  deletingCommentId?: string | null;
  deleteError?: string | null;
}

interface CardDetailsDrawerProps {
  card: BoardCard;
  members: User[];
  isSaving: boolean;
  isDeleting: boolean;
  canManage: boolean;
  error?: string | null;
  currentUserId: string | null;
  commentActions: CommentActionState;
  onClose: () => void;
  onSubmit: (changes: Partial<UpdateCardInput>) => void;
  onDelete?: () => void;
  onAddComment: (content: string) => Promise<void>;
  onUpdateComment: (commentId: string, content: string) => Promise<void>;
  onDeleteComment: (commentId: string) => Promise<void>;
}

const priorityOptions: CardPriority[] = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];

export const CardDetailsDrawer = ({
  card,
  members,
  isSaving,
  isDeleting,
  canManage,
  error,
  currentUserId,
  commentActions,
  onClose,
  onSubmit,
  onDelete,
  onAddComment,
  onUpdateComment,
  onDeleteComment
}: CardDetailsDrawerProps) => {
  const [title, setTitle] = useState(() => card.title);
  const [description, setDescription] = useState(() => card.description ?? "");
  const [priority, setPriority] = useState<CardPriority>(() => card.priority);
  const [assigneeId, setAssigneeId] = useState<string>(
    () => card.assignee?.id ?? ""
  );
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");

  const sortedComments = useMemo(() => {
    return [...card.comments].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }, [card.comments]);

  const changes = useMemo(() => {
    const updates: Partial<UpdateCardInput> = {};
    const normalizedTitle = title.trim();
    if (normalizedTitle && normalizedTitle !== card.title) {
      updates.title = normalizedTitle;
    }

    if ((description ?? "") !== (card.description ?? "")) {
      updates.description = description;
    }

    if (priority !== card.priority) {
      updates.priority = priority;
    }

    const previousAssigneeId = card.assignee?.id ?? "";
    if (assigneeId !== previousAssigneeId) {
      updates.assigneeId = assigneeId || undefined;
    }

    return updates;
  }, [
    assigneeId,
    card.assignee?.id,
    card.description,
    card.priority,
    card.title,
    description,
    priority,
    title
  ]);

  const hasChanges = Object.keys(changes).length > 0;
  const isReadOnly = !canManage;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isReadOnly || !hasChanges) {
      return;
    }
    onSubmit(changes);
  };

  const handleCreateComment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canManage) {
      return;
    }
    const normalized = newComment.trim();
    if (!normalized) {
      return;
    }

    const submission = onAddComment(normalized)
      .then(() => {
        setNewComment("");
      })
      .catch(() => {
        // error surfaces via commentActions
      });

    void submission;
  };

  const handleStartEditingComment = (commentId: string, content: string) => {
    setEditingCommentId(commentId);
    setEditingContent(content);
  };

  const handleCancelCommentEdit = () => {
    setEditingCommentId(null);
    setEditingContent("");
  };

  const handleSaveCommentEdit = async (commentId: string) => {
    if (commentId !== editingCommentId) {
      return;
    }
    const normalized = editingContent.trim();
    if (!normalized) {
      return;
    }
    const existing = card.comments.find((comment) => comment.id === commentId);
    if (existing && existing.content.trim() === normalized) {
      handleCancelCommentEdit();
      return;
    }

    try {
      await onUpdateComment(commentId, normalized);
      handleCancelCommentEdit();
    } catch {
      // keep editor open so the user can retry
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await onDeleteComment(commentId);
      if (editingCommentId === commentId) {
        handleCancelCommentEdit();
      }
    } catch {
      // surfaced via commentActions
    }
  };

  return (
    <div className="drawer-backdrop" role="presentation">
      <div
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="card-detail-title"
      >
        <header className="drawer__section-header" style={{ gap: "0.75rem" }}>
          <div>
            <h2 id="card-detail-title" style={{ margin: 0 }}>
              Edit card
            </h2>
            <p className="helper-text" style={{ marginTop: "0.35rem" }}>
              Update the task description, priority, or assignee.
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button type="button" className="button ghost" onClick={onClose}>
              Close
            </button>
            {canManage && onDelete ? (
              <button
                type="button"
                className="button danger"
                onClick={onDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting…" : "Delete"}
              </button>
            ) : null}
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="drawer__section"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="card-title">Title</label>
            <input
              id="card-title"
              className="form-control"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              readOnly={isReadOnly}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="card-description">Description</label>
            <textarea
              id="card-description"
              className="form-control"
              rows={5}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Add more context for the team"
              readOnly={isReadOnly}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="card-priority">Priority</label>
            <select
              id="card-priority"
              className="form-control"
              value={priority}
              onChange={(event) =>
                setPriority(event.target.value as CardPriority)
              }
              disabled={isReadOnly}
            >
              {priorityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="card-assignee">Assignee</label>
            <select
              id="card-assignee"
              className="form-control"
              value={assigneeId}
              onChange={(event) => setAssigneeId(event.target.value)}
              disabled={isReadOnly}
            >
              <option value="">Unassigned</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.displayName}
                </option>
              ))}
            </select>
          </div>

          {isReadOnly ? (
            <p className="helper-text" style={{ margin: 0 }}>
              Only board members can update tasks.
            </p>
          ) : null}

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
              disabled={isReadOnly || !hasChanges || isSaving || isDeleting}
            >
              {isSaving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>

        <section
          className="drawer__section"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            borderTop: "1px solid #e2e8f0",
            marginTop: "1.5rem",
            paddingTop: "1.5rem"
          }}
        >
          <div>
            <h3 style={{ margin: 0 }}>Comments</h3>
            <p className="helper-text" style={{ marginTop: "0.35rem" }}>
              Keep everyone in sync with quick updates.
            </p>
          </div>

          {canManage ? (
            <form
              onSubmit={handleCreateComment}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem"
              }}
            >
              <textarea
                className="form-control"
                rows={3}
                placeholder="Add a comment"
                value={newComment}
                onChange={(event) => setNewComment(event.target.value)}
              />
              {commentActions.addError ? (
                <p className="error-text" role="alert" style={{ margin: 0 }}>
                  {commentActions.addError}
                </p>
              ) : null}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "0.5rem"
                }}
              >
                <button
                  type="submit"
                  className="button secondary"
                  disabled={
                    commentActions.isAdding || !newComment.trim().length
                  }
                >
                  {commentActions.isAdding ? "Posting…" : "Add comment"}
                </button>
              </div>
            </form>
          ) : (
            <p className="helper-text" style={{ margin: 0 }}>
              You need to be a board member to comment on this task.
            </p>
          )}

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {sortedComments.length === 0 ? (
              <p className="helper-text" style={{ margin: 0 }}>
                No comments yet.
              </p>
            ) : (
              sortedComments.map((comment) => {
                const isOwner = comment.author?.id === currentUserId;
                const isEditing = editingCommentId === comment.id;
                const isUpdatePending =
                  commentActions.isUpdating &&
                  commentActions.updatingCommentId === comment.id;
                const isDeletePending =
                  commentActions.isDeleting &&
                  commentActions.deletingCommentId === comment.id;
                const updateError =
                  commentActions.updateError &&
                  commentActions.updatingCommentId === comment.id
                    ? commentActions.updateError
                    : null;
                const deleteError =
                  commentActions.deleteError &&
                  commentActions.deletingCommentId === comment.id
                    ? commentActions.deleteError
                    : null;
                const timestamp = new Date(comment.createdAt).toLocaleString();
                const wasEdited = comment.updatedAt !== comment.createdAt;

                return (
                  <article
                    key={comment.id}
                    className="card-surface"
                    style={{
                      padding: "0.9rem",
                      borderRadius: "0.75rem",
                      border: "1px solid #e2e8f0"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "0.75rem",
                        alignItems: "flex-start"
                      }}
                    >
                      <div>
                        <strong>
                          {comment.author?.displayName ?? "Former member"}
                        </strong>
                        <div
                          className="helper-text"
                          style={{ marginTop: "0.25rem" }}
                        >
                          {timestamp}
                          {wasEdited ? " · edited" : ""}
                        </div>
                      </div>
                      {isOwner ? (
                        <div
                          style={{ display: "flex", gap: "0.5rem" }}
                          aria-label="Comment actions"
                        >
                          {isEditing ? null : (
                            <button
                              type="button"
                              className="button ghost"
                              onClick={() =>
                                handleStartEditingComment(
                                  comment.id,
                                  comment.content
                                )
                              }
                              disabled={isDeletePending || isUpdatePending}
                            >
                              Edit
                            </button>
                          )}
                          <button
                            type="button"
                            className="button ghost"
                            onClick={() => {
                              void handleDeleteComment(comment.id);
                            }}
                            disabled={isDeletePending || isUpdatePending}
                          >
                            {isDeletePending ? "Deleting…" : "Delete"}
                          </button>
                        </div>
                      ) : null}
                    </div>

                    {isEditing ? (
                      <div
                        style={{
                          marginTop: "0.75rem",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.5rem"
                        }}
                      >
                        <textarea
                          className="form-control"
                          rows={3}
                          value={editingContent}
                          onChange={(event) =>
                            setEditingContent(event.target.value)
                          }
                        />
                        {updateError ? (
                          <p
                            className="error-text"
                            role="alert"
                            style={{ margin: 0 }}
                          >
                            {updateError}
                          </p>
                        ) : null}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "0.5rem"
                          }}
                        >
                          <button
                            type="button"
                            className="button ghost"
                            onClick={handleCancelCommentEdit}
                            disabled={isUpdatePending}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="button"
                            onClick={() => {
                              void handleSaveCommentEdit(comment.id);
                            }}
                            disabled={
                              isUpdatePending ||
                              !editingContent.trim().length ||
                              editingContent.trim() === comment.content.trim()
                            }
                          >
                            {isUpdatePending ? "Saving…" : "Save"}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p
                        style={{
                          marginTop: "0.75rem",
                          whiteSpace: "pre-wrap"
                        }}
                      >
                        {comment.content}
                      </p>
                    )}

                    {deleteError ? (
                      <p
                        className="error-text"
                        role="alert"
                        style={{ margin: 0 }}
                      >
                        {deleteError}
                      </p>
                    ) : null}
                  </article>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

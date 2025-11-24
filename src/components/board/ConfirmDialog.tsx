import type { ReactNode } from "react";

interface ConfirmDialogProps {
  title: string;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  isDanger?: boolean;
  isSubmitting?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog = ({
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isDanger = false,
  isSubmitting = false,
  onConfirm,
  onCancel
}: ConfirmDialogProps) => {
  return (
    <div className="drawer-backdrop" role="presentation">
      <div
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
      >
        <header className="drawer__section-header">
          <h2 id="confirm-dialog-title" style={{ margin: 0 }}>
            {title}
          </h2>
        </header>
        <div
          className="drawer__section"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {description ? <div>{description}</div> : null}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "0.75rem"
            }}
          >
            <button type="button" className="button ghost" onClick={onCancel}>
              {cancelLabel}
            </button>
            <button
              type="button"
              className={`button ${isDanger ? "danger" : ""}`.trim()}
              onClick={onConfirm}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Working…" : confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

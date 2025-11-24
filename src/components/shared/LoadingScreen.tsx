export const LoadingScreen = () => {
  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
      <div
        className="card-surface"
        style={{
          padding: "1.25rem 1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem"
        }}
      >
        <span
          style={{
            width: "0.85rem",
            height: "0.85rem",
            borderRadius: "50%",
            border: "3px solid var(--accent-soft)",
            borderTopColor: "var(--accent)",
            animation: "spin 1s linear infinite"
          }}
        />
        <span style={{ fontWeight: 600 }}>Loading workspace…</span>
      </div>
      <style>
        {
          "@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }"
        }
      </style>
    </div>
  );
};

import type { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/boards" className="app-header__brand">
          <span className="app-header__brand-badge">WB</span>
          <span>Workboard Suite</span>
        </Link>
        <nav style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <Link
            to="/boards"
            className={
              location.pathname.startsWith("/boards") ? "link-button" : ""
            }
          >
            Boards
          </Link>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "right"
              }}
            >
              <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                {user?.displayName}
              </span>
              <span
                style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}
              >
                {user?.email}
              </span>
            </div>
            <button
              type="button"
              className="button ghost"
              onClick={handleLogout}
            >
              Sign out
            </button>
          </div>
        </nav>
      </header>
      <main className="app-main">{children}</main>
    </div>
  );
};

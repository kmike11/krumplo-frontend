import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes
} from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { LoadingScreen } from "../components/shared/LoadingScreen";
import { useAuth } from "../hooks/useAuth";
import { BoardDetailPage } from "../pages/BoardDetailPage";
import { BoardListPage } from "../pages/BoardListPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/boards" replace />} />
          <Route path="/boards" element={<BoardListPage />} />
          <Route path="/boards/:boardId" element={<BoardDetailPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/boards" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

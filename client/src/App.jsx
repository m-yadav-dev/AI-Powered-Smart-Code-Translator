import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { Suspense, lazy, useEffect } from "react";
import HistoryPage from "./features/History/HistoryPage";
import HistoryDetailPage from "./features/History/HistoryDetailPage";

const Home = lazy(() => import("./pages/HomePage"));
const SignUpPage = lazy(() => import("./features/Auth/SignUpPage"));
const LogInPage = lazy(() => import("./features/Auth/LoginPage"));

const LoadingScreen = ({ message }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-sm font-medium text-gray-700 animate-pulse">
          {message}
        </p>
      </div>
    </>
  );
};

const App = () => {
  const { authUser, isCheckingAuth, checkAuthStatus } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  if (isCheckingAuth) {
    return <LoadingScreen message="Loading page..." />;
  }

  return (
    <>
      <Suspense fallback={<LoadingScreen message="Loading page..." />}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" replace /> : <SignUpPage />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" replace /> : <LogInPage />}
          />
          <Route
            path="*"
            element={<Navigate to={authUser ? "/" : "/login"} replace />}
          />
          <Route
            path="/history"
            element={
              authUser ? <HistoryPage /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/history/:id"
            element={
              authUser ? <HistoryDetailPage /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;

import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

function PublicRoute() {
  const isWalletConnected = useSelector(
    (state) => state.accountDetails.isWalletConnected
  );

  // If connected, redirect to dashboard
  if (isWalletConnected) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;

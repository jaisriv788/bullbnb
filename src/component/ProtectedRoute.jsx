import { Navigate, Outlet, useLocation } from "react-router";
import { useSelector } from "react-redux";
import LogoSpinner from "./LogoSpinner";

function ProtectedRoute() {
  const isWalletConnected = useSelector(
    (state) => state.accountDetails.isWalletConnected
  );

  const location = useLocation();

  if (!isWalletConnected) {
    // Save the original location to redirect back after login (if needed)
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return (
    <div className="h-full">
      <LogoSpinner />
      <Outlet />
    </div>
  );
}

export default ProtectedRoute;

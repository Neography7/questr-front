
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

export function UserPrivate () {
  const isAuthenticated = useSelector((state: any) => state.auth.authenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export function GuestPrivate () {
  const isAuthenticated = useSelector((state: any) => state.auth.authenticated);
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
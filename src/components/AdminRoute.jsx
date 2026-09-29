import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FullPageLoader from './FullPageLoader';

/**
 * AdminRoute — শুধু admin role এর user access পাবে।
 * - Loading হলে spinner দেখাবে
 * - Login না থাকলে /login এ redirect
 * - Login আছে কিন্তু admin না হলে / (home) এ redirect
 */
export default function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <FullPageLoader message="Checking permissions..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

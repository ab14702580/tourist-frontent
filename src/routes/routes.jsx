import React, { useEffect } from 'react';
import { createBrowserRouter, Outlet, useLocation } from 'react-router-dom';

// Layout
import MainLayout from '../layouts/MainLayout';

// Pages
import HomePage from '../pages/HomePage';
import DestinationsPage from '../pages/DestinationsPage';
import DestinationDetailsPage from '../pages/DestinationDetailsPage';
import PackagesPage from '../pages/PackagesPage';
import PackageDetailsPage from '../pages/PackageDetailsPage';
import AboutPage from '../pages/AboutPage';
import BlogPage from '../pages/BlogPage';
import BlogDetailsPage from '../pages/BlogDetailsPage';
import ContactPage from '../pages/ContactPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage';
import BookingPage from '../pages/BookingPage';
import ProfilePage from '../pages/ProfilePage';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminRoute from '../components/AdminRoute';
import DashboardPage from '../pages/dashboard/dashboard';
import PaymentPage from '../pages/PaymentPage';

/**
 * RootLayout — wraps the entire app.
 * Handles scroll-to-top on every route change for ALL routes,
 * including standalone pages (Login, Register, Dashboard, Payment)
 * that don't go through MainLayout.
 */
function RootLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      // ── Standalone pages (no Navbar/Footer) ──────────────────────────────
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signin',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/signup',
        element: <RegisterPage />,
      },
      {
        path: '/dashboard',
        element: (
          <AdminRoute>
            <DashboardPage />
          </AdminRoute>
        ),
      },
      {
        path: '/payment/:ref',
        element: (
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        ),
      },

      // ── Main app pages (Navbar + Footer via MainLayout) ───────────────────
      {
        path: '/',
        element: <MainLayout />,
        errorElement: <NotFoundPage />,
        children: [
          { index: true,            element: <HomePage /> },
          { path: 'destinations',   element: <DestinationsPage /> },
          { path: 'destinations/:id', element: <DestinationDetailsPage /> },
          { path: 'packages',       element: <PackagesPage /> },
          { path: 'packages/:id',   element: <PackageDetailsPage /> },
          {
            path: 'booking/:id',
            element: <ProtectedRoute><BookingPage /></ProtectedRoute>,
          },
          {
            path: 'profile',
            element: <ProtectedRoute><ProfilePage /></ProtectedRoute>,
          },
          { path: 'about',          element: <AboutPage /> },
          { path: 'blog',           element: <BlogPage /> },
          { path: 'blog/:id',       element: <BlogDetailsPage /> },
          { path: 'contact',        element: <ContactPage /> },
          { path: '*',              element: <NotFoundPage /> },
        ],
      },

      // ── Catch-all 404 ─────────────────────────────────────────────────────
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;

import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loader from './common/Loader/index';
import { useAuth } from './context/AuthContext';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));
// Dashboard
const ECommerce = lazy(() => import('./pages/Dashboard/ECommerce'));

// Table
const Tables = lazy(() => import('./pages/Tables'));

const PublicRoute = lazy(() => import('./components/Auth/PublicRoute'));
const ProtectedRoute = lazy(() => import('./components/Auth/ProtectedRoute'));

// Auth
const SignIn = lazy(() => import('./pages/Authentication/SignIn'));
const SignUp = lazy(() => import('./pages/Authentication/SignUp'));

// 404
const NotFound = lazy(() => import('./pages/NotFound'));

const appData = window.APP_DATA || {};
function App() {
  const { isAuthenticated, setIsAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }
  return (
    <BrowserRouter
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    >
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <DefaultLayout>
                  <ECommerce />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <DefaultLayout>
                  <Tables name="Products" />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/api/invalid-access"
            element={
              <PublicRoute isAuthenticated={isAuthenticated}>
                <SignIn />
              </PublicRoute>
            }
          />
          <Route
            path="/sign-in"
            element={
              <PublicRoute isAuthenticated={isAuthenticated}>
                <SignIn />
              </PublicRoute>
            }
          />
          <Route
            path="/sign-up"
            element={
              <PublicRoute isAuthenticated={isAuthenticated}>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

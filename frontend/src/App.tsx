// ./App.tsx

import React from "react";
import { createBrowserRouter, RouterProvider, RouteObject, Navigate, Outlet } from "react-router-dom";
import withErrorBoundary from "./hoc/withErrorBoundary";
import LoginContainer from "./containers/LoginContainer";
import DashboardContainer from "./containers/DashboardContainer";
import PrivateRoute from "./PrivateRoute";
import { isAuthenticated } from "./auth";
import BookContextProvider from "./contexts/BookContext";
// import AddBookContainer from "./containers/AddBookContainer";
import AddBook from "./components/AddBook";
import UserListContainer from "./containers/UserListContainer";
import PassChangeContainer from "./containers/PassChangeContainer";
import ToastProvider from "./contexts/ToastContext";
import { ErrorBoundary } from "react-error-boundary";
import { RenderError } from "./components/errors/ErrorBoundaryComponent";

const ErrorBoundaryLoginContainer = withErrorBoundary(LoginContainer);

const App: React.FC = () => {
  const routes: RouteObject[] = [
    {
      path: "login",
      element: <ErrorBoundaryLoginContainer />
    },
    {
      path: "dashboard",
      element: (
        <PrivateRoute>
          <Outlet />
        </PrivateRoute>
      ),
      children: [
        {
          path: "",
          element: <DashboardContainer />
        },
        {
          path: "book",
          element: <AddBook />
        },
        {
          path: "user",
          element: <UserListContainer />
        },
        {
          path: "pass",
          element: <PassChangeContainer />
        }
      ]
    },
    {
      path: "/",
      element: isAuthenticated() ? <Navigate to='/dashboard' /> : <Navigate to='/login' />
    }
  ];

  const router = createBrowserRouter(routes);

  return (
    <div className='App'>
      <ErrorBoundary
        FallbackComponent={RenderError}
        onError={() => console.log("Some error caught!!")}
      >
        <BookContextProvider>
          <ToastProvider>
            <RouterProvider router={router} />
          </ToastProvider>
        </BookContextProvider>
      </ErrorBoundary>
    </div>
  );
};

export default withErrorBoundary(App);

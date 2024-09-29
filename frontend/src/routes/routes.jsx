import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import ErrorPage from "../pages/ErrorPage";
import MainLayout from "../layouts/MainLayout";
import WelcomePage from "../pages/WelcomePage"
import SignUpLayout from "../layouts/SignUpLayout";
import SignUpPage from "../pages/SignUpPage"
import SignUpDetailsPage from "../pages/SignUpDetailsPage"
import LoginPage from "../pages/LoginPage"
import AllActivitysPage from "../pages/Profile/AllActivitysPage";
import AnalyticsPage from '../pages/Profile/AnalyticsPage'
import ResourcePage from '../pages/Profile/ResourcesPage'

const Home = lazy(() => import("../pages/Home"));
const Jobs = lazy(() => import("../pages/Jobs"));
const Messaging = lazy(() => import("../pages/Messaging/Messaging"));
const Networks = lazy(() => import("../pages/Networks/NetworksPage"));
const Notifications = lazy(() => import("../pages/Notifications/NotificationsPage"));
const Profile = lazy(() => import("../pages/Profile/Profile"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Navigate to="/feed" replace />,
        // The replace prop ensures that the redirect does not leave a history entry,
        //which means users won’t navigate back to the root path using the browser's back button.
      },
      
      {
        path: "profile/allActivity",
        element: (
          <Suspense fallback={<h1>loading... </h1>}>
            <AllActivitysPage />
          </Suspense>
        ),
      },
      {
        path: "feed",
        element: (
          <Suspense fallback={<h1>loading... </h1>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "networks",
        element: (
          <Suspense fallback={<h1>loading... </h1>}>
            <Networks />
          </Suspense>
        ),
      },
      {
        path: "jobs",
        element: (
          <Suspense fallback={<h1>loading... </h1>}>
            <Jobs />
          </Suspense>
        ),
      },
      {
        path: "messaging",
        element: (
          <Suspense fallback={<h1>loading... </h1>}>
            <Messaging />
          </Suspense>
        ),
      },
      {
        path: "notifications",
        element: (
          <Suspense fallback={<h1>loading... </h1>}>
            <Notifications />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<h1>loading... </h1>}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<h1>loading... </h1>}>
            <AnalyticsPage />
          </Suspense>
        ),
      },
      {
        path: "resources",
        element: (
          <Suspense fallback={<h1>loading... </h1>}>
            <ResourcePage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/home",
    element: (
      <Suspense fallback={<h1>loading... </h1>}>
        <WelcomePage />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      // <AuthProtectedRoute>
      <Suspense fallback={<h1>loading... </h1>}>
        <SignUpLayout />
      </Suspense>
      // </AuthProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<h1>loading... </h1>}>
            <SignUpPage />
          </Suspense>
        ),
      },
      {
        path: "SignUpDetailsPage",
        element: (
          <Suspense fallback={<h1>loading... </h1>}>
            <SignUpDetailsPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<h1>loading... </h1>}>
        <LoginPage />
      </Suspense>
    ),
  },
]);

export default routes;

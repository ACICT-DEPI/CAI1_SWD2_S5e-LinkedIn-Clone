import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navigate } from "react-router-dom";
import App from "../App";
import { lazy, Suspense } from "react";
import ErrorPage from "../pages/ErrorPage";
import AllActivitys from "../components/AllActivitys";
const Home = lazy(() => import("../pages/Home"));
const Jobs = lazy(() => import("../pages/Jobs"));
const Messaging = lazy(() => import("../pages/Messaging"));
const Networks = lazy(() => import("../pages/Networks"));
const Notifications = lazy(() => import("../pages/Notifications"));
const User = lazy(() => import("../pages/User"));
const Profile = lazy(() => import("../pages/Profile"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Navigate to="/feed" replace />,
        // The replace prop ensures that the redirect does not leave a history entry,
        //which means users won’t navigate back to the root path using the browser's back button.
      },
      {
        path: "home",
        element: <Navigate to="/feed" replace />,
      },
      {
        path: "user",
        element: (
          // <UserProtectedRoute>
          <Suspense fallback={<h1>loading... </h1>}>
            <User />
          </Suspense>
          // </UserProtectedRoute>
        ),
      },
      {
        path: "user/allActivity",
        element: (
          <Suspense fallback={<h1>loading... </h1>}>
            <AllActivitys />
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
    ],
  },
  // {
  //   path: "/auth",
  //   element: (
  //     // <AuthProtectedRoute>
  //       <Layout />
  //     // </AuthProtectedRoute>
  //   ),
  //   children: [
  //     {
  //       path: "",
  //       element: (
  //         <Suspense fallback={<h1>loading... </h1>}>
  //           <Signin />
  //         </Suspense>
  //       ),
  //     },
  //     {
  //       path: "signup",
  //       element: (
  //         <Suspense fallback={<h1>loading... </h1>}>
  //           <Signup />
  //         </Suspense>
  //       ),
  //     },
  //   ],
  // },
]);

export default routes;

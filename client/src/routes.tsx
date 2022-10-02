import { Navigate } from "react-router-dom";
import AuthLayout from "./Layouts/Auth";
import Dashboard from "./Layouts/Dashboard";
import CreateGroup from "./pages/Groups/create";
import DetailGroup from "./pages/Groups/Detail";
import EditGroup from "./pages/Groups/edit";
import ListGroup from "./pages/Groups/List";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

const routes = [
  {
    path: "/",
    element: <Home />,
    key: "HOME",
  },
  {
    isGroup: true,
    element: <AuthLayout />,
    key: "AuthRoute",
    children: [
      {
        path: "/login",
        element: <Login />,
        key: "Login",
        index: false,
      },
      {
        path: "/register",
        element: <Register />,
        key: "Register",
        index: false,
      },
    ],
  },
  {
    path: "/profile",
    element: <Profile />,
    key: "Profile",
  },
  {
    key: "Tasks",
    isGroup: true,
    element: <Dashboard />,
    children: [
      {
        path: "/tasks",
        key: "TaskGroups",
        element: <ListGroup />,
        index: true,
      },
      {
        path: "/tasks/new",
        key: "NewTaskGroup",
        element: <CreateGroup />,
        index: false,
      },
      {
        path: "/tasks/:id",
        key: "DetailTaskGroups",
        element: <DetailGroup />,
        index: false,
      },
      {
        path: "/tasks/:id/edit",
        key: "EditTaskGroups",
        element: <EditGroup />,
        index: false,
      },
    ],
  },
  {
    path: "/404",
    element: <NotFound />,
    key: "NotFound",
  },
  {
    path: "/*",
    element: <Navigate to="/404" />,
    key: "AnyRoute",
  },
];

export default routes;

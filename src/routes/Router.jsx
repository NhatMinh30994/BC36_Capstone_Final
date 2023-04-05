import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import NoAuthGuard from "../guards/NoAuthGuard";
import HomeLayout from "../layouts/home/HomeLayout";
import CreateProject from "../pages/create-project/CreateProject";
import EditProject from "../pages/edit-project/EditProject";
import Login from "../pages/login/Login";
import ProjectDetail from "../pages/project-detail/ProjectDetail";
import ProjectManagement from "../pages/project-management/ProjectManagement";
import UserManagament from "../pages/user-management/UserManagament";
import EditUser from "../pages/edit-user/EditUser";
import Register from "../pages/register/Register";

export default function Router() {
  const routing = useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: <Navigate to="/project-management" />,
        },
        {
          path: "/project-management",
          element: <ProjectManagement />,
        },
        {
          path: "/project-detail/:id",
          element: <ProjectDetail />,
        },
        {
          path: "/create-project",
          element: <CreateProject />,
        },
        {
          path: "/edit-project/:id",
          element: <EditProject />,
        },
        {
          path: "/user-management",
          element: <UserManagament />,
        },
        {
          path: "/edit-user/:userId",
          element: <EditUser />,
        },
      ],
    },
    {
      path: "/",
      element: <NoAuthGuard/>,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
    
  ]);
  return routing;
}

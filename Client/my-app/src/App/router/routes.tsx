import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import ActivityDashboard from "../../features/dashboard/ActivityDashboard";
import ActivityDetails from "../../features/details/ActivityDetails";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import TestErrors from "../../features/errors/TestError";
import ActivityForm from "../../features/forms/ActivityForm";
import ProfilePage from "../../features/profiles/ProfilePage";
import LoginForm from "../../features/users/LoginForm";
import App from "../layout/App";


export const routes: RouteObject[] = [
    {
    path:'/',
    element : <App/>,
    children:[
        {path:'activities', element: <ActivityDashboard/>},
        {path:'activities/:id', element: <ActivityDetails/>},
        {path:'createActivity', element: <ActivityForm key = 'create'/>},
        {path:'manage/:id', element: <ActivityForm  key = 'manage' />},
        {path:'profiles/:username', element: <ProfilePage />},
        {path:'errors', element: <TestErrors />},
        {path:'login', element: <LoginForm />},
        {path:'not-found', element: <NotFound />},
        {path:'server-error', element: <ServerError />},
        {path:'*', element: <Navigate  replace to ='/not-found'/>},

    ]
    }

]

export const router = createBrowserRouter(routes) 
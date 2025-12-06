import { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './layout/RootLayout.jsx';
import Home from './components/Home/Home.jsx';
import AllJobs from './components/AllJobs/AllJobs.jsx';
import AddAJobs from './components/AddAJobs/AddAJobs.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import JobDetails from './components/JobDetails/JobDetails.jsx';
import MyAcceptedTasks from './components/MyAcceptedTask/MyAcceptedTask.jsx';
import ErrorPage from './components/ErrorPage/ErrorPage.jsx';
import PrivateRoute from './Routs/PrivateRoute.jsx';
import MyAddedJobs from './components/MyAddedJobs/MyAddedJobs.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index:true,
        Component: Home
      },
      {
        path:'/allJobs',
        element: (
          <PrivateRoute>
            <AllJobs></AllJobs>
          </PrivateRoute>
        ),
      },
      // {
      //   path:'addAJobs',
      //   Component: <PrivateRoute><AddAJobs></AddAJobs></PrivateRoute>
      // },
       {
        path: "/addAJobs",
        element: (
          <PrivateRoute>
            <AddAJobs></AddAJobs>
          </PrivateRoute>
        ),
      },
      {
        path:"/MyAddedJobs",
        element:(
          <PrivateRoute>
            <MyAddedJobs></MyAddedJobs>
          </PrivateRoute>
        )
      },
      {
        path:'/Register',
        Component: Register
      },
      {
        path:'/Login',
        Component: Login
      },
      {
        path:'/job/:id',
        element: (
          <PrivateRoute>
            <JobDetails></JobDetails>
          </PrivateRoute>
        ),
      },
      {
        path:'/my-accepted-tasks',
        element: (
          <PrivateRoute>
            <MyAcceptedTasks></MyAcceptedTasks>
          </PrivateRoute>
        ),
      },
      {
     path:"/*",
     Component: ErrorPage
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)

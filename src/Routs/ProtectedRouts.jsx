import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./components/Home/Home.jsx";
import AllJobs from "./components/AllJobs/AllJobs.jsx";
import AddAJob from "./components/AddJob/AddJob.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/allJobs",
        element: (
          <PrivateRoute>
            <AllJobs />
          </PrivateRoute>
        ),
      },
      {
        path: "/addAJobs",
        element: (
          <PrivateRoute>
            <AddAJob />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

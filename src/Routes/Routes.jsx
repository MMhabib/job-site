import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Components/Home";
import Login from "../Components/Login";
import Signup from "../Components/Signup";



import Createjob from "../Jobs/Createjob";
import PrivateRoute from "./Privateroute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },

      // 🔒 Private Route Wrapper for Job Operations
      // {
      //   path: "/",
      //   element: <PrivateRoute />,
      //   children: [
      //     { path: "/createjob", element: <Createjob /> },
      //     // { path: "/editjob/:id", element: <EditJob /> },
      //     // { path: "/jobdetails/:id", element: <JobDetails /> },
      //   ],
      // },
    ],
  },
]);

export default router;

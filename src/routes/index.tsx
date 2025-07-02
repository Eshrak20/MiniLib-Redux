import App from "@/App";
import Home from "@/pages/Home/Home";
import User from "@/pages/User";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index:true,
        element: <Home />,
      },
      {
        path: "books",
        element: <Home />,
      },
      {
        path: "users",
        element: <User />,
      },
    ],
  },
]);
export default router;

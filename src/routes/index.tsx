import App from "@/App";
import SingleBook from "@/pages/Home/Books/SingleBook";
import BorrowSummary from "@/pages/Home/BorrowSummary/BorrowSummary";
import Home from "@/pages/Home/Home";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "books",
        element: <Home />,
      },
      {
        path: "single-book/:id",
        element: <SingleBook />,
      },
      {
        path: "borrowed-books",
        element: <BorrowSummary />,
      },
    ],
  },
]);
export default router;

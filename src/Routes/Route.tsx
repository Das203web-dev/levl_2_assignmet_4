import { createBrowserRouter } from "react-router";
import App from "../App";
import AllBooks from "../Pages/AllBooks/AllBooks";
import AddBook from "../Pages/AddBook/AddBook";
import BorrowSummary from "../Pages/BorrowSummary/BorrowSummary";
import BookDetails from "@/components/AllBooksComponents/BookDetails";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                index: true,
                element: <AllBooks></AllBooks>
            },
            {
                path: "books",
                element: <AllBooks></AllBooks>
            },
            {
                path: 'books/:id',
                element: <BookDetails></BookDetails>
            },
            {
                path: "create-book",
                element: <AddBook></AddBook>
            },
            {
                path: "borrowSummary",
                element: <BorrowSummary></BorrowSummary>
            }
        ]
    }
]);
export default routes;
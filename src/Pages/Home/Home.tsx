import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { Button } from "@/components/ui/button";
import { useGetBooksQuery } from "@/redux/Api/baseApi";
import type { IIdForBook } from "@/type/type";
import { FaBookOpen } from "react-icons/fa";
import { Link } from "react-router";

const Home = () => {
    const { data, isLoading } = useGetBooksQuery(undefined)
    if (isLoading) {
        return <LoadingComponent></LoadingComponent>
    }
    return (
        <div className="space-y-5">
            <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
                {/* Hero Section */}
                <div className="text-center space-y-6 max-w-2xl">
                    <h1 className="text-5xl font-extrabold leading-tight">
                        Welcome to the Library
                    </h1>
                    <p className="text-lg text-white/70">
                        Explore, borrow, and manage books with ease. A minimal library management system built for simplicity and speed.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                        <Link to="/books">
                            <Button className="bg-white cursor-pointer text-black hover:bg-gray-200 font-semibold px-6 py-2 rounded-full">
                                View All Books
                            </Button>
                        </Link>
                        <Link to="/borrow-summary">
                            <Button variant="outline" className="border-white text-white bg-transparent cursor-pointer font-semibold px-6 py-2 rounded-full">
                                Borrow Summary
                            </Button>
                        </Link>
                    </div>
                </div>


            </div>
            <h1 className="text-2xl text-center">Explore Books</h1>
            <div className="grid px-5 xl:p-0 md:grid-cols-2 grid-cols-1 xl:grid-cols-3 mx-auto max-w-7xl gap-5">
                {
                    data?.data.map((book: IIdForBook) => <Link to={`/books/${book._id}`} key={book._id} className="bg-white text-black p-6 rounded-2xl shadow max-w-md w-full border border-black/10">
                        <div className="flex items-center gap-3 mb-4">
                            <FaBookOpen className="text-3xl" />
                            <h2 className="text-xl font-bold">{book.title}</h2>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                            <span className="font-semibold">Author:</span> {book.author}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                            <span className="font-semibold">Genre:</span> {book.genre.replace("_", " ")}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                            <span className="font-semibold">ISBN:</span> {book.isbn}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                            <span className="font-semibold">Copies:</span> {book.copies} ({book.available ? "Available" : "Not Available"})
                        </p>
                        <p className="text-sm text-gray-600 mt-4">{book.description}</p>
                    </Link>)
                }</div>
        </div>
    );
};

export default Home;

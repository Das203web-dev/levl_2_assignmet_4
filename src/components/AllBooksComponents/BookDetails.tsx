import { useGetSingleBookQuery } from "@/redux/Api/baseApi";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useParams } from "react-router";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import bookBg from "../../assets/singleBook.jpg";

const BookDetails = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useGetSingleBookQuery(id ?? "");

    if (isLoading) return <LoadingComponent />;

    if (isError) {
        return (
            <div className="flex justify-center items-center h-screen bg-red-50">
                <h1 className="text-red-600 text-xl font-semibold">
                    Something went wrong. Please try again.
                </h1>
            </div>
        );
    }

    const book = data?.data;

    return (
        <div
            style={{ backgroundImage: `url(${bookBg})` }}
            className="min-h-screen bg-center bg-cover bg-no-repeat flex items-center justify-center p-4"
        >
            <div className="max-w-3xl w-full bg-black/50 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-white/10">
                <div className="p-8 sm:p-12 space-y-6">
                    <div className="text-center">
                        <h1 className="text-4xl font-semibold mb-2 tracking-wide">{book.title}</h1>
                        <p className="italic text-lg opacity-80">by {book.author}</p>
                    </div>

                    <p className="text-sm sm:text-base leading-relaxed text-justify border-t border-b border-white/10 py-4">
                        {book.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base">
                        <div>
                            <span className="block font-semibold opacity-70 uppercase">Genre</span>
                            <p className="text-white">{book.genre}</p>
                        </div>
                        <div>
                            <span className="block font-semibold opacity-70 uppercase">ISBN</span>
                            <p className="text-white">{book.isbn}</p>
                        </div>
                        <div>
                            <span className="block font-semibold opacity-70 uppercase">Copies</span>
                            <p className="text-white">{book.copies}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="block font-semibold opacity-70 uppercase">Available</span>
                            {book.available ? (
                                <FaCheckCircle className="text-green-500 w-5 h-5" />
                            ) : (
                                <FaTimesCircle className="text-red-500 w-5 h-5" />
                            )}
                        </div>
                    </div>

                    <div className="text-sm text-gray-300 flex justify-between border-t border-white/10 pt-4">
                        <span>Created: {new Date(book.createdAt).toLocaleDateString()}</span>
                        <span>Updated: {new Date(book.updatedAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;

import { useGetSingleBookQuery } from "@/redux/Api/baseApi";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useParams } from "react-router";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import bookBg from "../../assets/singleBook.jpg"

const BookDetails = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useGetSingleBookQuery(id ?? "");

    if (isLoading) {
        return <LoadingComponent />;
    }
    if (isError) {
        return (
            <div className="flex justify-center items-center h-screen bg-red-50">
                <h1 className="text-red-600 text-xl font-semibold">
                    Something went wrong. Please try again.
                </h1>
            </div>
        );
    }

    return (
        <div style={{ backgroundImage: `url(${bookBg})` }} className="h-full bg-center bg-cover bg-no-repeat py-12 px-4">
            <div className="max-w-3xl mx-auto bg-blue-900/5 backdrop-blur-md rounded border border-gray-300">
                <div className="p-8 sm:p-12 text-white">
                    {/* Title */}
                    <h1 className="text-4xl font-light text-white mb-3">
                        {data.data.title}
                    </h1>

                    {/* Author */}
                    <p className="text-base italic mb-8 tracking-wide">
                        by {data.data.author}
                    </p>

                    {/* Description */}
                    <p className=" leading-relaxed mb-8 text-justify">
                        {data.data.description}
                    </p>

                    {/* Details grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 font-light">
                        <h3 className="uppercase flex items-center tracking-widest text-sm mb-1">
                            Genre : <span className="text-lg ml-1">{data.data.genre}</span>
                        </h3>

                        <h3 className="uppercase flex items-center tracking-widest text-sm mb-1">
                            ISBN : <span className="text-lg ml-1">{data.data.isbn}</span>
                        </h3>

                        <h3 className="uppercase tracking-widest text-sm mb-1">
                            Copies : <span className="text-lg ml-1">{data.data.copies}</span>
                        </h3>

                        <div className="flex items-center space-x-3">
                            <h3 className="uppercase tracking-widest text-sm">
                                Available
                            </h3>
                            {data.data.available ? (
                                <FaCheckCircle className="text-green-600 w-6 h-6" />
                            ) : (
                                <FaTimesCircle className="text-red-600 w-6 h-6" />
                            )}
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="mt-10 flex justify-between text-sm border-t border-gray-200 pt-6">
                        <p>Created: {new Date(data.data.createdAt).toLocaleDateString()}</p>
                        <p>Updated: {new Date(data.data.updatedAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;

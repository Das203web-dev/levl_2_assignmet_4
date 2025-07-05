import { useGetBooksQuery } from "@/redux/Api/baseApi";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type { IIdForBook } from "@/type/type";
import EditBook from "@/components/AllBooksComponents/EditBook";
import { DeleteBook } from "@/components/AllBooksComponents/DeleteBook";
import { BorrowBook } from "@/components/AllBooksComponents/BorrowBook";
import { FaRegEye } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import bgImg from "../../assets/singleBook.jpg"
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";




const AllBooks = () => {
    const { data, isLoading, isError } = useGetBooksQuery(undefined);
    if (isLoading) {
        return <LoadingComponent></LoadingComponent>
    }
    if (isError) {
        throw new Error("Something went wrong")
    }

    return (
        <div>
            <section style={{ backgroundImage: `url(${bgImg})` }} className="bg-cover bg-center bg-no-repeat text-white py-16 px-8 mb-12 relative overflow-hidden">
                <div className="absolute top-6 left-6 w-20 h-20 border-2 border-white rounded-full opacity-20 -z-10"></div>
                <div className="absolute bottom-8 right-10 w-28 h-28 border-4 border-white rounded-full opacity-10 -z-10"></div>

                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
                        Discover Your Next Favorite Book
                    </h1>
                    <p className="text-lg max-w-3xl mx-auto opacity-80 leading-relaxed">
                        Browse our curated collection with a sleek black & white vibe — find the perfect read for any mood.
                    </p>
                </div>
            </section>
            <section className="max-w-7xl p-5 overflow-hidden space-y-5 mx-auto">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl">All books</h1>
                    <Link to={'/create-book'}><Button className="bg-black cursor-pointer text-white">Add Book</Button></Link>
                </div>
                <Table className="border-[0.5px] border-black/10">
                    <TableHeader>
                        <TableRow className="uppercase text-lg font-medium text-center">
                            <TableHead className="text-center w-[100px] border-r-[0.5px]">Title</TableHead>
                            <TableHead className="text-center border-r-[0.5px]">Author</TableHead>
                            <TableHead className="text-center border-r-[0.5px]">Genre</TableHead>
                            <TableHead className=" text-center border-r-[0.5px]">ISBN</TableHead>
                            <TableHead className=" text-center border-r-[0.5px]">Copies</TableHead>
                            <TableHead className=" text-center border-r-[0.5px]">Available</TableHead>
                            <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data?.data.map((book: IIdForBook) => <TableRow key={book._id}>
                                <TableCell className="font-medium border-r-[0.5px]">{book.title}</TableCell>
                                <TableCell className="text-center border-r-[0.5px]">{book.author}</TableCell>
                                <TableCell className="text-center border-r-[0.5px]">{book.genre}</TableCell>
                                <TableCell className="text-center border-r-[0.5px]">{book.isbn}</TableCell>
                                <TableCell className="text-center border-r-[0.5px]">{book.copies}</TableCell>
                                <TableCell className="text-center border-r-[0.5px]">{book.copies ? "Available" : "Not Available"}</TableCell>
                                <TableCell className="flex justify-center gap-2 xl:gap-5 text-md">

                                    <Link to={`/books/${book._id}`}><Button variant="outline"><FaRegEye></FaRegEye></Button></Link>

                                    <EditBook book={book}></EditBook>

                                    <DeleteBook id={book._id}></DeleteBook>
                                    <BorrowBook book={book}></BorrowBook>
                                </TableCell>
                            </TableRow>)
                        }
                    </TableBody>
                </Table>

            </section>
        </div>
    );
};

export default AllBooks;
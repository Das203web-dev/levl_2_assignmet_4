import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useBorrowSummaryQuery } from "@/redux/Api/baseApi";
import type { IBorrowBookOutput } from "@/type/type";


const BorrowSummary = () => {
    const { data, isLoading } = useBorrowSummaryQuery(undefined);
    if (isLoading) {
        return <LoadingComponent></LoadingComponent>
    }
    return (
        <div className="min-h-screen max-w-7xl px-5 xl:px-0 overflow-hidden mx-auto">
            <h1 className="text-2xl mb-5">Borrow summary</h1>
            <Table className="border-[0.5px] border-black/10">
                <TableHeader>
                    <TableRow className="uppercase text-lg font-medium text-center">
                        <TableHead className="text-center w-[100px] border-r-[0.5px]">Book Title</TableHead>
                        <TableHead className="text-center border-r-[0.5px]">ISBN</TableHead>
                        <TableHead className="text-center border-r-[0.5px]">Total quantity</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data?.data.map((book: IBorrowBookOutput) => <TableRow key={book.book.isbn}>
                            <TableCell className="font-medium border-r-[0.5px]">{book.book.title}</TableCell>
                            <TableCell className="text-center border-r-[0.5px]">{book.book.isbn}</TableCell>
                            <TableCell className="text-center border-r-[0.5px]">{book.totalQuantity}</TableCell>

                        </TableRow>)
                    }
                </TableBody>
            </Table>

        </div>
    );
};

export default BorrowSummary;
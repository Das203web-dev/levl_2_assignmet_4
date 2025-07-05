import AddBookComponent from "@/components/AddBookComponent/AddBookComponent";

const AddBook = () => {
    return (
        <div className="min-h-screen max-w-7xl px-5 xl:px-0 mx-auto">
            <h1 className="text-2xl capitalize mb-5 mx-auto w-fit">Add books</h1>
            <AddBookComponent></AddBookComponent>
        </div>
    );
};

export default AddBook;
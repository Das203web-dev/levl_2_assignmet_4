import { useForm, type SubmitHandler } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import type { IBooks } from "@/type/type";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { useCreateBookMutation } from "@/redux/Api/baseApi";
import { swalFire } from "@/sweetAlert/sweetAlert";
import { useNavigate } from "react-router";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

const AddBookComponent = () => {
    const form = useForm<IBooks>();
    const navigate = useNavigate();
    const [createBook, { isLoading }] = useCreateBookMutation();

    const { setError } = form;

    if (isLoading) {
        return <LoadingComponent />;
    }

    const handleFormSubmit: SubmitHandler<IBooks> = async (data) => {
        try {
            const bookData: IBooks = {
                ...data,
                available: true,
                copies: Number(data.copies),
            };

            const result = await createBook(bookData).unwrap();
            if (result.success) {
                swalFire({
                    title: result?.data?.title,
                    text: result.message,
                    icon: "success",
                });
                navigate("/books");
            }
        } catch (error: any) {
            if (error?.data?.error?.errors?.title) {
                setError("title", {
                    type: "server",
                    message: error?.data?.error?.errors?.title.message,
                });
            } else if (error?.data?.error?.errors?.author) {
                setError("author", {
                    type: "server",
                    message: error?.data?.error?.errors?.author.message,
                });
            } else if (error?.data?.error?.errors?.genre) {
                setError("genre", {
                    type: "server",
                    message: error?.data?.error?.errors?.genre.message,
                });
            } else if (error?.data?.error?.code === 11000) {
                setError("isbn", {
                    type: "server",
                    message: error?.data?.message,
                });
            } else if (error?.data?.error?.errors?.copies) {
                setError("copies", {
                    type: "server",
                    message: error?.data?.error?.errors?.copies.message,
                });
            }
        }
    };

    return (
        <div className="md:w-[425px] w-full p-5 shadow shadow-black/20 md:p-10 rounded-md bg-white mx-auto">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleFormSubmit)}
                    className="flex flex-col gap-5"
                >
                    <FormField
                        control={form.control}
                        name="title"
                        rules={{ required: "Book title is required" }}
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value || ""} />
                                </FormControl>
                                {fieldState.error && (
                                    <p className="text-red-500 text-sm">
                                        {fieldState.error.message}
                                    </p>
                                )}
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="author"
                        rules={{ required: "Author name is required" }}
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Author</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value || ""} />
                                </FormControl>
                                {fieldState.error && (
                                    <p className="text-red-500 text-sm">
                                        {fieldState.error.message}
                                    </p>
                                )}
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="genre"
                        rules={{ required: "Please select a genre" }}
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Genre</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a Genre" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Genre</SelectLabel>
                                                <SelectItem value="FICTION">FICTION</SelectItem>
                                                <SelectItem value="NON_FICTION">NON_FICTION</SelectItem>
                                                <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                                                <SelectItem value="HISTORY">HISTORY</SelectItem>
                                                <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                                                <SelectItem value="FANTASY">FANTASY</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                {fieldState.error && (
                                    <p className="text-red-500 text-sm">
                                        {fieldState.error.message}
                                    </p>
                                )}
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="isbn"
                        rules={{ required: "ISBN number is required" }}
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>ISBN</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value || ""} />
                                </FormControl>
                                {fieldState.error && (
                                    <p className="text-red-500 text-sm">
                                        {fieldState.error.message}
                                    </p>
                                )}
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        rules={{ required: "Book description is required" }}
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value || ""} />
                                </FormControl>
                                {fieldState.error && (
                                    <p className="text-red-500 text-sm">
                                        {fieldState.error.message}
                                    </p>
                                )}
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="copies"
                        rules={{
                            required: "Please provide the number of copies",
                            min: {
                                value: 1,
                                message: "At least 1 copy must be available",
                            },
                        }}
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Copies</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value || ""} />
                                </FormControl>
                                {fieldState.error && (
                                    <p className="text-red-500 text-sm">
                                        {fieldState.error.message}
                                    </p>
                                )}
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-between items-center">
                        <Button variant="outline" type="button">
                            Cancel
                        </Button>
                        <Button type="submit">Add Book</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default AddBookComponent;

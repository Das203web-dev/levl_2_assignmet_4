import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { MdOutlineCreate } from "react-icons/md";
import type { IBooks, IIdForBook } from "@/type/type";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { useEditBookMutation } from "@/redux/Api/baseApi";
import { swalFire } from "@/sweetAlert/sweetAlert";
import { useEffect, useState } from "react";

interface IBookWithId {
    book: IIdForBook
}

interface EditBookType extends Partial<IBooks> {
    id: string,

}

const EditBook = ({ book }: IBookWithId) => {
    const [updateBook] = useEditBookMutation()
    const [updateFormOpen, setUpdateFormOpen] = useState(false)
    const form = useForm({
        defaultValues: {
            title: book.title,
            author: book.author,
            genre: book.genre,
            isbn: book.isbn,
            description: book.description,
            copies: book.copies,
            available: book.available
        }
    })
    useEffect(() => {
        if (updateFormOpen) {
            form.reset({
                title: book.title,
                author: book.author,
                genre: book.genre,
                isbn: book.isbn,
                description: book.description,
                copies: book.copies,
                available: book.available
            })
        }
    }, [updateFormOpen, book, form])
    const { setError } = form;
    const handleEditBookFormSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const bookData = {
                ...data,
                id: book._id,
                copies: Number(data.copies)
            }
            const result = await updateBook(bookData as EditBookType).unwrap()
            if (result.success) {
                await swalFire({ title: result?.data?.title, text: result.message, icon: "success" })
            }
            form.reset()
            setUpdateFormOpen(false)
        } catch (error: any) {
            if (error?.data?.error?.errors?.title) {
                setError("title", {
                    type: "server",
                    message: error?.data?.error?.errors?.title.message
                })
            }
            else if (error?.data?.error?.errors?.author) {
                setError("author", {
                    type: "server",
                    message: error?.data?.error?.errors?.author.message
                })
            }
            else if (error?.data?.error?.errors?.genre) {
                setError("genre", {
                    type: "server",
                    message: error?.data?.error?.errors?.genre.message
                })
            }
            else if (error.data.error.code === 11000) {
                setError("isbn", {
                    type: "server",
                    message: error?.data?.message
                })
            }
            else if (error?.data?.error?.errors?.copies) {
                setError("copies", {
                    type: "server",
                    message: error?.data?.error?.errors?.copies.message
                })
            }

        }
    }
    return (
        <Dialog open={updateFormOpen} onOpenChange={setUpdateFormOpen}>

            <DialogTrigger asChild>
                <Button variant="outline"><MdOutlineCreate></MdOutlineCreate></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Book</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleEditBookFormSubmit)} className="flex flex-col gap-2 md:gap-5">

                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ""}></Input>
                                    </FormControl>
                                    {
                                        fieldState.error && (
                                            <p className="text-red-500 text-sm">
                                                {fieldState.error.message}
                                            </p>
                                        )
                                    }
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="author"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Author</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ""}></Input>
                                    </FormControl>
                                    {
                                        fieldState.error && (
                                            <p className="text-red-500 text-sm">
                                                {fieldState.error.message}
                                            </p>
                                        )
                                    }
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="genre"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Genre</FormLabel>
                                    <FormControl>
                                        <Select  {...field} onValueChange={field.onChange}>
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
                                    {
                                        fieldState.error && (
                                            <p className="text-red-500 text-sm">
                                                {fieldState.error.message}
                                            </p>
                                        )
                                    }
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isbn"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>ISBN</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ""}></Input>
                                    </FormControl>
                                    {
                                        fieldState.error && (
                                            <p className="text-red-500 text-sm">
                                                {fieldState.error.message}
                                            </p>
                                        )
                                    }
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ""}></Input>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="copies"
                            rules={{
                                required: "Must provide number of copies",
                                min: {
                                    value: 1,
                                    message: "Copies must be at least 1 (no negative or zero allowed)"
                                }
                            }}

                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Copies</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value}></Input>
                                    </FormControl>
                                    {
                                        fieldState.error && (
                                            <p className="text-red-500 text-sm">
                                                {fieldState.error.message}
                                            </p>
                                        )
                                    }
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>

        </Dialog>
    );
};

export default EditBook;
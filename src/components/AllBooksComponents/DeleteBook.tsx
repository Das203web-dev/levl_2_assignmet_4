import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useDeleteBookMutation } from "@/redux/Api/baseApi"
import { swalFire } from "@/sweetAlert/sweetAlert"
import { MdDeleteForever } from "react-icons/md"

interface IDeleteBookId {
    id: string
}

export function DeleteBook({ id }: IDeleteBookId) {
    const [deleteBook] = useDeleteBookMutation()
    const handleDelete = async (bookId: string) => {
        const deleteBookResult = await deleteBook(bookId).unwrap();
        if (deleteBookResult.success) {
            swalFire({ title: "", text: deleteBookResult.message, icon: "success" })
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline"><MdDeleteForever></MdDeleteForever></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the book data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(id)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

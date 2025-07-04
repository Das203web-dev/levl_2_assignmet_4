import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import borrowIcon from "../../assets/borrow.png"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form"
import type { IBorrow, IIdForBook } from "@/type/type"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "../ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useState } from "react"
import { useBorrowBookMutation } from "@/redux/Api/baseApi"
import { swalFire } from "@/sweetAlert/sweetAlert"
import { useNavigate } from "react-router"


interface BorrowBookType {
    book: IIdForBook
}

export function BorrowBook({ book }: BorrowBookType) {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    // console.log(book);
    const form = useForm();
    const [borrowBook] = useBorrowBookMutation()
    const [openCalendar, setOpenCalender] = useState(false)
    const { setError, formState: { errors } } = form;

    const handleBorrowBook: SubmitHandler<FieldValues> = async (data) => {
        try {
            if (new Date(data.dueDate) < new Date()) {
                setError("dueDate", {
                    type: "dueDateValidation",
                    message: "Due date can not be in the past"
                })
                return
            }
            // console.log(data);
            const borrowBookInfo: IBorrow = {
                book: book._id,
                quantity: data.copies,
                dueDate: data.dueDate
            };
            const result = await borrowBook(borrowBookInfo as IBorrow).unwrap()
            console.log(result);
            if (result.success) {
                console.log("consoling inside result");
                setOpen(false)
                swalFire({ title: book.title, text: result.message, icon: "success" })
                navigate("/borrowSummary")
            }
        } catch (error: any) {
            console.log(error);
            if (error.status === 500) {
                setError("copies", {
                    type: "server",
                    message: error?.data?.message
                })
            }
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger asChild>
                <Button variant="outline"><img className="w-4 h-4" src={borrowIcon} alt="" /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Borrow Book</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleBorrowBook)}>
                        <FormItem>
                            <FormLabel>Book Title</FormLabel>
                            <FormControl>
                                <Input value={book.title} readOnly />
                            </FormControl>
                        </FormItem>

                        <FormItem>
                            <FormLabel>Genre</FormLabel>
                            <FormControl>
                                <Input value={book.genre} readOnly />
                            </FormControl>
                        </FormItem>

                        <FormField
                            control={form.control}
                            name="copies"
                            rules={{
                                required: "Must provide number of copies"
                            }}
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Copies</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" placeholder="Enter number of copies"></Input>
                                    </FormControl>
                                    {
                                        fieldState.error && (
                                            <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                                        )
                                    }
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dueDate"
                            rules={{ required: "Due date is required" }}
                            render={({ field, fieldState }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Due Date</FormLabel>
                                    <Popover open={openCalendar} onOpenChange={setOpenCalender}>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={(date) => {
                                                    field.onChange(date)
                                                    setOpenCalender(false)
                                                }}
                                                captionLayout="dropdown"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {fieldState.error && (
                                        <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                                    )}
                                </FormItem>
                            )}
                        />


                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Borrow</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

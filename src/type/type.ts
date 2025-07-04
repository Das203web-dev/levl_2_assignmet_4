import type { SweetAlertIcon } from "sweetalert2"

export interface IBooks {
    title: string,
    author: string,
    genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY"
    isbn: string
    description?: string
    copies: number
    available?: boolean | true,
    createdAt?: string,
    updatedAt?: string
}
export interface IIdForBook extends IBooks {
    _id: string
}

export interface IBorrow {
    book: string,
    quantity: number,
    dueDate: Date
}
export interface ISwalAlertType {
    title: string,
    text: string,
    icon: SweetAlertIcon,
}
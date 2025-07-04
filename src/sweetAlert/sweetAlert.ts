import type { ISwalAlertType } from '@/type/type'
import Swal from 'sweetalert2'
export const swalFire = ({ title, text, icon }: ISwalAlertType) => {
    return Swal.fire({
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        title: title,
        text: text,
        icon: icon
    })
}
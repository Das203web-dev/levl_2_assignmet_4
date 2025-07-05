import { Link } from "react-router";
import { MdOutlineLocalLibrary } from "react-icons/md";
import { useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";


const Navbar = () => {
    const [open, setOpen] = useState(false);
    const navLinks = [
        { id: 1, name: "all books", paths: "books" },
        { id: 2, name: "add book", paths: "create-book" },
        { id: 3, name: "borrow summary", paths: "borrow-summary" },
    ];

    return (
        <nav className="flex max-w-7xl mx-auto overflow-hidden py-5 justify-between items-center">
            <Link className="text-4xl bg-black text-white p-2 rounded-full ml-5 xl:ml-0 z-50" to={'/'}><MdOutlineLocalLibrary></MdOutlineLocalLibrary></Link>
            <ul className={`flex md:static mr-5 xl:mr-0 justify-center items-center flex-col md:flex-row md:w-fit w-full h-screen md:h-fit transition-all duration-500 bg-white z-10 gap-5 uppercase absolute ${open ? " top-0 md:flex-row" : "-top-full"}`}>
                {
                    navLinks.map(link => <Link onClick={() => setOpen(false)} key={link.id} to={link.paths}>{link.name}</Link>)
                }
            </ul>
            <div className="bg-black overflow-hidden mr-5 z-50 text-white text-2xl p-2 md:hidden block" onClick={() => setOpen(!open)}>
                {open ? <IoCloseOutline></IoCloseOutline> : <RiMenu3Line></RiMenu3Line>}
            </div>
        </nav>
    );
};

export default Navbar;
const Footer = () => {
    return (
        <footer className="bg-black text-white py-6 mt-12">
            <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-400">
                <p>&copy; {new Date().getFullYear()} Library Management App. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;

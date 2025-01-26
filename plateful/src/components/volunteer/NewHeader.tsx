import React from "react";
import Link from "next/link";

const NewHeader = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-bg-main shadow-md">
      
    <nav className="flex justify-between items-center w-full">
        <Link href="/" className="text-3xl font-bold text-green-bg">Plateful</Link>
        <Link href="/" className="text-xl text-gray-700 hover:text-blue-500">Log Out</Link>
    </nav>
    </header>
  );
};

export default NewHeader;
import React from "react";
import Link from "next/link";

const NewHeader = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-gray-100 shadow-md">
      
    <nav className="flex justify-between items-center w-full">
        <Link href="/" className="text-2xl font-bold text-black">Plateful</Link>
        <Link href="/" className="text-2xl font-bold text-black">Log Out</Link>
    </nav>
    </header>
  );
};

export default NewHeader;
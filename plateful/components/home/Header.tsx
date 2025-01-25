import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-gray-100 shadow-md">
      
      <Link href="/home" className="text-2xl font-bold text-black">Plateful</Link>
      <nav className="flex gap-4">
        <a href="#about" className="text-gray-700 hover:text-blue-500">About Us</a>
        <a href="#volunteer" className="text-gray-700 hover:text-blue-500">Volunteer Signup</a>
        <Link href="/login"className="text-gray-700 hover:text-blue-500">Log In</Link>
      </nav>
    </header>
  );
};

export default Header;
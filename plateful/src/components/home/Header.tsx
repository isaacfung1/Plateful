import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-bg-main shadow-md">
      
      <Link href="/" className="text-3xl font-bold text-green-bg">Plateful</Link>
      <nav className="flex gap-4">
        <a href="/register" className="text-xl text-gray-700 hover:text-blue-500">Signup</a>
        <Link href="/login"className="text-xl text-gray-700 hover:text-blue-500">Log In</Link>
      </nav>
    </header>
  );
};

export default Header;
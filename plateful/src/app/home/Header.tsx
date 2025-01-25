import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-bg-main shadow-md">
      <div className="text-3xl font-bold text-green-bg">Plateful</div>
      <nav className="flex gap-4">
        <a href="#about" className="text-green-bg hover:text-blue-500">About Us</a>
        <a href="#volunteer" className="text-green-bg hover:text-blue-500">Volunteer Signup</a>
        <a href="#login" className="text-green-bg hover:text-blue-500">Log In</a>
      </nav>
    </header>
  );
};

export default Header;
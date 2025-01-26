import React from "react";
import Link from "next/link";

interface NewHeaderProps {
  toggleVisibility: () => void;
}

const NewHeader: React.FC<NewHeaderProps> = ({ toggleVisibility }) => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-bg-main shadow-md">
      <nav className="flex justify-between items-center w-full">
        <Link href="/" className="text-3xl font-bold text-green-bg">Plateful</Link>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleVisibility}
            className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            View Routes
          </button>
          <Link href="/" className="text-xl text-gray-700 hover:text-blue-500">Log Out</Link>
        </div>
      </nav>
    </header>
  );
};

export default NewHeader;
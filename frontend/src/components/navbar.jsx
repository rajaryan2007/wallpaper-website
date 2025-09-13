import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white shadow-md">
      
      <h1 className="text-lg font-bold tracking-wide">WALLPAPER</h1>

  
      <nav className="hidden md:flex gap-6">
        <Link to="/all-image" className="hover:text-blue-400">
          All Images
        </Link>
        <Link to="/upload" className="hover:text-blue-400">
          Upload
        </Link>
        <Link to="/delete" className="hover:text-blue-400">
          Delete
        </Link>
      </nav>

 
      <button
        className="md:hidden focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
    
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

     
      {isOpen && (
        <nav className="absolute top-16 left-0 w-full bg-gray-800 flex flex-col items-center gap-4 py-4 md:hidden">
          <Link
            to="/all-image"
            className="hover:text-blue-400"
            onClick={() => setIsOpen(false)}
          >
            All Images
          </Link>
          <Link
            to="/upload"
            className="hover:text-blue-400"
            onClick={() => setIsOpen(false)}
          >
            Upload
          </Link>
          <Link
            to="/delete"
            className="hover:text-blue-400"
            onClick={() => setIsOpen(false)}
          >
            Delete
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;

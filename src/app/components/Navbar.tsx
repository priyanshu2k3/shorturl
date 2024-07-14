"use client"
import React, { useEffect, useState } from 'react';
import { useRouter} from 'next/navigation';

const Navbar: React.FC = () => {
    const router =useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [cookies, setCookies] = useState<string | null>(null);


    // Function to handle mouse enter and leave events for the dropdown
    useEffect(() => {
      if (typeof document !== 'undefined') {
        setCookies(document.cookie);
      }
    }, []);
  
    const handleDropdownMouseEnter = () => {
      setIsOpen(true);
    };
  
    const handleDropdownMouseLeave = () => {
      setIsOpen(false);
    };
  
    const handleLogout = (e: any) => {
      console.log("logout");
      if (typeof document !== 'undefined') {
        cookies?.split(";").forEach(cookie => {
          document.cookie = cookie.replace(/^ +/, "")
            .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
        });
      }
      router.push("/signin");
    };
  return (
    <nav className="bg-blue-600 p-4 shadow-md" onMouseLeave={handleDropdownMouseLeave}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <a href="/" className="text-white text-xl font-bold">Home</a>
          <a href="/links" className="hidden md:block text-white hover:text-gray-300 transition">Short Links</a>
        </div>
        
        <div className="flex items-center space-x-4" >
     
          <div className="w-8 h-8 rounded-full bg-white overflow-hidden" 
                  onMouseEnter={handleDropdownMouseEnter}
                  >
          
          <svg xmlns="http://www.w3.org/2000/svg" height="" viewBox="0 -960 960 960" width="" fill="#000000"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"/></svg> 
          {isOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10"
              onMouseEnter={handleDropdownMouseEnter}
              onMouseLeave={handleDropdownMouseLeave}
            >
              <a href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</a>
              <button
                onClick={(e:any) => {(handleLogout(e))}} // Replace with actual logout functionality
                className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          )}
          </div>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <a href="/" className="block text-white px-4 py-2 hover:bg-blue-700">Home</a>
          <a href="/links" className="block text-white px-4 py-2 hover:bg-blue-700">Short Links</a>
          <a href="/profile" className="block text-white px-4 py-2 hover:bg-blue-700">Profile</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

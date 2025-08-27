import React from "react";
import { HiMenu, HiChevronDown } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { BiWorld } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { GoQuestion } from "react-icons/go";

const Header = ({ onMenuClick }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4 md:py-5 lg:px-6">
      <div className="flex items-center">
        {/* Burger button (left) */}
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-600 hover:text-gray-900"
        >
          <HiMenu className="h-6 w-6 text-[#004364]" />
        </button>

        {/* Navigation (right) */}
        <div className="flex items-center space-x-4 md:space-x-10 ml-auto">
          <button className="flex items-center text-[#262626] hover:text-[#131313]">
            <GoQuestion className="h-5 w-5 mr-1 text-[#004364]" />
            <span className="hidden sm:inline text-sm">How It Works</span>
          </button>

          <button className="flex items-center text-[#262626] hover:text-[#131313]">
            <BiWorld className="h-5 w-5 mr-1 text-[#004364]" />
            <span className="text-sm">English</span>
            <HiChevronDown className="h-4 w-4 ml-1 text-[#004364]" />
          </button>

          <button className="flex items-center text-[#262626] hover:text-[#131313]">
            <CgProfile className="h-5 w-5 mr-1 text-[#004364]" />
            <span className="hidden sm:inline text-sm">My Account</span>
          </button>

          <button className="flex items-center text-[#262626] hover:text-[#131313]">
            <FiLogOut className="h-5 w-5 mr-1 text-[#004364]" />
            <span className="hidden sm:inline text-sm">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

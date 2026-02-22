import React from "react";
import logo from "../../assets/logo.png";
// import helpIcon from "../../assets/help-icon.svg";
// import bellIcon from "../../assets/bell-icon.svg";
// import profileIcon from "../../assets/profile-icon.svg";
import { HelpCircle, Bell, UserCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-white p-4 shadow-sm">
      <div>
        <img src={logo} alt="Company Logo" className="h-8 w-auto" />
      </div>

      <div className="flex items-center space-x-6">
        <button className="text-gray-600 hover:text-blue-600 transition-colors">
          <HelpCircle className="h-6 w-6" />
        </button>

        <button className="relative text-gray-600 hover:text-blue-600 transition-colors">
          <Bell className="h-6 w-6" />
          <span className="absolute top-0 right-0 flex h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
        </button>

        <button className="text-gray-600 hover:text-blue-600 transition-colors">
          <UserCircle className="h-8 w-8" />
        </button>
      </div>
    </header>
  );
}

import React from "react";
import logo from "../../assets/logo.png";
import helpIcon from "../../assets/help-icon.svg";
import bellIcon from "../../assets/bell-icon.svg";
import profileIcon from "../../assets/profile-icon.svg";

export default function Header() {
  return (
    <header className="flex h-16 w-full items-center justify-between bg-white p-4 shadow-sm">
      <div>
        <img src={logo} alt="Company Logo" className="h-8 w-auto" />
      </div>

      <div className="flex items-center space-x-6">
        <button className="hover:opacity-75">
          <img src={helpIcon} alt="Help" className="h-6 w-6" />
        </button>
        <button className="relative hover:opacity-75">
          <img src={bellIcon} alt="Notifications" className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3 rounded-full bg-red-500 border-2 border-white"></span>
        </button>
        <button className="hover:opacity-75">
          <img src={profileIcon} alt="User Profile" className="h-8 w-8 " />
        </button>
      </div>
    </header>
  );
}

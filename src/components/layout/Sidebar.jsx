import React from "react";
import {
  LayoutDashboard,
  Users,
  Clock,
  UserPlus,
  CreditCard,
  Calendar,
  BarChart3,
  FileText,
  Settings,
} from "lucide-react";

export default function Sidebar({ currentPage, onPageChange }) {
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Employees", icon: Users },
    { name: "Attendance", icon: Clock },
    { name: "Recruitment", icon: UserPlus },
    { name: "Payroll", icon: CreditCard },
    { name: "Calendar", icon: Calendar },
    { name: "Reports", icon: BarChart3 },
    { name: "Documents", icon: FileText },
    { name: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                className={`flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === item.name
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "hover:bg-blue-50 text-gray-700"
                }`}
                onClick={() => onPageChange(item.name)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Help Card Section */}
      <div className="p-4 border-t border-gray-100">
        <div className="bg-blue-200 p-4 rounded-xl">
          <h4 className="text-sm font-bold text-gray-900">Need Help?</h4>
          <p className="text-gray-600 text-xs mt-1 mb-3">
            Contact HR support for assistance
          </p>
          <button className="w-full bg-white text-xs font-semibold py-2 rounded-lg text-blue-600 hover:bg-gray-50 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </aside>
  );
}

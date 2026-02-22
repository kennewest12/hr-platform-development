import React from "react";
import { NavLink } from "react-router-dom";
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

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "Employees", icon: Users, path: "/admin/employees" },
    { name: "Attendance", icon: Clock, path: "/admin/attendance" },
    { name: "Recruitment", icon: UserPlus, path: "/admin/recruitment" },
    { name: "Payroll", icon: CreditCard, path: "/admin/payroll" },
    { name: "Calendar", icon: Calendar, path: "/admin/calendar" },
    { name: "Reports", icon: BarChart3, path: "/admin/reports" },
    { name: "Documents", icon: FileText, path: "/admin/documents" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) => `
                  flex items-center px-4 py-3 rounded-[10px] transition-all group
                  ${isActive ? "bg-blue-50 text-blue-600 font-semibold" : "hover:bg-blue-50 text-gray-700"}
                `}
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={`w-5 h-5 mr-3 ${isActive ? "text-blue-600" : "text-gray-500 group-hover:text-blue-600"}`}
                    />
                    <span className="text-sm font-medium">{item.name}</span>
                  </>
                )}
              </NavLink>
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

import React from "react";
import Headers from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

export default function Admin() {
  return (
    <div className="flex flex-col bg-gray-50">
      <Headers />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6"></main>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import EmploymentTab from "./EmploymentTab";
import StatusBadge from "./StatusBadge";

const EmployeeProfile = ({ employee, onBack }) => {
  const [activeTab, setActiveTab] = useState("Personal Info");

  if (!employee) {
    return (
      <div className="p-6 text-center text-slate-500">
        No employee selected.
      </div>
    );
  }

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString() : "-";

  return (
    <div className=" mx-auto p-6 space-y-6 font-sans text-slate-800">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Employees
      </button>

      {/* Profile Header */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
          {employee.photo ? (
            <img
              src={employee.photo}
              alt={employee.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl">👤</span>
          )}
        </div>

        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">{employee.name}</h1>
          <p className="text-lg text-slate-500 font-medium">
            {employee.jobTitle}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <StatusBadge status={employee.status} />
            <span className="text-slate-600 text-xs font-bold uppercase tracking-wider">
              {employee.employmentType || "-"}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        className="bg-slate-100/50 p-1 rounded-xl flex gap-2 w-full "
      >
        {["Personal Info", "Employment"].map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-all ${
              activeTab === tab
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "Personal Info" && (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 space-y-10">
          {/* Personal Info */}
          <section>
            <h2 className="text-lg font-bold mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InfoField label="Email" value={employee.email} />
              <InfoField label="Phone" value={employee.phone} />
              <InfoField
                label="Date of Birth"
                value={formatDate(employee.dob)}
              />
              <InfoField label="Address" value={employee.address} />
              <InfoField label="Department" value={employee.department} />
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Emergency Contact */}
          <section>
            <h2 className="text-lg font-bold mb-6">Emergency Contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <InfoField label="Name" value={employee.emergencyContact?.name} />
              <InfoField
                label="Relationship"
                value={employee.emergencyContact?.relationship}
              />
              <InfoField
                label="Phone"
                value={employee.emergencyContact?.phone}
              />
            </div>
          </section>
        </div>
      )}

      {activeTab === "Employment" && <EmploymentTab employee={employee} />}
    </div>
  );
};

// Reusable Field Component
const InfoField = ({ label, value }) => (
  <div className="space-y-1">
    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
      {label}
    </p>
    <p className="text-sm font-medium text-slate-700 leading-relaxed">
      {value || "-"}
    </p>
  </div>
);

export default EmployeeProfile;

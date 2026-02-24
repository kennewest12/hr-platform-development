import React from "react";
import { Calendar, CakeIcon } from "lucide-react";
// Defining individual item component
function BirthdayItem({ name, birthday }) {
  return (
    <div className="flex items-center p-4 rounded-lg bg-purple-50">
      <div className="flex items-center justify-center p-2 rounded-full bg-purple-200">
        <CakeIcon className="h-6 w-6" />
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-700">{name}</p>
        <p className="text-xs text-gray-500">{birthday}</p>
      </div>
    </div>
  );
}

export default function BirthdayCard() {
  //  Define your data in an array
  const birthdays = [
    { id: 1, name: "Sarah Johnson", birthday: "June 15" },
    { id: 2, name: "Michael Rodriguez", birthday: "July 22" },
    { id: 3, name: "Emily Chen", birthday: "August 5" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="flex items-center p-4 ">
        <Calendar className="text-purple-600 mr-2" />
        <h2 className="text-lg font-semibold">
          Upcoming Birthdays & Anniversaries
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {birthdays.map((person) => (
          <BirthdayItem
            key={person.id}
            name={person.name}
            birthday={person.birthday}
          />
        ))}
      </div>
    </div>
  );
}

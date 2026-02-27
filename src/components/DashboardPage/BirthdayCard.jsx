import React, { useState, useEffect } from "react";
import { Calendar, CakeIcon } from "lucide-react";
import { fetchWorkforceData } from "../../data/workforce";

export default function BirthdayCard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchWorkforceData().then((data) => {
      const upcoming = data.upcomingEvents || [];

      // Map events with formatted date and type
      const formattedEvents = upcoming.map((e) => ({
        id: e.id,
        name: e.name,
        date: new Date(e.date),
        type: e.type,
        formattedDate: new Date(e.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      }));

      // Sort by date ascending
      formattedEvents.sort((a, b) => a.date - b.date);

      setEvents(formattedEvents);
    });
  }, []);

  // Individual item component
  function EventItem({ name, formattedDate, type }) {
    const bgColor = type === "birthday" ? "bg-purple-50" : "bg-yellow-50";
    const iconBg = type === "birthday" ? "bg-purple-200" : "bg-yellow-200";

    return (
      <div className={`flex items-center p-4 rounded-lg ${bgColor}`}>
        <div
          className={`flex items-center justify-center p-2 rounded-full ${iconBg}`}
        >
          <CakeIcon className="h-6 w-6" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-700">{name}</p>
          <p className="text-xs text-gray-500">
            {formattedDate}{" "}
            <span className="text-xs font-semibold text-gray-600 uppercase">
              {type}
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="flex items-center p-4">
        <Calendar className="text-purple-600 mr-2" />
        <h2 className="text-lg font-semibold">
          Upcoming Birthdays & Anniversaries
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {events.length > 0 ? (
          events.map((e) => (
            <EventItem
              key={e.id}
              name={e.name}
              formattedDate={e.formattedDate}
              type={e.type}
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm col-span-full text-center">
            No upcoming birthdays or anniversaries
          </p>
        )}
      </div>
    </div>
  );
}

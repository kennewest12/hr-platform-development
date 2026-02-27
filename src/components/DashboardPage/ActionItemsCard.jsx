import React, { useState, useEffect } from "react";
import { fetchWorkforceData } from "../../data/workforce";

export default function ActionItemsCard() {
  const [completedIds, setCompletedIds] = useState([]);
  const [isActionsExpanded, setIsActionsExpanded] = useState(false);
  const [actionItems, setActionItems] = useState([]);

  useEffect(() => {
    fetchWorkforceData().then((data) => setActionItems(data.actionItems || []));
  }, []);

  const priorityStyles = {
    red: "bg-red-100 text-red-700 border-red-200",
    yellow: "bg-yellow-100 text-yellow-700 border-yellow-200",
    green: "bg-green-100 text-green-700 border-green-200",
  };

  const toggleTask = (id) => {
    setCompletedIds((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  const displayedActions = isActionsExpanded
    ? actionItems
    : actionItems.slice(0, 3);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-6">
      <h3 className=" font-bold text-neutral-950">
        Action Items ({actionItems.length})
      </h3>

      {actionItems.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-4">
          No pending action items
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          <ul className="grid grid-cols-1 gap-6 px-1.5">
            {displayedActions.map((item) => {
              const isDone = completedIds.includes(item.id);
              return (
                <li key={item.id} className="flex items-center justify-between">
                  <label
                    htmlFor={`actionItem${item.id}`}
                    className="flex items-center gap-2 cursor-pointer flex-1 text-slate-700 font-normal"
                  >
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => toggleTask(item.id)}
                      id={`actionItem${item.id}`}
                      className=" w-4 h-4 rounded accent-slate-950 transition-all cursor-pointer"
                    />
                    <span
                      className={`text-sm transition-all ${isDone ? "line-through text-slate-400" : "text-slate-700"}`}
                    >
                      {item.title}
                    </span>
                  </label>

                  <div className="flex items-center gap-2 shrink-0">
                    <p
                      className={`text-xs rounded-lg px-2 py-1 border ${priorityStyles[item.color]}`}
                    >
                      {item.priority}
                    </p>
                    {isDone ? (
                      <div className="w-5 h-5 rounded-full border border-green-500 flex items-center justify-center text-green-500">
                        <span className="text-[10px]">✓</span>
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-slate-200" />
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          {/* its show button if there are more than 3 items */}
          {actionItems.length > 3 && (
            <button
              onClick={() => setIsActionsExpanded(!isActionsExpanded)}
              className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              {isActionsExpanded ? "Show Less" : "View All Tasks"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

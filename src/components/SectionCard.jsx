import React from "react";

export default function SectionCard({ title, description }) {
  return (
    <div>
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <h2 className="font-bold text-[30px] text-[#101828]">{title}</h2>
          )}
          {description && (
            <p className="font-normal text-[16px] text-[#4A5565]">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

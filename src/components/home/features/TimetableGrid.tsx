"use client";
import React from "react";
interface TimetableGridProps {
  startHour: number;
  endHour: number;
}

export default function TimetableGrid({ startHour, endHour }: TimetableGridProps) {
  const hours = Array.from({ length: endHour - startHour }, (_, i) => startHour + i);
  const days = ["", "월", "화", "수", "목", "금"];

  return (
    <div className="grid grid-cols-6 w-full h-full text-[10px] text-center">
      {days.map((day, i) => (
        <div key={i} className="font-bold border border-gray-150 bg-white item-col-center">
          {day}
        </div>
      ))}
      {hours.map((hour) => (
        <React.Fragment key={hour}>
          <div className="border border-gray-150">{hour}</div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="border border-gray-100" />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}


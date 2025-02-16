import React from "react";

export const NotesNavigation = () => {
  return (
    <div className="flex flex-col gap-2 border-b-[1px] p-4">
      <h2 className="font-notes-interSemiBold">
        React Performance Optimization
      </h2>
      <div className="flex items-center gap-2 text-sm">
        <span className="rounded-lg bg-gray-200 px-2">Dev</span>
        <span className="rounded-lg bg-gray-200 px-2">React</span>
      </div>
      <span className="text-xs text-gray-500">29 Oct 2024</span>
    </div>
  );
};

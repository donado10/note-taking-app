import React from "react";
import { getData, INote } from "./actions";

const Note = ({ note }: { note: INote }) => {
  return (
    <li className="flex flex-col gap-2 border-b-[1px] p-4">
      <h2 className="font-notes-interSemiBold">{note.title}</h2>
      <div className="flex items-center gap-2 text-sm">
        {note.tags.map((tag, i) => (
          <span key={i} className="rounded-lg bg-gray-200 px-2">
            {tag}
          </span>
        ))}
      </div>
      <span className="text-xs text-gray-500">{note.lastEdited}</span>
    </li>
  );
};

export const NotesNavigation = ({ data }: { data: INote[] }) => {
  return (
    <ul className="h-full">
      {data.map((d, i) => (
        <Note key={i} note={d} />
      ))}
    </ul>
  );
};

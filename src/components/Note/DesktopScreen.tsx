import { INote } from "@/app/actions";
import React from "react";
import { NoteHeader, NoteMetadata } from "./NoteContentSection";
import { NoteText } from "./NoteContentSection";

const DesktopScreen = ({ note }: { note: INote }) => {
  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <NoteMetadata
        tags={note.tags.join(", ")}
        title={note.title}
        lastEdited={note.lastEdited}
      />
      <NoteText content={note.content} />
      <div className="flex items-center gap-4">
        <button className="w-fit rounded-lg bg-notes-blue-secondary p-2 text-xs text-white">
          {" "}
          <span>Save Note</span>
        </button>
        <button className="w-fit rounded-lg bg-notes-blue-third p-2 text-xs text-black">
          {" "}
          <span> Cancel</span>
        </button>
      </div>
    </div>
  );
};

export default DesktopScreen;

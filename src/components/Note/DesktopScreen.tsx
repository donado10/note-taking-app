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
    </div>
  );
};

export default DesktopScreen;

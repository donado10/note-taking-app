import { INote } from "@/app/actions";
import React from "react";
import { NoteText, NoteHeader, NoteMetadata } from "./NoteContentSection";

const MobileScreen = ({ note }: { note: INote }) => {
  return (
    <div className="flex h-full flex-col gap-4">
      <NoteHeader />
      <NoteMetadata
        tags={note.tags.join(", ")}
        title={note.title}
        lastEdited={note.lastEdited}
      />
      <NoteText content={note.content} />
    </div>
  );
};

export default MobileScreen;

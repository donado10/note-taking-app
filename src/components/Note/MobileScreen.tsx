import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { NoteText, NoteHeader, NoteMetadata } from "./NoteContentSection";
import { INote } from "@/models/noteModel";
import { NotesProvider } from "@/context/NotesContext";
import { NoteProvider } from "./NoteContent";

const MobileScreen = () => {
  const note = useContext(NoteProvider)?.note!;

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

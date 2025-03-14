import { INote } from "@/models/noteModel";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { NoteFooter, NoteHeader, NoteMetadata } from "./NoteContentSection";
import { NoteText } from "./NoteContentSection";
import { NotesProvider } from "@/context/NotesContext";
import { NoteProvider } from "./NoteContent";

const DesktopScreen = () => {
  const note = useContext(NoteProvider)?.note!;

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <NoteMetadata
        tags={note.tags.join(", ")}
        title={note.title}
        lastEdited={note.lastEdited}
      />
      <NoteText content={note.content} />
      <NoteFooter />
    </div>
  );
};

export default DesktopScreen;

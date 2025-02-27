"use client";

import { INote } from "@/models/noteModel";
import React, { createContext, ReactNode, useState } from "react";

interface INotesContext {
  data: INote[] | [];
  noteEdited?: INote | null;
  editNotes?: (notes: INote[]) => void;
  editedNote?: (note: INote | null) => void;
}

export const NotesProvider = createContext<INotesContext>({ data: [] });

const NotesContext = ({
  value,
  children,
}: {
  value: INote[];
  children: ReactNode;
}) => {
  const [notes, setNotes] = useState<INote[]>(value);
  const [noteEdited, setNoteEdited] = useState<INote | null>(null);
  return (
    <NotesProvider
      value={{
        data: notes,
        noteEdited: noteEdited,
        editNotes: (notes: INote[]) => setNotes([...notes]),
        editedNote: (note: INote | null) => setNoteEdited(note),
      }}
    >
      {children}
    </NotesProvider>
  );
};

export default NotesContext;

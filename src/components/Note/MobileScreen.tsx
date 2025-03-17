import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  NoteText,
  NoteHeader,
  NoteMetadata,
  INoteMetadata,
} from "./NoteContentSection";
import { INote } from "@/models/noteModel";
import { NotesProvider } from "@/context/NotesContext";
import { NoteProvider } from "./NoteContent";

const MobileScreen = () => {
  const note = useContext(NoteProvider)?.note!;

  const [noteMetadata, setNoteMetadata] = useState<INoteMetadata | null>({
    tags: note.tags.join(","),
    title: note.title,
    lastEdited: note.lastEdited,
  });

  const [noteContent, setNoteContent] = useState<string>(note.content);

  const [saveTrigger, setSaveTrigger] = useState(false);
  const [cancelTrigger, setCancelTrigger] = useState(false);

  useEffect(() => {
    if (saveTrigger) {
      console.log("saving...");
      setSaveTrigger(false);
      return;
    }

    if (cancelTrigger) {
      console.log("cancel...");
      setCancelTrigger(false);
      return;
    }
  }, [saveTrigger, cancelTrigger]);

  return (
    <div className="flex h-full flex-col gap-4">
      <NoteHeader onSave={setSaveTrigger} onCancel={setCancelTrigger} />
      <NoteMetadata
        metaData={{
          tags: noteMetadata?.tags ?? "",
          title: noteMetadata?.title ?? "",
          lastEdited: noteMetadata?.title ?? "",
        }}
        onChange={setNoteMetadata}
      />
      <NoteText content={noteContent} onChange={setNoteContent} />
    </div>
  );
};

export default MobileScreen;

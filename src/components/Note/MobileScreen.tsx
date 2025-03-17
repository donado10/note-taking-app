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
import { useRouter } from "next/navigation";

const MobileScreen = () => {
  const note = useContext(NoteProvider)?.note!;
  const notesCtx = useContext(NotesProvider);

  const [noteMetadata, setNoteMetadata] = useState<INoteMetadata | null>({
    tags: note.tags.join(","),
    title: note.title,
    lastEdited: note.lastEdited,
  });

  const [noteContent, setNoteContent] = useState<string>(note.content);

  const [saveTrigger, setSaveTrigger] = useState(false);
  const [cancelTrigger, setCancelTrigger] = useState(false);
  const router = useRouter();

  const saveHandler = async () => {
    const new_note: INote = {
      ...note,
      lastEdited: noteMetadata?.lastEdited ?? "",
      title: noteMetadata?.title ?? "",
      tags: noteMetadata?.tags.split(",") ?? [],
      content: noteContent ?? "",
    };

    const last_note = { ...note };

    const response = await fetch("http://localhost:3000/api/notes", {
      method: "PUT",
      body: JSON.stringify({ notes: new_note }),
    });

    if (response.status === 200) {
      router.back();
      router.refresh();
      notesCtx.editNotes!([
        ...notesCtx.data.filter((note) => note._id !== new_note._id),
        new_note,
      ]);
    }
  };

  const cancelHandler = () => {
    const new_note: INote = {
      ...note,
      lastEdited: noteMetadata?.lastEdited ?? "",
      title: noteMetadata?.title ?? "",
      tags: noteMetadata?.tags.split(",") ?? [],
      content: noteContent ?? "",
    };

    const last_note = { ...note };

    setNoteMetadata({
      title: note?.title ?? "",
      tags: note?.tags.join(",") ?? "",
      lastEdited: note?.lastEdited ?? "",
    });

    setNoteContent(note.content ?? "");
  };

  useEffect(() => {
    if (saveTrigger) {
      saveHandler();
      setSaveTrigger(false);
      return;
    }

    if (cancelTrigger) {
      cancelHandler();
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

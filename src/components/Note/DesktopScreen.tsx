import { INote } from "@/models/noteModel";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  INoteMetadata,
  NoteFooter,
  NoteHeader,
  NoteMetadata,
} from "./NoteContentSection";
import { NoteText } from "./NoteContentSection";
import { NotesProvider } from "@/context/NotesContext";
import { NoteProvider } from "./NoteContent";
import { useRouter } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";
import { useSWRConfig } from "swr";

const DesktopScreen = () => {
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
  const { mutate } = useSWRConfig();

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
      notesCtx.editNotes!([
        ...notesCtx.data.filter((note) => note._id !== new_note._id),
        new_note,
      ]);
      // router.push("/home");
      // router.refresh();
      mutate("http://localhost:3000/api/notes/tags");
      mutate("http://localhost:3000/api/notes");
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
    <div className="flex h-full flex-col gap-4 p-4">
      <NoteMetadata
        metaData={{
          tags: noteMetadata?.tags ?? "",
          title: noteMetadata?.title ?? "",
          lastEdited: noteMetadata?.lastEdited ?? "",
        }}
        onChange={setNoteMetadata}
      />
      <NoteText content={noteContent} onChange={setNoteContent} />
      <NoteFooter onSave={setSaveTrigger} onCancel={setCancelTrigger} />
    </div>
  );
};

export default DesktopScreen;

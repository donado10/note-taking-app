"use client";

import Image from "next/image";
import IconArrowLeft from "@/assets/images/icon-arrow-left.svg";
import IconDelete from "@/assets/images/icon-delete.svg";
import IconArchive from "@/assets/images/icon-archive.svg";
import IconTags from "@/assets/images/icon-tag.svg";
import IconClock from "@/assets/images/icon-clock.svg";
import { useRouter } from "next/navigation";
import {
  Ref,
  useActionState,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { convertToISODate, formatDate } from "@/utils/functions";
import { NoteProvider } from "./NoteContent";
import { NotesProvider } from "@/context/NotesContext";
import { updateNote } from "@/app/actions";
import { NotesNavigation } from "../navigation/NotesNavigation";
import { revalidatePath } from "next/cache";

export const NoteHeader = () => {
  const router = useRouter();
  const notesCtx = useContext(NotesProvider);
  const noteCtx = useContext(NoteProvider);
  const [_, formAction] = useActionState(
    updateNote.bind(null, {
      ...noteCtx?.note!,
      lastEdited: new Date().toISOString(),
    }),
    null,
  );

  return (
    <div className="flex items-center justify-between border-b-[1px] pb-4">
      <button
        className="flex items-center gap-2 text-gray-500"
        onClick={() => {
          router.back();
          router.refresh();
        }}
      >
        <span>
          <Image src={IconArrowLeft} alt="" />
        </span>
        <span>Go Back</span>
      </button>
      <div className="flex items-center gap-8 text-gray-500">
        <button className="">
          <span>
            <Image src={IconDelete} alt="" />
          </span>
        </button>
        <button>
          <span>
            <Image src={IconArchive} alt="" />
          </span>
        </button>
        <button
          onClick={() => {
            notesCtx.editedNote!(null);
            const actualNote = notesCtx.data.filter(
              (note_) => note_._id === noteCtx?.note?._id,
            );
            noteCtx?.editNote!(actualNote[0]);
          }}
        >
          <span>Cancel</span>
        </button>
        <form
          action={formAction}
          onClick={() => {
            let data = [
              ...notesCtx.data.filter(
                (note) => note._id !== noteCtx?.note?._id,
              ),
            ];
            noteCtx?.editNote!({
              ...noteCtx.note!,
              lastEdited: new Date().toISOString(),
            });
            notesCtx.editNotes!([...data, noteCtx?.note!]);
            notesCtx.editedNote!(null);
          }}
        >
          <button disabled={notesCtx.noteEdited === null}>
            <span className="text-notes-blue-secondary">Save Note</span>
          </button>
        </form>
      </div>
    </div>
  );
};
export const NoteHeaderCreateNote = () => {
  const router = useRouter();
  const notesCtx = useContext(NotesProvider);
  const noteCtx = useContext(NoteProvider);
  const [state, formAction] = useActionState(
    updateNote.bind(null, {
      ...noteCtx?.note!,
      lastEdited: new Date().toISOString(),
    }),
    null,
  );

  return (
    <div className="flex items-center justify-between border-b-[1px] pb-4">
      <button
        className="flex items-center gap-2 text-gray-500"
        onClick={() => {
          router.back();
          router.refresh();
        }}
      >
        <span>
          <Image src={IconArrowLeft} alt="" />
        </span>
        <span>Go Back</span>
      </button>
      <div className="flex items-center gap-8 text-gray-500">
        <button
          onClick={() => {
            notesCtx.editedNote!(null);
            const actualNote = notesCtx.data.filter(
              (note_) => note_._id === noteCtx?.note?._id,
            );
            noteCtx?.editNote!(actualNote[0]);
          }}
        >
          <span>Cancel</span>
        </button>
        <form
          action={formAction}
          onClick={() => {
            let data = [
              ...notesCtx.data.filter(
                (note) => note._id !== noteCtx?.note?._id,
              ),
            ];
            noteCtx?.editNote!({
              ...noteCtx.note!,
              lastEdited: new Date().toISOString(),
            });
            notesCtx.editNotes!([...data, noteCtx?.note!]);
            notesCtx.editedNote!(null);
          }}
        >
          <button disabled={notesCtx.noteEdited === null}>
            <span className="text-notes-blue-secondary">Save Note</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export const NoteMetadata = ({
  title,
  tags,
  lastEdited,
}: {
  title: string;
  tags: string;
  lastEdited: string;
}) => {
  const noteCtx = useContext(NoteProvider);
  const note = { ...noteCtx?.note! };

  return (
    <div className="border-b-[1px] pb-4">
      <div className="mb-4 text-2xl font-bold">
        <input
          type="text"
          className="w-full"
          defaultValue={title}
          onChange={(e) => {
            note.title = e.currentTarget.value;
            console.log(note.title);
            noteCtx?.editNote!({ ...note });
          }}
        />
      </div>
      <div className="mb-2 flex items-center">
        <div className="flex w-40 items-center gap-2">
          <Image src={IconTags} alt="" />
          <span>Tags</span>
        </div>
        <span>
          <input
            type="text"
            defaultValue={tags}
            onChange={(e) => {
              const value = e.currentTarget.value.replace(/\s+/g, "");
              note.tags = value.split(",");
              noteCtx?.editNote!({ ...note });
            }}
          />
        </span>
      </div>
      <div className="flex items-center">
        <div className="flex w-40 items-center gap-2">
          <Image src={IconClock} alt="" />
          <span>Last edited</span>
        </div>
        <span>{lastEdited}</span>
      </div>
    </div>
  );
};

export const NoteText = ({ content }: { content: string }) => {
  const noteCtx = useContext(NoteProvider);
  const note = { ...noteCtx?.note! };
  const [contentValue, setContentValue] = useState(content);

  useEffect(() => {
    setContentValue(content);
  }, [content]);
  return (
    <div className="w-full flex-grow border-b-[1px] pb-4">
      <textarea
        className="h-full w-full outline-none"
        value={contentValue}
        name=""
        id=""
        onChange={(e) => {
          const value = e.target.value;
          setContentValue(value);
          note.content = value;
          noteCtx?.editNote!({ ...note });
        }}
      ></textarea>
    </div>
  );
};

export const NoteFooter = () => {
  const notesCtx = useContext(NotesProvider);
  const noteCtx = useContext(NoteProvider);
  const [state, formAction] = useActionState(
    updateNote.bind(null, {
      ...noteCtx?.note!,
      lastEdited: new Date().toISOString(),
    }),
    null,
  );

  return (
    <div className="flex items-center gap-4">
      <button
        disabled={notesCtx.noteEdited === null}
        className="w-fit rounded-lg bg-notes-blue-secondary p-2 text-xs text-white"
        onClick={() => {
          fetch("/api/notes", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              notes: { ...noteCtx?.note },
            }),
          }).then((res) => {
            if (res.status === 200) {
              revalidatePath("");
            }
            let data = [
              ...notesCtx.data.filter(
                (note) => note._id !== noteCtx?.note?._id,
              ),
            ];
            noteCtx?.editNote!({
              ...noteCtx.note!,
              lastEdited: formatDate(new Date().toISOString()),
            });
            notesCtx.editNotes!([...data, noteCtx?.note!]);
            notesCtx.editedNote!(null);
          });
        }}
      >
        <span>Save Note</span>
      </button>
      <button
        onClick={() => {
          notesCtx.editedNote!(null);
          const actualNote = notesCtx.data.filter(
            (note_) => note_._id === noteCtx?.note!._id,
          );

          noteCtx?.editNote!(actualNote[0]);
        }}
        className="w-fit rounded-lg bg-notes-blue-third p-2 text-xs text-black"
      >
        <span> Cancel</span>
      </button>
    </div>
  );
};

export const NotesNavigationWrapper = () => {
  const data = useContext(NotesProvider).data;
  return (
    <>
      <NotesNavigation data={data} />
    </>
  );
};

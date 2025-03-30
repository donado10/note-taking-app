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
import IconRestore from "@/assets/images/icon-restore.svg";

export interface INoteMetadata {
  tags: string;
  title: string;
  lastEdited: string;
}

export const NoteHeader = ({
  onSave,
  onCancel,
  onArchive,
  onDelete,
  onRestore,
  isArchived,
}: {
  isArchived: boolean;
  onSave: React.Dispatch<React.SetStateAction<boolean>>;
  onCancel: React.Dispatch<React.SetStateAction<boolean>>;
  onArchive: () => void;
  onRestore: () => void;
  onDelete: () => void;
}) => {
  const router = useRouter();

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
        <button onClick={onDelete} className="">
          <span>
            <Image src={IconDelete} alt="" />
          </span>
        </button>
        {!isArchived && (
          <button onClick={onArchive}>
            <span>
              <Image src={IconArchive} alt="" />
            </span>
          </button>
        )}
        {isArchived && (
          <button onClick={onRestore}>
            <span>
              <Image src={IconRestore} alt="" />
            </span>
          </button>
        )}
        <button onClick={onCancel.bind(null, true)}>
          <span>Cancel</span>
        </button>
        <button onClick={onSave.bind(null, true)} disabled={false}>
          <span className="text-notes-blue-secondary">Save Note</span>
        </button>
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
  metaData,
  onChange,
}: {
  metaData: { tags: string; title: string; lastEdited: string };
  onChange: React.Dispatch<
    React.SetStateAction<{
      tags: string;
      title: string;
      lastEdited: string;
    } | null>
  >;
}) => {
  return (
    <div className="border-b-[1px] pb-4">
      <div className="mb-4 text-2xl font-bold">
        <input
          type="text"
          className="w-full"
          placeholder="Enter a title..."
          defaultValue={metaData.title}
          onChange={(e) => {
            const title = e.currentTarget.value;
            onChange({ ...metaData, title: title });
          }}
        />
      </div>
      <div className="mb-2 flex items-center">
        <div className="flex w-40 items-center gap-2">
          <Image src={IconTags} alt="" />
          <span>Tags</span>
        </div>
        <span className="flex-1">
          <input
            type="text"
            defaultValue={metaData.tags}
            className="w-full"
            placeholder="Add tags separated by commas (e.g. Work, Planning)"
            onChange={(e) => {
              const value = e.currentTarget.value.replace(/\s+/g, "");
              onChange({ ...metaData, tags: value });
            }}
          />
        </span>
      </div>
      <div className="flex items-center">
        <div className="flex w-40 items-center gap-2">
          <Image src={IconClock} alt="" />
          <span>Last edited</span>
        </div>
        <span className="flex-1">{metaData.lastEdited}</span>
      </div>
    </div>
  );
};

export const NoteText = ({
  content,
  onChange,
}: {
  content: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [contentValue, setContentValue] = useState(content);

  useEffect(() => {
    setContentValue(content);
  }, [content]);

  return (
    <div className="w-full flex-grow border-b-[1px] pb-4">
      <textarea
        className="h-full w-full outline-none"
        value={contentValue}
        placeholder="Start typing your note here…"
        name=""
        id=""
        onChange={(e) => {
          const value = e.currentTarget.value;
          setContentValue(value);
          onChange(value);
        }}
      ></textarea>
    </div>
  );
};

export const NoteFooter = ({
  onSave,
  onCancel,
}: {
  onSave: React.Dispatch<React.SetStateAction<boolean>>;
  onCancel: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex items-center gap-4">
      <button
        disabled={false}
        className="w-fit rounded-lg bg-notes-blue-secondary p-2 text-xs text-white"
        onClick={() => {
          onSave(true);
        }}
      >
        <span>Save Note</span>
      </button>
      <button
        onClick={() => {
          onCancel(true);
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

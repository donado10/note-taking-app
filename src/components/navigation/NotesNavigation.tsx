"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { INote } from "@/models/noteModel";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Note = ({ note }: { note: INote }) => {
  const pathname = usePathname();

  let path = pathname.split("/")[1];

  if (pathname.split("/")[1] === "tags") {
    path = pathname.split("/")[1] + "/" + pathname.split("/")[2];
  }

  return (
    <>
      {pathname && (
        <Link
          href={`/${path}/${note.title.split(" ").join("-").toLowerCase()}`}
        >
          <li className="flex flex-col gap-2 border-b-[1px] p-4">
            <h2 className="font-notes-interSemiBold">{note.title}</h2>
            <div className="flex items-center gap-2 text-sm">
              {note.tags.map((tag, i) => (
                <span key={i} className="rounded-lg bg-gray-200 px-2">
                  {tag}
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-500">{note.lastEdited}</span>
          </li>
        </Link>
      )}
    </>
  );
};

export const NotesNavigation = ({ data }: { data: INote[] }) => {
  const pathname = usePathname().split("/");
  const [notes, setNotes] = useState(data);

  console.log(data);

  const filterData = (data: INote[]) => {
    if (pathname && pathname[1] === "home") {
      return data;
    }
    if (pathname && pathname[1] === "archived") {
      return data.filter((d) => d.isArchived);
    }
    if (pathname && pathname[1] === "tags") {
      return data.filter((d) =>
        d.tags.some((tag) => tag.toLowerCase() === pathname[2]),
      );
    }

    return data;
  };

  useEffect(() => {
    setNotes(filterData(data));
  }, [JSON.stringify(pathname), JSON.stringify(data)]);

  return (
    <ul className="h-full">
      {notes.map((d, i) => (
        <Note key={i} note={d} />
      ))}
    </ul>
  );
};

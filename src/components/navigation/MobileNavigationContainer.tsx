"use client";

import { getSearchData, NotesHandler } from "@/app/actions";
import { NotesNavigation } from "@/components/navigation/NotesNavigation";
import React, { useContext, useEffect, useState } from "react";
import TitlePage from "../TitlePage";
import IconNewNote from "@/assets/images/icon-plus.svg";
import Image from "next/image";
import SearchNote from "../SearchNote";
import useSWR from "swr";
import { fetcher } from "@/utils/functions";
import { INote } from "@/models/noteModel";
import { redirect, usePathname } from "next/navigation";
import IconPlus from "@/assets/images/icon-plus.svg";
import useMediaQuery, { EMediaQuery } from "@/hooks/useMediaQuery";
import { NotesProvider } from "@/context/NotesContext";

const MobileNavigationContainer = () => {
  const notesCtx = useContext(NotesProvider);
  const { data } = useSWR("http://localhost:3000/api/notes", fetcher, {
    suspense: true,
  });
  const pathname = usePathname();
  const Big = useMediaQuery(EMediaQuery.BIG);

  if (!data) {
    return;
  }

  const notes = data.notes;

  useEffect(() => {
    notesCtx.editNotes!([...notes]);
  }, []);

  return (
    <div className="h-full overflow-scroll">
      {Big && (
        <div className="mb-2">
          <button
            onClick={() => redirect("/home/new_note")}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-notes-blue-secondary py-3 text-white"
          >
            <span>
              <Image src={IconPlus} alt="" />
            </span>
            <span>Create New Note</span>
          </button>
        </div>
      )}
      {pathname === "/home/new_note" && (
        <div className="flex w-full items-center rounded-lg bg-gray-500/15 px-4 py-3 font-notes-interSemiBold">
          <span>Untitled Note</span>
        </div>
      )}
      {notes && notes.length > 0 && <NotesNavigation data={notes} />}
      <button
        onClick={() => redirect("/home/new_note")}
        className="absolute bottom-0 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-notes-blue-primary"
      >
        <span>
          {" "}
          <Image src={IconNewNote} alt="" />
        </span>
      </button>
    </div>
  );
};

export const MobileNavigationContainerSearch = async ({
  query,
}: {
  query: string;
}) => {
  const data = await getSearchData(query);

  return <>{data && data.length > 0 && <NotesNavigation data={data} />}</>;
};

export default MobileNavigationContainer;

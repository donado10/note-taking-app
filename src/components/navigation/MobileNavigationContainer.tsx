"use client";

import { getSearchData, NotesHandler } from "@/app/actions";
import { NotesNavigation } from "@/components/navigation/NotesNavigation";
import React, { useEffect, useState } from "react";
import TitlePage from "../TitlePage";
import IconNewNote from "@/assets/images/icon-plus.svg";
import Image from "next/image";
import SearchNote from "../SearchNote";
import useSWR from "swr";
import { fetcher } from "@/utils/functions";
import { INote } from "@/models/noteModel";
import { redirect, usePathname } from "next/navigation";
import IconPlus from "@/assets/images/icon-plus.svg";

const MobileNavigationContainer = () => {
  const { data } = useSWR("http://localhost:3000/api/notes", fetcher);
  const pathname = usePathname();

  if (!data) {
    return;
  }

  const notes = data.notes;

  return (
    <>
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
      {pathname === "/home/new_note" && (
        <div className="flex w-full items-center rounded-lg bg-gray-500/15 px-4 py-3 font-notes-interSemiBold">
          <span>Untitled Note</span>
        </div>
      )}
      {notes && notes.length > 0 && <NotesNavigation data={notes} />}
    </>
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

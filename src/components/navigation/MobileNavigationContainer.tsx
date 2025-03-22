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
import { usePathname } from "next/navigation";

const MobileNavigationContainer = () => {
  const { data } = useSWR("http://localhost:3000/api/notes", fetcher);

  if (!data) {
    return;
  }

  const notes = data.notes;

  return <>{notes && notes.length > 0 && <NotesNavigation data={notes} />}</>;
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

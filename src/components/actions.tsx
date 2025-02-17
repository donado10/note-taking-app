"use server";

import { NotesNavigation } from "./NotesNavigation";
import { headers } from "next/headers";

export interface INote {
  title: string;
  tags: string[];
  content: string;
  lastEdited: string;
  isArchived: boolean;
}

export const getData = async () => {
  const response = await fetch("http://localhost:3000/data.json");
  const data = await response.json();

  return data.notes;
};

export const NotesNavigationContainer = async () => {
  const headerList = headers();
  const pathname = (await headerList).get("x-current-path")?.split("/");

  const data = (await getData()) as INote[];

  const filterData = (data: INote[]) => {
    if (pathname && pathname[1] === "home") {
      return data;
    }
    if (pathname && pathname[1] === "archived") {
      return data.filter((d) => d.isArchived);
    }
    return data;
  };

  return filterData(data);
};

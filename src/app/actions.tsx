"use server";

import { NotesNavigation } from "@/components/navigation/NotesNavigation";
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

export const NotesHandler = async () => {
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
    if (pathname && pathname[1] === "tags") {
      return data.filter((d) =>
        d.tags.some((tag) => tag.toLowerCase() === pathname[2]),
      );
    }

    return data;
  };

  return filterData(data);
};

export const getTags = async () => {
  const data = (await getData()) as INote[];

  const tagsRaw = data.map((d) => d.tags);
  return tagsRaw.flat();
};

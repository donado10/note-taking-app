"use server";

import { NotesNavigation } from "@/components/navigation/NotesNavigation";
import { formatDate } from "@/utils/functions";
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
  data.notes.forEach((note: any) => {
    console.log(note.lastEdited);
    note.lastEdited = formatDate(note.lastEdited);
  });

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

export const getSearchData = async (query: string) => {
  const data = (await getData()) as INote[];
  query = query.toLowerCase();
  const searchContent = data.filter((d) =>
    d.content.toLowerCase().includes(query),
  );
  const searchTitle = data.filter((d) => d.title.toLowerCase().includes(query));
  const searchTags = data.filter((d) =>
    d.tags.some((t) => t.toLowerCase() === query),
  );

  return [...searchContent, ...searchTitle, ...searchTags].filter(
    (value, index, self) =>
      index ===
      self.findIndex((obj) => JSON.stringify(obj) === JSON.stringify(value)),
  );
};

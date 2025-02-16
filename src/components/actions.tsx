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
  const mapLocation = new Map<String, String>([
    ["", "All Notes"],
    ["archived", "Archived"],
    ["settings", "Settings"],
    ["tags", "Tags"],
    ["search", "Search"],
  ]);
  const headerList = headers();
  const pathname = (await headerList).get("x-current-path")?.split("/");

  const data = (await getData()) as INote[];

  const filterData = () => {
    console.log(pathname);
    if (pathname && pathname[1] === "") {
      return data;
    }
    if (pathname && pathname[1] === "archived") {
      return data.filter((d) => d.isArchived);
    }
    return data;
  };

  return (
    <>
      <NotesNavigation data={filterData()} />
    </>
  );
};

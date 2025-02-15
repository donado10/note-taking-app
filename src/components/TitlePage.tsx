"use client";

import { usePathname } from "next/navigation";
import React from "react";

const TitlePageMain = ({ location }: { location: string[] }) => {
  const mapLocation = new Map<string, string>([
    ["", "All Notes"],
    ["archived", "Archived"],
    ["settings", "Settings"],
    ["tags", "Tags"],
    ["search", "Search"],
  ]);

  return (
    <h1 className="font-notes-interBold text-2xl">
      {mapLocation.get(location[1])}
    </h1>
  );
};

const TitlePageTags = ({ location }: { location: string[] }) => {
  return (
    <h1 className="gap-2 font-notes-interBold text-2xl">
      <span className="text-gray-500">Notes Tagged:</span>{" "}
      <span>
        {location[2]
          .split("")
          .map((value, i) => (i === 0 ? value.toUpperCase() : value))
          .join("")}
      </span>
    </h1>
  );
};

const TitlePage = () => {
  const location = usePathname().split("/");

  return (
    <>
      {location.length === 2 && <TitlePageMain location={[...location]} />}
      {location.length === 3 && location[1] === "tags" && (
        <TitlePageTags location={[...location]} />
      )}
    </>
  );
};

export default TitlePage;

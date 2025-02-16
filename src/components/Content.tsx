"use client";

import useMediaQuery, { EMediaQuery } from "@/hooks/useMediaQuery";
import React from "react";
import { NotesNavMobile } from "./NotesNav";

const ContentMobile = () => {
  return (
    <div>
      <NotesNavMobile />
    </div>
  );
};
const ContentDesktop = () => {
  return (
    <div className="min-h-screen w-1/4 border-r-[1px] p-4">
      <NotesNavMobile />
    </div>
  );
};

const Content = ({ section }: { section: string }) => {
  const Mobile = useMediaQuery(EMediaQuery.MOBILE);
  const Big = useMediaQuery(EMediaQuery.BIG);

  return (
    <>
      {Mobile && !Big && <ContentMobile />}
      {Big && <ContentDesktop />}
    </>
  );
};

export default Content;

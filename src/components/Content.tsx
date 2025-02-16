"use client";

import useMediaQuery, { EMediaQuery } from "@/hooks/useMediaQuery";
import React from "react";
import { NotesNavigation } from "./NotesNavigation";

const ContentMobile = () => {
  return (
    <div>
      <NotesNavigation />
    </div>
  );
};
const ContentDesktop = () => {
  return <></>;
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

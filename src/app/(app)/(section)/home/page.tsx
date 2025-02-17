"use client";

import { INote, NotesNavigationContainer } from "@/components/actions";
import { PageLayout } from "@/components/Layouts";
import { NotesNavigation } from "@/components/NotesNavigation";
import useMediaQuery, { EMediaQuery } from "@/hooks/useMediaQuery";
import { Suspense, useEffect, useState } from "react";
import MobilePage from "./MobilePage";

export default function HomePage() {
  const Mobile = useMediaQuery(EMediaQuery.MOBILE);
  const Big = useMediaQuery(EMediaQuery.BIG);

  return (
    <>
      {Mobile && !Big && <MobilePage />}
      {Big && <div></div>}
    </>
  );
}

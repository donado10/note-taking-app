"use client";

import {
  INoteMetadata,
  NoteFooter,
  NoteMetadata,
  NoteText,
} from "@/components/Note/NoteContentSection";
import { INote } from "@/models/noteModel";
import { getISODate } from "@/utils/functions";
import React, { useEffect, useState } from "react";
import { mutate } from "swr";
import DesktopScreen from "./DesktopScreen";
import useMediaQuery, { EMediaQuery } from "@/hooks/useMediaQuery";
import MobileScreen from "./MobileScreen";

type Props = {};

const page = (props: Props) => {
  const mobile = useMediaQuery(EMediaQuery.MOBILE);
  const big = useMediaQuery(EMediaQuery.BIG);
  return (
    <>
      {mobile && !big && <MobileScreen />}
      {big && <DesktopScreen />}
    </>
  );
};

export default page;

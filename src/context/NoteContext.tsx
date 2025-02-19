"use client";

import { INote } from "@/app/actions";
import React, { createContext, ReactNode } from "react";

interface INoteContext {
  data: INote[] | [];
}

export const NoteProvider = createContext<INoteContext>({ data: [] });

const NoteContext = ({
  value,
  children,
}: {
  value: INote[];
  children: ReactNode;
}) => {
  return <NoteProvider value={{ data: value }}>{children}</NoteProvider>;
};

export default NoteContext;

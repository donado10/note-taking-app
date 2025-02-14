"use client";

import useMediaQuery, { EMediaQuery } from "@/hooks/useMediaQuery";
import React, { ReactNode } from "react";
import { DesktopLayout, MobileLayout } from "./Layouts";

const LayoutScreen = ({ children }: { children: ReactNode }) => {
  const Mobile = useMediaQuery(EMediaQuery.MOBILE);
  const Big = useMediaQuery(EMediaQuery.BIG);
  return (
    <>
      {Mobile && !Big && <MobileLayout>{children}</MobileLayout>}
      {Big && <DesktopLayout>{children}</DesktopLayout>}
    </>
  );
};

export default LayoutScreen;

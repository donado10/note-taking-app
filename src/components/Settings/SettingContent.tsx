"use client";

import useMediaQuery, { EMediaQuery } from "@/hooks/useMediaQuery";
import React from "react";
import MobileSettingNav from "./MobileSettingNav";

const SettingContent = () => {
  const Mobile = useMediaQuery(EMediaQuery.MOBILE);
  const Big = useMediaQuery(EMediaQuery.BIG);
  return <div>{Mobile && <MobileSettingNav />}</div>;
};

export default SettingContent;

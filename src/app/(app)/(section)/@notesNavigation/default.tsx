import React, { Suspense } from "react";
import MobileNavigationContainer from "@/components/navigation/MobileNavigationContainer";
import IconPlus from "@/assets/images/icon-plus.svg";
import Image from "next/image";

const NotesNavigationPage = () => {
  console.log("rerender default");
  return (
    <Suspense>
      <MobileNavigationContainer />
    </Suspense>
  );
};

export default NotesNavigationPage;

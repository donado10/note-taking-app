import React, { Suspense } from "react";
import MobileNavigationContainer from "@/components/navigation/MobileNavigationContainer";

const NotesNavigationPage = () => {
  console.log("rerender default");
  return (
    <Suspense>
      <MobileNavigationContainer />
    </Suspense>
  );
};

export default NotesNavigationPage;

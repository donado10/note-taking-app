import TagsNavigation from "@/components/navigation/TagsNavigation";
import React, { Suspense } from "react";
import { unstable_cache } from "next/cache";

const TagsPage = async () => {
  return (
    <Suspense>
      <TagsNavigation />
    </Suspense>
  );
};

export default TagsPage;

import useMediaQuery, { EMediaQuery } from "@/hooks/useMediaQuery";
import { ReactNode } from "react";

export const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen w-full bg-white font-notes-interRegular">
      {children}
    </div>
  );
};

import { ReactNode } from "react";

export const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen w-full bg-white p-4 font-notes-interRegular">
      {children}
    </div>
  );
};

import { ReactNode } from "react";

export const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full bg-white font-notes-interRegular">{children}</div>
  );
};

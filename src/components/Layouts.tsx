import { ReactNode } from "react";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";

export const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen w-full bg-white p-4 font-notes-interRegular">
      {children}
    </div>
  );
};

export const MobileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full bg-notes-blue-third">
      <header className="p-4">
        <Logo />
      </header>
      <main>{children}</main>
      <nav className="fixed bottom-0 left-0 flex w-screen items-center justify-center">
        <MobileNav />
      </nav>
    </div>
  );
};

export const DesktopLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex bg-white p-2">
      <aside className="w-1/6 p-2">
        <DesktopNav />
      </aside>
      <div className="w-5/6">
        <main>{children}</main>
      </div>
    </div>
  );
};

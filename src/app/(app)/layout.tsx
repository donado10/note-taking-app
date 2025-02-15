import type { Metadata } from "next";
import "../globals.css";
import { fonts } from "../utils/fonts";
import Logo from "@/components/Logo";
import MobileNav from "@/components/MobileNav";
import DesktopNav from "@/components/DesktopNav";
import TitlePage from "@/components/TitlePage";
import IconSearch from "@/assets/images/icon-search.svg";
import IconSettings from "@/assets/images/icon-settings.svg";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fonts} text-black`}>
        <div className="min-h-screen w-full bg-notes-blue-third xl:hidden">
          <header className="p-4">
            <Logo />
          </header>

          <main className="min-h-screen w-full bg-white p-4 font-notes-interRegular">
            <TitlePage />
            {children}
          </main>
          <nav className="fixed bottom-0 left-0 flex w-screen items-center justify-center bg-white">
            <MobileNav />
          </nav>
        </div>
        <div className="min-h-screen bg-white xs:hidden xl:flex">
          <aside className="w-1/6 border-r-[1px] p-2">
            <DesktopNav />
          </aside>
          <main className="w-5/6">
            <header className="flex justify-between border-b-[1px] p-5 px-8">
              <TitlePage />
              <div className="flex items-center gap-8">
                <div className="flex h-10 w-72 items-center justify-center gap-2 rounded-lg border-[1px] p-2">
                  <span>
                    <Image src={IconSearch} alt="" />
                  </span>
                  <input
                    type="text"
                    className="w-full border-none outline-none"
                    placeholder="Search by title, content, or tags…"
                  />
                </div>
                <div>
                  <Link href="/settings">
                    <Image src={IconSettings} alt="" />
                  </Link>
                </div>
              </div>
            </header>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

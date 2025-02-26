"use client";

import React, { ReactElement, useRef, useState } from "react";
import Image from "next/image";
import IconLight from "@/assets/images/icon-sun.svg";
import IconDark from "@/assets/images/icon-moon.svg";
import IconSystem from "@/assets/images/icon-system-theme.svg";
import type { ReactNode, Ref } from "react";
import { useRouter } from "next/navigation";
import BackButton from "../BackButton";
import useMediaQuery, { EMediaQuery } from "@/hooks/useMediaQuery";

const themeMap = new Map<string, string>([
  ["light", "Light Mode"],
  ["dark", "Dark Mode"],
  ["system", "System"],
]);

interface IThemeSelector extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactElement;
  title: string;
  description: string;
  ref?: Ref<HTMLInputElement>;
  children: ReactNode;
}

const ThemeSelector: React.FC<IThemeSelector> = ({
  icon,
  title,
  description,
  ref,
  children,
  ...props
}) => {
  return (
    <>
      <button {...props}>
        <div className="flex items-center gap-4">
          <div className="rounded-xl border-2 bg-white p-2">{icon}</div>
          <div className="flex flex-col items-start gap-1">
            <h2>{title}</h2>
            <p className="text-xs">{description}</p>
          </div>
        </div>
        {children}
      </button>
    </>
  );
};

const ColorThemeMobile = () => {
  const [themeSelection, setThemeSelection] = useState<{
    light: boolean;
    dark: boolean;
    system: boolean;
  }>({ light: true, dark: false, system: false });
  const inputLight = useRef<HTMLInputElement>(null);
  const inputDark = useRef<HTMLInputElement>(null);
  const inputSystem = useRef<HTMLInputElement>(null);
  const Mobile = useMediaQuery(EMediaQuery.MOBILE);
  const Big = useMediaQuery(EMediaQuery.BIG);

  return (
    <div className="h-full w-full">
      {Mobile && !Big && (
        <div className="mb-2">
          <BackButton />
        </div>
      )}
      <h1 className="mb-2 text-2xl font-bold">Color Theme</h1>
      <p className="mb-4 text-xs">Choose your color theme:</p>
      <div className="mb-4 flex w-full flex-col gap-4">
        <ThemeSelector
          icon={<Image src={IconLight} alt="" />}
          title="Light Mode"
          description="Pick a clean and classic light theme"
          onClick={() => {
            setThemeSelection({ light: true, dark: false, system: false });

            inputLight.current!.checked = true;
            inputDark.current!.checked = false;
            inputSystem.current!.checked = false;
          }}
          className={`flex items-center justify-between rounded-xl border-2 p-2 px-4 ${themeSelection.light ? "bg-gray-200/30" : ""}`}
        >
          <input
            type="radio"
            defaultChecked={themeSelection.light}
            ref={inputLight}
          />
        </ThemeSelector>
        <ThemeSelector
          icon={<Image src={IconDark} alt="" />}
          title="Dark Mode"
          description="Select a sleek and modern dark theme"
          onClick={() => {
            setThemeSelection({ light: false, dark: true, system: false });
            inputLight.current!.checked = false;
            inputDark.current!.checked = true;
            inputSystem.current!.checked = false;
          }}
          className={`flex items-center justify-between rounded-xl border-2 p-2 px-4 ${themeSelection.dark ? "bg-gray-200/30" : ""}`}
          ref={inputDark}
        >
          <input type="radio" ref={inputDark} />
        </ThemeSelector>
        <ThemeSelector
          icon={<Image src={IconSystem} alt="" />}
          title="System Mode"
          description="Adapts to your device’s theme"
          onClick={() => {
            setThemeSelection({ light: false, dark: false, system: true });

            inputLight.current!.checked = false;
            inputDark.current!.checked = false;
            inputSystem.current!.checked = true;
          }}
          className={`flex items-center justify-between rounded-xl border-2 p-2 px-4 ${themeSelection.system ? "bg-gray-200/30" : ""}`}
          ref={inputSystem}
        >
          <input type="radio" ref={inputSystem} />
        </ThemeSelector>
      </div>
      <div className="flex w-full">
        <button className="ml-auto rounded-lg bg-notes-blue-secondary p-2 text-sm text-white">
          <span>Apply Changes</span>
        </button>
      </div>
    </div>
  );
};

const ColorThemePage = () => {
  return (
    <>
      <ColorThemeMobile />
    </>
  );
};

export default ColorThemePage;

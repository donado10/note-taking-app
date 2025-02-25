"use client";

import useMediaQuery, { EMediaQuery } from "@/hooks/useMediaQuery";
import React, { ReactElement, useRef, useState } from "react";
import Image from "next/image";
import IconLight from "@/assets/images/icon-sun.svg";
import IconDark from "@/assets/images/icon-moon.svg";
import IconSystem from "@/assets/images/icon-system-theme.svg";

const themeMap = new Map<string, string>([
  ["light", "Light Mode"],
  ["dark", "Dark Mode"],
  ["system", "System"],
]);

const ThemeSelector = ({
  icon,
  title,
  description,
  isSelect,
  onThemeSelect,
}: {
  icon: ReactElement;
  title: string;
  description: string;
  isSelect: boolean;
  onThemeSelect: () => void;
}) => {
  const inputCheck = useRef<HTMLInputElement>(null);
  return (
    <>
      <button
        className="flex items-center justify-between rounded-xl border-2 p-2 px-4"
        onClick={() => {
          inputCheck.current!.checked = isSelect;
          onThemeSelect();
        }}
      >
        <div className="flex items-center gap-4">
          <div className="rounded-xl border-2 p-2">{icon}</div>
          <div className="flex flex-col items-start gap-1">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </div>
        <input type="radio" defaultChecked={isSelect} ref={inputCheck} />
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
  return (
    <div className="h-full w-full">
      <h1 className="mb-2 text-2xl font-bold">Font Theme</h1>
      <p className="mb-4 text-xs">Choose your color theme:</p>
      <div className="mb-4 flex w-full flex-col gap-4">
        <ThemeSelector
          icon={<Image src={IconLight} alt="" />}
          title="Light Mode"
          description="Pick a clean and classic light theme"
          onThemeSelect={() => {
            setThemeSelection({ light: true, dark: false, system: false });
          }}
          isSelect={themeSelection.light}
        />
        <ThemeSelector
          icon={<Image src={IconDark} alt="" />}
          title="Dark Mode"
          description="Select a sleek and modern dark theme"
          onThemeSelect={() => {
            setThemeSelection({ light: false, dark: true, system: false });
          }}
          isSelect={themeSelection.dark}
        />
        <ThemeSelector
          icon={<Image src={IconSystem} alt="" />}
          title="System Mode"
          description="Adapts to your device’s theme"
          onThemeSelect={() => {
            setThemeSelection({ light: false, dark: false, system: true });
          }}
          isSelect={themeSelection.system}
        />
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
  const Mobile = useMediaQuery(EMediaQuery.MOBILE);
  const Big = useMediaQuery(EMediaQuery.BIG);
  return <>{Mobile && !Big && <ColorThemeMobile />}</>;
};

export default ColorThemePage;

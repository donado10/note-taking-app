"use client";

import React, { ReactElement, useRef, useState } from "react";
import Image from "next/image";
import IconSerif from "@/assets/images/icon-font-serif.svg";
import IconSansSerif from "@/assets/images/icon-font-sans-serif.svg";
import IconMonospace from "@/assets/images/icon-font-monospace.svg";
import type { ReactNode, Ref } from "react";

const themeMap = new Map<string, string>([
  ["light", "Light Mode"],
  ["dark", "Dark Mode"],
  ["system", "System"],
]);

interface IFontSelector extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactElement;
  title: string;
  description: string;
  ref?: Ref<HTMLInputElement>;
  children: ReactNode;
}

const FontSelector: React.FC<IFontSelector> = ({
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

const FontMobile = () => {
  const [themeSelection, setThemeSelection] = useState<{
    light: boolean;
    dark: boolean;
    system: boolean;
  }>({ light: true, dark: false, system: false });
  const inputLight = useRef<HTMLInputElement>(null);
  const inputDark = useRef<HTMLInputElement>(null);
  const inputSystem = useRef<HTMLInputElement>(null);

  return (
    <div className="h-full w-full">
      <h1 className="mb-2 text-2xl font-bold">Font Theme</h1>
      <p className="mb-4 text-xs">Choose your font theme:</p>
      <div className="mb-4 flex w-full flex-col gap-4">
        <FontSelector
          icon={<Image src={IconSansSerif} alt="" />}
          title="Sans-serif"
          description="Clean and modern, easy to read."
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
        </FontSelector>
        <FontSelector
          icon={<Image src={IconSerif} alt="" />}
          title="Serif"
          description="Classic and elegant for a timeless feel."
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
        </FontSelector>
        <FontSelector
          icon={<Image src={IconMonospace} alt="" />}
          title="Monospace"
          description="Code-like, great for a technical vibe."
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
        </FontSelector>
      </div>
      <div className="flex w-full">
        <button className="ml-auto rounded-lg bg-notes-blue-secondary p-2 text-sm text-white">
          <span>Apply Changes</span>
        </button>
      </div>
    </div>
  );
};

const FontPage = () => {
  return (
    <>
      <FontMobile />
    </>
  );
};

export default FontPage;

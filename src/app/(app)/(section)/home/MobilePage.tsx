"use client";
import { INote, NotesNavigationContainer } from "@/components/actions";
import { NotesNavigation } from "@/components/NotesNavigation";
import React, { useEffect, useState } from "react";

type Props = {};

const MobilePage = (props: Props) => {
  const [data, setData] = useState<INote[] | []>([]);

  useEffect(() => {
    const dataHandler = async () => {
      const data = await NotesNavigationContainer();
      console.log(data);
      setData(data);
      return data;
    };
    dataHandler();
  }, []);

  console.log(data);

  return (
    <div className="h-full overflow-y-scroll p-4">
      {data && data.length > 0 && <NotesNavigation data={data} />}
    </div>
  );
};

export default MobilePage;

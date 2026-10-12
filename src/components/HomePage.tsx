"use client";

import { useState } from "react";
import { Item, ItemsProfileReturn, UserDatabaseProfile } from "../lib/types";
import dynamic from "next/dynamic";

type Home = {
  items: Item[];
  user: UserDatabaseProfile | null;
  profiles: Record<string, ItemsProfileReturn>;
};
// YOU NEED DYNAMIC TO STOP SERVER SIDE RENDERING. Leaflet relies heavily on window stuff, so this helps reduce any bugs that may occur
const CampusMap = dynamic(() => import("@/src/ui/CampusMap"), {
  ssr: false,
});

export default function Home({ items, user, profiles }: Home) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
// For readability, this is just the payload needed to pass as props to CampusMap
  const campusMapPropsPayload = {
    items,
    user,
    isModalOpen,
    setIsModalOpen,
    selectedItem,
    setSelectedItem,
    profiles
  };

  return (
    <div className="flex flex-col gap-2 h-[calc(100vh-75px)]">
      <CampusMap {...campusMapPropsPayload} />
    </div>
  );
}
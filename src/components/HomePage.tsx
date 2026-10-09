"use client";

import { useState } from "react";
import { Item } from "../lib/types";
import dynamic from "next/dynamic";

type Home = {
  items: Item[];
  isUser: boolean;
};

const CampusMap = dynamic(() => import("@/src/ui/CampusMap"), {
  ssr: false,
});

export default function Home({ items, isUser }: Home) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const campusMapPropsPayload = {
    items,
    isUser,
    isModalOpen,
    setIsModalOpen,
    selectedItem,
    setSelectedItem,
  };

  return (
    <div className="flex flex-col gap-2 h-[calc(100vh-75px)]">
      <CampusMap {...campusMapPropsPayload} />
    </div>
  );
}
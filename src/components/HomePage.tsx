"use client"
import { useState } from "react";
import { Item } from "../lib/types";
import dynamic from "next/dynamic";
type Home = {
  items: Item[]
  isUser: boolean
}
// Dynamic IS NEEDED for react-leaflet to render correctly. Docs are embedded directly when you hover dynamics but it is needed for DOM stuff
const CampusMap = dynamic(() => import("@/src/ui/CampusMap"), {
  ssr: false,
});

export default function Home({items, isUser} : Home) {
  // This stores the item that was clicked.
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // Destruct when passing to component
  const campusMapPropsPayload = {items, isUser, isModalOpen, setIsModalOpen}
  return (
    // Specifically h-calc because of nav bar
    <div className = "flex flex-col gap-2 h-[calc(100vh-75px)]">
          <CampusMap {...campusMapPropsPayload}/>
    </div>
  );
}
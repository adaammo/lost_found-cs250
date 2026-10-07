"use client";

// DO NOT REMOVE. map styling does not work without this import
import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Item } from "../lib/types";
import MapPinControl from "./MapControlPin";
import { customMarker } from "../lib/constants";
import { EllipsisVertical, MapPin, X } from "lucide-react"
import { SetStateAction, useState } from "react";
import { AnimatePresence, easeInOut, motion } from "motion/react";
import Image from "next/image";
// From google 
const SDSU_CENTER: [number, number] = [32.7757, -117.0719];
type CampusMapProps = {
    items: Item[],
    isUser: boolean
    isModalOpen: boolean
    setIsModalOpen: React.Dispatch<SetStateAction<boolean>>
    isItemModalOpen: boolean
    setIsItemModalOpen: React.Dispatch<SetStateAction<boolean>>
}
// isUser is not used for now but once user account creating exists, we can intregrate it
export default function CampusMap({ items, isUser, isModalOpen, setIsModalOpen, isItemModalOpen, setIsItemModalOpen }: CampusMapProps) {
    const [filter, setFilter] = useState<"all" | "lost" | "found">("all")
    const [itemFormData, setItemFormData] = useState<Item>({
        id: "",
        item_name: "",
        item_description: "",
        item_type: "lost",
        image_url: null,
        longitude: 0,
        latitude: 0,
        resolved: false,
        created_at: new Date().toISOString(),
    });
    return (
        <div className="h-full w-full relative rounded-md">
            <MapContainer
                center={SDSU_CENTER}
                zoom={16}
                scrollWheelZoom={true}
                className="h-full w-full rounded-md"
            >
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {items.map((i) => (
                    <Marker
                        key={i.id}
                        position={[i.longitude, i.latitude]}
                        icon={customMarker(i)}
                    >
                        <Popup>
                            {i.item_name}
                        </Popup>
                    </Marker>
                ))}
                <MapPinControl />
            </MapContainer>
            <AnimatePresence>
                {isModalOpen ? (
                    <motion.div
                        // STOP LEAFLET INTERACTIONS.
                        key="modal"
                        onClick={(e) => e.stopPropagation()}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: easeInOut }}
                        className="flex flex-col gap-4 absolute p-2 bg-(--bg-secondary) min-w-[35%] z-1000 w-fit top-4 bottom-4 right-4 rounded-md">
                        <div className="flex w-full items-center justify-between">
                            <h2 className="font-black tracking-wide">
                                Recent items
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-(--btn-secondary) rounded-md cursor-pointer hover:bg-(--btn-secondary-hover) border border-(--border) p-2">
                                <X size={15} strokeWidth={4} />
                            </button>
                        </div>
                        <div
                            className="flex flex-row items-center justify-start gap-2">
                            {["All", "Lost", "Found"].map((f) => (
                                <button
                                    key={f}
                                    onClick = {() => setFilter(f.toLowerCase() as "all" | "lost" | "found")}
                                    className={`rounded-xl ${filter === f.toLowerCase() ? "bg-(--btn-primary)" : "bg-(--btn-secondary)"} px-3 py-1 cursor-pointer`}>
                                    {f}
                                </button>
                            ))}
                        </div>

                        <div className="h-full gap-5 overflow-y-scroll flex flex-col">
                            {items.map((i) => {
                                const trueDate = new Date(i.created_at).toLocaleDateString()
                                if(filter !== "all"){
                                    if(i.item_type !== filter){
                                        return
                                    }
                                }
                                return (
                                    <div
                                        key={i.id}
                                        className="flex items-center justify-between w-full gap-2 shrink-0 hover:bg-(--bg-tertiary)">
                                        <div className="flex items-center justify-center gap-2">
                                            <Image
                                                src="/blank_pfp.png"
                                                alt="Profile Picture"
                                                height={40}
                                                width={40}
                                                className="object-contain rounded-full border border-(--border-stronger) shrink-0" />
                                            <div className="flex flex-col items-start justify-center gap-1">
                                                <p className="font-semibold text-sm">
                                                    {i.item_name}
                                                </p>
                                                <p className="text-blue-400 text-xs text-wrap max-w-lg">
                                                    Posted on {trueDate}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={`${i.resolved ? "bg-green-600" : "bg-(--btn-primary)"} px-2 py-2 text-xs font-bold rounded-md `}>
                                            {i.item_type.toLocaleUpperCase()}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </motion.div>
                ) : (
                    <motion.button
                        key="open-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: easeInOut }}
                        onClick={() => setIsModalOpen(true)}
                        className="bg-(--btn-primary) absolute z-1000 right-4 top-4 px-2 py-2 border border-(--border) rounded-md">
                        <EllipsisVertical size={15} strokeWidth={4} />
                    </motion.button>
                )}
            </AnimatePresence>


            <AnimatePresence>
                {isItemModalOpen ? (
                    <motion.div
                        key="item-modal"
                        onClick={(e) => e.stopPropagation()}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: easeInOut }}
                        className="absolute bottom-4 left-4 z-[1000] max-h-[calc(100%-2rem)] w-[400px] bg-black bg-opacity-50 overflow-y-auto flex flex-col gap-4 p-4"
                    >
                        <div className="bg-(--bg-primary) rounded-md p-4 max-w-md w-full">
                            <h2 className="text-lg font-bold mb-2">
                                Create Item Report
                            </h2>
                        </div>

                        <div className="flex flex-col gap-1">   
                            <label htmlFor="item-name" className="font-semibold">
                                Item name:
                            </label>

                            <input
                                type="text"
                                id="item-name"
                                value={itemFormData.item_name}
                                onChange={(e) => setItemFormData({ ...itemFormData, item_name: e.target.value })}
                                className="bg-white text-black border border--(border) rounded-md p-2"
                            />    
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="item-description" className="font-semibold">
                                Item description:
                            </label>
                            <textarea
                                id="item-description"
                                value={itemFormData.item_description}
                                onChange={(e) => setItemFormData({ ...itemFormData, item_description: e.target.value })}
                                className="bg-white text-black border border--(border) rounded-md p-2"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="latitude" className="font-semibold">
                                Latitude:
                            </label>
                            <input
                                type="number"
                                id="latitude"
                                value={itemFormData.latitude}
                                onChange={(e) => setItemFormData({ ...itemFormData, latitude: parseFloat(e.target.value) })}
                                className="bg-white text-black border border--(border) rounded-md p-2"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="longitude" className="font-semibold">
                                Longitude:
                            </label>
                            <input
                                type="number"
                                id="longitude"
                                value={itemFormData.longitude}
                                onChange={(e) => setItemFormData({ ...itemFormData, longitude: parseFloat(e.target.value) })}
                                className="bg-white text-black border border--(border) rounded-md p-2"
                            />
                        </div>

                        <div className="flex flex-row items-center justify-end gap-2 mt-4">
                            <button    
                                type = "button"
                                onClick = {() => setIsItemModalOpen(!isItemModalOpen)}
                                className = "bg-(--bg-secondary) text-(--text-primary) rounded-md px-4 py-2"
                                aria-label="Close Item Report Modal"
                            >
                                Close
                            </button>   

                        <button type="submit" className="bg-(--btn-primary) text-white rounded-md p-2 w-fit self-center mt-4">    
                            Submit Report
                        </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.button
                        key="open-item-modal"
                        type="button"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: easeInOut }}
                        onClick={() => setIsItemModalOpen(true)}
                        className="bg-(--btn-primary) absolute bottom-4 left-4 z-[1000] px-2 py-2 border border-(--border) rounded-md"
                        >
                        Create Item Report
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
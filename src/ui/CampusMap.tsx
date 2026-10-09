"use client";

// DO NOT REMOVE. map styling does not work without this import
import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Item } from "../lib/types";
import MapPinControl from "./MapControlPin";
import { customMarker } from "../lib/constants";

import {
  ArrowLeft,
  CalendarDays,
  EllipsisVertical,
  Mail,
  MapPin,
  X,
} from "lucide-react";

import { Dispatch, SetStateAction, useState } from "react";
import { AnimatePresence, easeInOut, motion } from "motion/react";
import Image from "next/image";

const SDSU_CENTER: [number, number] = [32.7757, -117.0719];

type CampusMapProps = {
  items: Item[];
  isUser: boolean;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  selectedItem: Item | null;
  setSelectedItem: Dispatch<SetStateAction<Item | null>>;
};

export default function CampusMap({
  items,
  isUser,
  isModalOpen,
  setIsModalOpen,
  selectedItem,
  setSelectedItem,
}: CampusMapProps) {
  const [filter, setFilter] =
    useState<"all" | "lost" | "found">("all");

  // Filter the items shown in Recent Items
  const filteredItems = items.filter((item) => {
    if (filter === "all") {
      return true;
    }

    return item.item_type === filter;
  });

  // Open selected item inside the SAME right-side panel
  const openItemDetails = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Go from Item Details back to Recent Items
  const backToItems = () => {
    setSelectedItem(null);
  };

  // Close the entire right-side panel
  const closePanel = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  return (
    <div className="h-full w-full relative rounded-md">
      {/* ====================== MAP ====================== */}

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

        {/* Clicking a marker directly opens Item Details */}
        {items.map((item) => (
          <Marker
            key={item.id}
            position={[item.longitude, item.latitude]}
            icon={customMarker(item)}
            eventHandlers={{
              click: () => {
                openItemDetails(item);
              },
            }}
          />
        ))}

        <MapPinControl />
      </MapContainer>

      {/* ================= RIGHT SIDE PANEL ================= */}

      <AnimatePresence>
        {isModalOpen ? (
          <motion.div
            key="right-panel"
            onClick={(e) => e.stopPropagation()}
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: 20,
            }}
            transition={{
              duration: 0.25,
              ease: easeInOut,
            }}
            className="
              absolute
              z-1000
              top-4
              bottom-4
              right-4
              w-[36%]
              min-w-[380px]
              max-w-[520px]
              bg-(--bg-secondary)
              rounded-md
              shadow-xl
              overflow-hidden
              flex
              flex-col
            "
          >
            {/* ================================================= */}
            {/* VIEW 1: RECENT ITEMS                               */}
            {/* ================================================= */}

            {!selectedItem && (
              <>
                {/* HEADER */}
                <div className="flex items-center justify-between p-4">
                  <h2 className="font-black tracking-wide text-xl">
                    Recent Items
                  </h2>

                  <button
                    onClick={closePanel}
                    className="
                      bg-(--btn-secondary)
                      border
                      border-(--border)
                      rounded-md
                      p-2
                      cursor-pointer
                      hover:bg-(--btn-secondary-hover)
                    "
                  >
                    <X size={16} strokeWidth={4} />
                  </button>
                </div>

                {/* FILTER BUTTONS */}
                <div className="flex gap-2 px-4 pb-4">
                  {["All", "Lost", "Found"].map((f) => (
                    <button
                      key={f}
                      onClick={() =>
                        setFilter(
                          f.toLowerCase() as
                            | "all"
                            | "lost"
                            | "found"
                        )
                      }
                      className={`
                        rounded-xl
                        px-3
                        py-1
                        cursor-pointer
                        ${
                          filter === f.toLowerCase()
                            ? "bg-(--btn-primary)"
                            : "bg-(--btn-secondary)"
                        }
                      `}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                {/* RECENT ITEM LIST */}
                <div className="flex flex-col gap-2 overflow-y-auto px-4 pb-4">
                  {filteredItems.map((item) => {
                    const date = new Date(
                      item.created_at
                    ).toLocaleDateString();

                    return (
                      <button
                        key={item.id}
                        onClick={() => openItemDetails(item)}
                        className="
                          flex
                          items-center
                          justify-between
                          gap-4
                          w-full
                          p-3
                          rounded-md
                          text-left
                          cursor-pointer
                          hover:bg-(--bg-tertiary)
                          transition
                        "
                      >
                        {/* NO ITEM IMAGE */}
                        <div className="flex flex-col gap-1">
                          <p className="font-semibold text-sm">
                            {item.item_name}
                          </p>

                          <p className="text-blue-400 text-xs">
                            Posted on {date}
                          </p>
                        </div>

                        {/* ITEM STATUS */}
                        <span
                          className={`
                            px-2
                            py-2
                            rounded-md
                            text-xs
                            font-bold
                            ${
                              item.resolved
                                ? "bg-green-600"
                                : "bg-(--btn-primary)"
                            }
                          `}
                        >
                          {item.resolved
                            ? "RESOLVED"
                            : item.item_type.toUpperCase()}
                        </span>
                      </button>
                    );
                  })}

                  {filteredItems.length === 0 && (
                    <div className="flex items-center justify-center p-8">
                      <p className="text-sm text-gray-400">
                        No items found.
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* ================================================= */}
            {/* VIEW 2: SELECTED ITEM DETAILS                      */}
            {/* ================================================= */}

            {selectedItem && (
              <div className="flex flex-col h-full overflow-y-auto">
                {/* DETAILS HEADER */}
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    p-4
                    border-b
                    border-(--border)
                  "
                >
                  <div className="flex items-center gap-3">
                    {/* BACK BUTTON */}
                    <button
                      onClick={backToItems}
                      className="
                        bg-(--btn-secondary)
                        border
                        border-(--border)
                        rounded-md
                        p-2
                        cursor-pointer
                        hover:bg-(--btn-secondary-hover)
                      "
                    >
                      <ArrowLeft size={18} />
                    </button>

                    <h2 className="font-black text-xl">
                      Item Details
                    </h2>
                  </div>

                  {/* CLOSE BUTTON */}
                  <button
                    onClick={closePanel}
                    className="
                      bg-(--btn-secondary)
                      border
                      border-(--border)
                      rounded-md
                      p-2
                      cursor-pointer
                      hover:bg-(--btn-secondary-hover)
                    "
                  >
                    <X size={17} />
                  </button>
                </div>

                {/* DETAILS CONTENT */}
                <div className="flex flex-col gap-6 p-5">
                  {/* ========================================== */}
                  {/* USER INFORMATION SKELETON                  */}
                  {/* ========================================== */}

                  <div>
                    <p
                      className="
                        text-xs
                        font-bold
                        uppercase
                        tracking-wide
                        text-gray-400
                        mb-2
                      "
                    >
                      Posted By
                    </p>

                    <div
                      className="
                        bg-(--bg-tertiary)
                        border
                        border-(--border)
                        rounded-lg
                        p-4
                      "
                    >
                      {/* USER */}
                      <div className="flex items-center gap-3">
                        {/* This is ONLY the user's profile picture */}
                        <Image
                          src="/blank_pfp.png"
                          alt="Default User Profile"
                          width={52}
                          height={52}
                          className="
                            h-[52px]
                            w-[52px]
                            rounded-full
                            object-cover
                            border
                            border-(--border)
                          "
                        />

                        <div>
                          <p className="font-bold">
                            default_user
                          </p>

                          <p className="text-xs text-gray-400">
                            SDSU User
                          </p>
                        </div>
                      </div>

                      {/* CONTACT INFORMATION */}
                      <div
                        className="
                          mt-4
                          pt-3
                          border-t
                          border-(--border)
                        "
                      >
                        <p
                          className="
                            text-xs
                            font-bold
                            uppercase
                            tracking-wide
                            text-gray-400
                            mb-2
                          "
                        >
                          Contact Information
                        </p>

                        <div className="flex items-center gap-2">
                          <Mail
                            size={16}
                            className="text-gray-400"
                          />

                          <p className="text-sm text-gray-300">
                            Contact information coming soon
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ========================================== */}
                  {/* ITEM NAME                                  */}
                  {/* ========================================== */}

                  <div>
                    <p
                      className="
                        text-xs
                        font-bold
                        uppercase
                        tracking-wide
                        text-gray-400
                        mb-1
                      "
                    >
                      Item
                    </p>

                    <h3 className="text-2xl font-black">
                      {selectedItem.item_name}
                    </h3>
                  </div>

                  {/* ========================================== */}
                  {/* STATUS + DATE                              */}
                  {/* ========================================== */}

                  <div className="flex items-center justify-between">
                    <span
                      className={`
                        rounded-md
                        px-3
                        py-1
                        text-xs
                        font-bold
                        ${
                          selectedItem.resolved
                            ? "bg-green-600"
                            : "bg-(--btn-primary)"
                        }
                      `}
                    >
                      {selectedItem.resolved
                        ? "RESOLVED"
                        : selectedItem.item_type.toUpperCase()}
                    </span>

                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <CalendarDays size={15} />

                      {new Date(
                        selectedItem.created_at
                      ).toLocaleDateString()}
                    </div>
                  </div>

                  {/* ========================================== */}
                  {/* DESCRIPTION                                */}
                  {/* ========================================== */}

                  <div>
                    <p
                      className="
                        text-xs
                        font-bold
                        uppercase
                        tracking-wide
                        text-gray-400
                        mb-2
                      "
                    >
                      Description
                    </p>

                    <p className="text-sm leading-6">
                      {selectedItem.item_description ||
                        "No description was provided for this item."}
                    </p>
                  </div>

                  {/* ========================================== */}
                  {/* LOCATION                                   */}
                  {/* ========================================== */}

                  <div>
                    <p
                      className="
                        text-xs
                        font-bold
                        uppercase
                        tracking-wide
                        text-gray-400
                        mb-2
                      "
                    >
                      Location
                    </p>

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        bg-(--bg-tertiary)
                        rounded-md
                        p-3
                      "
                    >
                      <MapPin size={17} />

                      <p className="text-sm">
                        {selectedItem.latitude.toFixed(5)},{" "}
                        {selectedItem.longitude.toFixed(5)}
                      </p>
                    </div>
                  </div>

                  {/* ========================================== */}
                  {/* BACK TO ITEMS                              */}
                  {/* ========================================== */}

                  <button
                    onClick={backToItems}
                    className="
                      w-full
                      bg-(--btn-primary)
                      rounded-md
                      py-3
                      font-bold
                      cursor-pointer
                      hover:opacity-90
                    "
                  >
                    Back to Items
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          /* ================= THREE DOT BUTTON ================= */

          <motion.button
            key="open-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.25,
              ease: easeInOut,
            }}
            onClick={() => {
              setSelectedItem(null);
              setIsModalOpen(true);
            }}
            className="
              bg-(--btn-primary)
              absolute
              z-1000
              right-4
              top-4
              px-2
              py-2
              border
              border-(--border)
              rounded-md
              cursor-pointer
            "
          >
            <EllipsisVertical
              size={15}
              strokeWidth={4}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
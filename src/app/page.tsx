"use client";

import { useState } from "react";

export type Item = {
  id: string;
  item_name: string;
  item_description: string;
  item_type: "lost" | "found";
  image_url: string | null;
  longitude: number;
  latitude: number;
  resolved: boolean;
  created_at: string;
};

// Fake data for now
const fakeItems: Item[] = [
  {
    id: "1",
    item_name: "Black Backpack",
    item_description: "Black Jansport backpack with a blue keychain.",
    item_type: "lost",
    image_url: null,
    longitude: -117.0719,
    latitude: 32.7757,
    resolved: false,
    created_at: "2026-09-22T09:30:00Z",
  },
  {
    id: "2",
    item_name: "Student ID Card",
    item_description: "SDSU student ID found near the library.",
    item_type: "found",
    image_url: null,
    longitude: -117.0742,
    latitude: 32.7753,
    resolved: false,
    created_at: "2026-09-21T15:10:00Z",
  },
  {
    id: "3",
    item_name: "Blue Water Bottle",
    item_description: "Blue metal water bottle left in a classroom.",
    item_type: "lost",
    image_url: null,
    longitude: -117.0735,
    latitude: 32.7761,
    resolved: false,
    created_at: "2026-09-20T12:45:00Z",
  },
];

export default function Home() {
  // This stores the item that was clicked.
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <main className="min-h-screen bg-[#222222] p-6 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">
          Lost and Found
        </h1>

        <p className="mb-8 text-gray-400">
          Click an item to see more information.
        </p>

        {/* Item pills */}
        <div className="flex flex-col gap-3">
          {fakeItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="w-fit cursor-pointer rounded-full bg-white px-5 py-3 text-gray-900 shadow hover:bg-gray-200"
            >
              <p className="font-bold">
                {item.item_name}
              </p>

              <p className="text-sm text-gray-600">
                {item.item_description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Popup modal */}
      {selectedItem !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 p-6">
          <div className="w-full max-w-md rounded-lg bg-white p-6 text-gray-900">
            <h2 className="text-2xl font-bold">
              {selectedItem.item_name}
            </h2>

            <p className="mt-2 text-gray-600">
              Owner: FAKE_NAME
            </p>

            <p className="mt-4">
              {selectedItem.item_description}
            </p>

            <p className="mt-3">
              <strong>Type:</strong> {selectedItem.item_type}
            </p>

            <p className="mt-2">
              <strong>Item ID:</strong> {selectedItem.id}
            </p>

            <p className="mt-2">
              <strong>Resolved:</strong>{" "}
              {selectedItem.resolved ? "Yes" : "No"}
            </p>

            <button
              onClick={() => setSelectedItem(null)}
              className="mt-6 rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
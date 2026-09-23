"use client";

import { useEffect, useState } from "react";
import { Item } from "../lib/types";


export default function Home() {
  // This stores the item that was clicked.
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [Items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function loadItems() {
      const items = await fetchItems();
      setItems(items);
    }

    loadItems();
  }, []);

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
        <div className="flex flex-row gap-3">
          {Items.map((item) => (
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

type ItemsResponse = {
  items: Item[];
};

async function fetchItems() {
  const response = await fetch("http://localhost:8000/api/items");

  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }

  const data: ItemsResponse = await response.json();
  return data.items;
}
import Image from "next/image";
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

// Temporary data for the first version of the page.
// This will be replaced with data from the backend later.
const fakeItems: Item[] = [
  {
    id: "1",
    item_name: "Black backpack",
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
    item_name: "Student ID card",
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
    item_name: "Blue water bottle",
    item_description: "Blue metal water bottle left in a classroom.",
    item_type: "lost",
    image_url: null,
    longitude: -117.0735,
    latitude: 32.7761,
    resolved: false,
    created_at: "2026-09-20T12:45:00Z",
  },
];

const filterPills = ["All items", "Lost", "Found"];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">
            SDSU Lost & Found
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Find what you are looking for
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Browse recent lost and found items around campus.
          </p>
        </div>

        {/* Temporary pill row. These will become interactive filters later. */}
        <div className="mb-8 flex flex-wrap gap-3">
          {filterPills.map((pill, index) => (
            <div
              key={pill}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm ${
                index === 0
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-slate-700 ring-1 ring-slate-200"
              }`}
            >
              {pill}
            </div>
          ))}
        </div>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Recent items</h2>
            <span className="text-sm text-slate-500">Temporary sample data</span>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {fakeItems.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                      item.item_type === "lost"
                        ? "bg-rose-100 text-rose-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {item.item_type}
                  </span>
                  <span className="text-xs text-slate-400">#{item.id}</span>
                </div>
                <h3 className="text-lg font-bold">{item.item_name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.item_description}
                </p>
                <p className="mt-4 text-xs text-slate-400">
                  Campus location: {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
import L from "leaflet";
import { Item } from "./types";

export const customMarker = (item?: Item | null) => L.icon({
        iconUrl: (item && (item.resolved ? "/green-pin.svg" : "/red-pin.svg")) ?? "/selected-pin.svg",
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41]
      });

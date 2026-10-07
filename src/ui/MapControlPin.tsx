"use client"
import { Marker, useMapEvents } from "react-leaflet";
import { PinPosition } from "../lib/types";
import { useState } from "react";
import { customMarker } from "../lib/constants";

export default function MapPinControl() {
    const [position, setPosition] = useState<PinPosition | null>(null)
    useMapEvents({
        click: (e) => {
            const { lat, lng } = e.latlng;
            setPosition({
                lat,
                lng
            })
        },
    })
    if (!position) {
        return null;
    }
    return (
        <Marker
            position={[position.lat, position.lng]}
            icon={customMarker()}
        />
    )
}
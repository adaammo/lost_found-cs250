"use client"
import { Marker, useMapEvents } from "react-leaflet";
import { PinPosition } from "../lib/types";
import { useState } from "react";
import { customMarker } from "../lib/constants";

type MapPinControlProps = {
    onPositionSelect: (position: PinPosition) => void;
};

export default function MapPinControl({ onPositionSelect }: MapPinControlProps) {
    const [position, setPosition] = useState<PinPosition | null>(null)
    useMapEvents({
        click: (e) => {
            const { lat, lng } = e.latlng;
            const newPosition: PinPosition = { lat, lng };
            
            setPosition(newPosition);

            onPositionSelect(newPosition);
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
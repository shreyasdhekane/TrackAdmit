// components/university/MapClient.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useTheme } from "next-themes";

interface MapClientProps {
  position: [number, number];
  name: string;
  city: string;
  country: string;
}

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapClient({
  position,
  name,
  city,
  country,
}: MapClientProps) {
  const { theme } = useTheme();
  const tileLayerUrl =
    theme === "dark"
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png";

  const attribution =
    theme === "dark"
      ? '&copy; <a href="https://carto.com/">CARTO</a>'
      : '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors';
  return (
    <MapContainer
      center={position}
      zoom={12}
      style={{ height: "300px", width: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer url={tileLayerUrl} attribution={attribution} />
      <Marker position={position} icon={markerIcon}>
        <Popup>
          <strong>{name}</strong>
          <br />
          {city}, {country}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

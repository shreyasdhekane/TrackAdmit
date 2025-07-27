"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent } from "@/components/ui/card";

const DynamicMap = dynamic(() => import("@/components/university/MapClient"), {
  ssr: false,
  loading: () => (
    <div className="p-4 text-center text-sm text-muted-foreground">
      ⏳ Loading map...
    </div>
  ),
});

interface UniversityMapProps {
  city: string;
  country: string;
  name: string;
}

export function UniversityMap({ city, country, name }: UniversityMapProps) {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCoords = async () => {
      const query = encodeURIComponent(`${city}, ${country}`);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${query}&format=json`,
        );
        const data = await res.json();
        if (data?.length) {
          setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      }
    };

    fetchCoords();
  }, [city, country]);

  return (
    <Card className="border border-border shadow-sm rounded-2xl overflow-hidden">
      <CardContent className="p-0">
        {error ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            🌍 Oops! Couldn't locate <strong>{name}</strong> in{" "}
            <strong>
              {city}, {country}
            </strong>
            .
          </div>
        ) : !position ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            ⏳ Loading map for <strong>{name}</strong>...
          </div>
        ) : (
          <DynamicMap
            position={position}
            name={name}
            city={city}
            country={country}
          />
        )}
      </CardContent>
    </Card>
  );
}

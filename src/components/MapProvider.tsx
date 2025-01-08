// "use client";

// import { useState, useEffect, ReactNode } from "react";
// import { GoogleMap, LoadScript } from "@react-google-maps/api";

// interface MapProviderProps {
//   children: ReactNode;
// }

// export function MapProvider({ children }: MapProviderProps) {
//   const [mapData, setMapData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchMapData = async () => {
//       try {
//         // Fetch data from our server-side API (this will not expose the API key to the client)
//         const response = await fetch(
//           "/api/maps?type=geocode&params=1600+Amphitheatre+Parkway,+Mountain+View,+CA"
//         );
//         const data = await response.json();

//         if (response.ok) {
//           setMapData(data);
//         } else {
//           setError("Failed to load map data");
//         }
//       } catch (err) {
//         setError("Error fetching data from the server");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMapData();
//   }, []);

//   if (loading) return <p>Loading map...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <GoogleMap
//       mapContainerStyle={{ width: "100%", height: "400px" }}
//       center={{
//         lat: mapData?.results[0]?.geometry?.location?.lat || 0,
//         lng: mapData?.results[0]?.geometry?.location?.lng || 0,
//       }}
//       zoom={14}
//     >
//       {/* You can add markers, circles, etc. */}
//       {children}
//     </GoogleMap>
//   );
// }

// "use client";

// import { ReactNode, useState, useEffect } from "react";
// import { GoogleMap } from "@react-google-maps/api";

// interface MapProviderProps {
//   children: ReactNode;
// }

// export function MapProvider({ children }: MapProviderProps) {
//   const [mapData, setMapData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchMapData = async () => {
//       try {
//         const response = await fetch(
//           "/api/maps?type=geocode&params=1600+Amphitheatre+Parkway,+Mountain+View,+CA"
//         );
//         const data = await response.json();

//         if (response.ok) {
//           setMapData(data);
//         } else {
//           setError("Failed to load map data");
//         }
//       } catch (err) {
//         setError("Error fetching data from the server");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMapData();
//   }, []);

//   if (loading) return <p>Loading map...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <GoogleMap
//       mapContainerStyle={{ width: "100%", height: "400px" }}
//       center={{
//         lat: mapData?.results[0]?.geometry?.location?.lat || 0,
//         lng: mapData?.results[0]?.geometry?.location?.lng || 0,
//       }}
//       zoom={14}
//     >
//       {/* Any child components or markers would go here */}
//       {children}
//     </GoogleMap>
//   );
// }

"use client";

import { ReactNode, useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Libraries } from "@react-google-maps/api";

interface MapProviderProps {
  children: ReactNode;
}

const libraries: Libraries = ["places", "geometry", "drawing"];

export function MapProvider({ children }: MapProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<Error | null>(null);

  // Load the Google Maps JavaScript API with the key from server-side environment
  const { isLoaded: scriptLoaded, loadError: scriptLoadError } = useJsApiLoader(
    {
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string, // This is your public key
      libraries, // Additional libraries you want to load
    }
  );

  // Handle script load error
  useEffect(() => {
    if (scriptLoaded) {
      setIsLoaded(true);
    } else if (scriptLoadError) {
      setLoadError(scriptLoadError);
    }
  }, [scriptLoaded, scriptLoadError]);

  // Show loading message while script is loading
  if (loadError) return <p>Error loading Google Maps</p>;
  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "400px" }}
      center={{ lat: 37.7749, lng: -122.4194 }} // Default location
      zoom={10}
    >
      {children}
    </GoogleMap>
  );
}

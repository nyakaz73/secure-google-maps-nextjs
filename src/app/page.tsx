import { MapProvider } from "@/components/MapProvider";
import Image from "next/image";

export default function Home() {
  return (
    <MapProvider>
      {/* Optional: You don't have to include anything here */}
      <div></div>
    </MapProvider>
  );
}

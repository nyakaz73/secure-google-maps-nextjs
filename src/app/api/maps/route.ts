// import { NextResponse } from "next/server";

// // The handler for the API route
// export async function GET(request: Request) {
//   console.log("Server side Request received:", request);
//   const { searchParams } = new URL(request.url);
//   const type = searchParams.get("type");
//   const params = searchParams.get("params");

//   if (!type || !params) {
//     return NextResponse.json(
//       { error: "Missing type or params query parameter" },
//       { status: 400 }
//     );
//   }

//   try {
//     const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

//     // Base URL for Google Maps API
//     const apiUrl = "https://maps.googleapis.com/maps/api";

//     // Construct the appropriate API URL based on type
//     let url = "";
//     switch (type) {
//       case "geocode":
//         url = `${apiUrl}/geocode/json?address=${encodeURIComponent(
//           params
//         )}&key=${googleMapsApiKey}`;
//         break;

//       case "places":
//         url = `${apiUrl}/place/nearbysearch/json?location=${encodeURIComponent(
//           params
//         )}&key=${googleMapsApiKey}`;
//         break;

//       default:
//         return NextResponse.json(
//           { error: "Unsupported type" },
//           { status: 400 }
//         );
//     }

//     // Fetch data from Google Maps API
//     const response = await fetch(url);
//     const data = await response.json();

//     if (!response.ok) {
//       return NextResponse.json(data, { status: response.status });
//     }

//     // Return data to the client
//     console.log("Fetched data from Google Maps API:", data);
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("Error fetching from Google Maps API:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

// src/app/api/maps/route.ts

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type"); // 'geocode', 'places', etc.
  const params = searchParams.get("params"); // Address or coordinates

  if (!type || !params) {
    return NextResponse.json(
      { error: "Missing type or params query parameter" },
      { status: 400 }
    );
  }

  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!googleMapsApiKey) {
    return NextResponse.json(
      { error: "Google Maps API key not configured" },
      { status: 500 }
    );
  }

  try {
    const apiUrl = `https://maps.googleapis.com/maps/api/${type}/json?key=${googleMapsApiKey}&${
      type === "geocode"
        ? `address=${encodeURIComponent(params)}`
        : `location=${encodeURIComponent(params)}`
    }`;

    // Fetch data from Google Maps API
    const response = await fetch(apiUrl);

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data from Google Maps API:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

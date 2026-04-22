"use client";
import React, { useEffect, useRef, useState } from "react";

interface MapComponentProps {
  location?: { lat: number; lng: number };
  searchQuery?: string;
  onLocationSelect?: (location: string) => void;
  mapHeight?: string;
  mapWrapperClassName?: string;
}

// Hook to dynamically load Google Maps
function useGoogleMaps() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Check if Google Maps is already loaded
    if (typeof window !== "undefined" && window.google?.maps) {
      setIsLoaded(true);
      return;
    }

    // Get API key from environment
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API;
    console.log("API KET IS", process.env.NEXT_PUBLIC_GOOGLE_MAPS_API);
    if (!apiKey) {
      setError("Google Maps API key not found in environment variables");
      return;
    }

    // Create and load script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log("Google Maps API loaded successfully");
      setIsLoaded(true);
    };

    script.onerror = () => {
      setError("Failed to load Google Maps API");
    };

    document.head.appendChild(script);

    // Cleanup
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return { isLoaded, error };
}

export default function MapComponent({
  location,
  searchQuery,
  mapWrapperClassName = "",
  mapHeight = "h-96",
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markerInstance = useRef<google.maps.Marker | null>(null);

  // Use the hook to load Google Maps
  const { isLoaded, error } = useGoogleMaps();

  // Initialize map when Google Maps is loaded
  useEffect(() => {
    if (
      !isLoaded ||
      !mapRef.current ||
      typeof window === "undefined" ||
      !window.google?.maps
    )
      return;

    console.log("Initializing Google Map");

    // Create map with default center (Brisbane, Australia)
    mapInstance.current = new google.maps.Map(mapRef.current, {
      center: { lat: -27.4698, lng: 153.0251 }, // Brisbane, Australia
      zoom: 13,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      gestureHandling: "greedy",
    });
  }, [isLoaded]);

  // Update map when location changes
  useEffect(() => {
  if (
    !isLoaded ||
    !mapInstance.current ||
    !location ||
    typeof window === "undefined" ||
    !window.google?.maps
  )
    return;

  if (markerInstance.current) {
    markerInstance.current.setMap(null);
  }

  mapInstance.current.setCenter(location);
  mapInstance.current.setZoom(15);

  markerInstance.current = new google.maps.Marker({
    position: location,
    map: mapInstance.current,
    title: "Provider Location",
  });
}, [isLoaded, location]);

  // Search for location when searchQuery changes
  useEffect(() => {
    if (
      !isLoaded ||
      !mapInstance.current ||
      !searchQuery ||
      !searchQuery.trim() ||
      typeof window === "undefined" ||
      !window.google?.maps
    )
      return;

    console.log("Searching for location:", searchQuery);

    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: searchQuery }, (results, status) => {
      if (status === "OK" && results?.[0]) {
        const newLocation = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        };

        console.log("Found location:", newLocation);

        // Remove existing marker
        if (markerInstance.current) {
          markerInstance.current.setMap(null);
        }

        // Update map center and zoom
        if (mapInstance.current) {
          mapInstance.current.setCenter(newLocation);
          mapInstance.current.setZoom(15);

          // Add new marker
          markerInstance.current = new google.maps.Marker({
            position: newLocation,
            map: mapInstance.current,
            title: searchQuery,
          });
        }
      } else {
        console.error("Geocoding failed:", status);
      }
    });
  }, [isLoaded, searchQuery]);

  // Show error if Google Maps failed to load
  if (error) {
    return (
      <div className={`w-full ${mapWrapperClassName}`}>
        <div
          className={`${mapHeight} bg-red-50 rounded-3xl border-2 border-red-200 flex items-center justify-center`}
        >
          <div className="text-center p-6">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h3 className="text-red-800 font-semibold mb-2">
              Map Loading Error
            </h3>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Show loading while Google Maps is loading
  if (!isLoaded) {
    return (
      <div className={`w-full ${mapWrapperClassName}`}>
        <div
          className={`${mapHeight} bg-gray-100 rounded-3xl flex items-center justify-center`}
        >
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading Google Maps...</p>
          </div>
        </div>
      </div>
    );
  }

  // Render the map
  return (
    <div className={`w-full ${mapWrapperClassName}`}>
      <div
        className={`${mapHeight} bg-gray-200 rounded-3xl overflow-hidden shadow-lg`}
      >
        <div ref={mapRef} className="w-full h-full" />
      </div>
    </div>
  );
}

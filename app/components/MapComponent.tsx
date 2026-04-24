"use client";

import React, { useEffect, useRef, useState } from "react";
import { ProviderServiceDto } from "../../types/providerService";

interface MapComponentProps {
  providers: ProviderServiceDto[];
  selectedProvider?: ProviderServiceDto;
  userLocation?: { lat: number; lng: number };
  searchQuery?: string;
  onProviderSelect?: (provider: ProviderServiceDto) => void;
  mapHeight?: string;
  mapWrapperClassName?: string;
}

declare global {
  interface Window {
    initGoogleMaps?: () => void;
  }
}

function useGoogleMaps() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

   
    if (typeof window.google?.maps?.Map === "function") {
      setIsLoaded(true);
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API;
    if (!apiKey) {
      setError("Google Maps API key not found in environment variables");
      return;
    }

    const existingScript = document.getElementById(
      "google-maps-script"
    ) as HTMLScriptElement | null;

    if (existingScript) {
      const checkReady = window.setInterval(() => {
        if (typeof window.google?.maps?.Map === "function") {
          window.clearInterval(checkReady);
          setIsLoaded(true);
        }
      }, 100);

      
      window.setTimeout(() => {
        window.clearInterval(checkReady);
        if (typeof window.google?.maps?.Map !== "function") {
          setError("Google Maps API failed to initialize");
        }
      }, 10000);

      return;
    }

    window.initGoogleMaps = () => {
      if (typeof window.google?.maps?.Map === "function") {
        setIsLoaded(true);
      } else {
        setError("Google Maps API loaded but Map constructor is unavailable");
      }
    };

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initGoogleMaps`;
    script.async = true;
    script.defer = true;

    script.onerror = () => {
      setError("Failed to load Google Maps API");
    };

    document.head.appendChild(script);

    return () => {
     
      delete window.initGoogleMaps;
    };
  }, []);

  return { isLoaded, error };
}

export default function MapComponent({
  providers=[],
  selectedProvider,
  userLocation,
  searchQuery,
  onProviderSelect,
  mapWrapperClassName = "",
  mapHeight = "h-96",
}: MapComponentProps) {
  console.log("MAP providers =", providers);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const providerMarkersRef = useRef<Map<string, google.maps.Marker>>(new Map());
  const userMarkerRef = useRef<google.maps.Marker | null>(null);

  const { isLoaded, error } = useGoogleMaps();

  // init map
  useEffect(() => {
    if (
      !isLoaded ||
      !mapRef.current ||
      typeof window === "undefined" ||
      typeof window.google?.maps?.Map !== "function"
    ) {
      return;
    }

    if (mapInstance.current) return;

    mapInstance.current = new window.google.maps.Map(mapRef.current, {
      center: { lat: -37.8136, lng: 144.9631 },
      zoom: 11,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      gestureHandling: "greedy",
    });
  }, [isLoaded]);

  // render all provider markers
  useEffect(() => {
    if (!isLoaded || !mapInstance.current || !window.google?.maps) return;

    providerMarkersRef.current.forEach((marker) => marker.setMap(null));
    providerMarkersRef.current.clear();

    const bounds = new window.google.maps.LatLngBounds();

    console.log("providers =", providers);
    providers.forEach((provider) => {
      const lat = Number((provider as any).latitude ?? (provider as any).lat);
      const lng = Number((provider as any).longitude ?? (provider as any).long);

      if (Number.isNaN(lat) || Number.isNaN(lng)) return;

      const marker = new window.google.maps.Marker({
        position: { lat, lng },
        map: mapInstance.current!,
        title: provider.providerServiceName,
      });

      marker.addListener("click", () => {
        onProviderSelect?.(provider);
      });

      providerMarkersRef.current.set(provider.providerServiceId, marker);
      bounds.extend({ lat, lng });
    });

    if (!bounds.isEmpty() && !selectedProvider) {
      mapInstance.current.fitBounds(bounds);
    }
  }, [isLoaded, providers, onProviderSelect, selectedProvider]);

  // focus selected provider
  useEffect(() => {
    if (!isLoaded || !mapInstance.current || !selectedProvider) return;

    const lat = Number(
      (selectedProvider as any).latitude ?? (selectedProvider as any).lat
    );
    const lng = Number(
      (selectedProvider as any).longitude ?? (selectedProvider as any).lng
    );

    if (Number.isNaN(lat) || Number.isNaN(lng)) return;

    mapInstance.current.panTo({ lat, lng });
    mapInstance.current.setZoom(15);
  }, [isLoaded, selectedProvider]);

  // current user location
  useEffect(() => {
    if (!isLoaded || !mapInstance.current || !userLocation) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.setMap(null);
    }

    userMarkerRef.current = new window.google.maps.Marker({
      position: userLocation,
      map: mapInstance.current,
      title: "Your Location",
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: "#2563eb",
        fillOpacity: 1,
        strokeColor: "#ffffff",
        strokeWeight: 2,
      },
    });
  }, [isLoaded, userLocation]);

  // search location
  useEffect(() => {
    if (
      !isLoaded ||
      !mapInstance.current ||
      !searchQuery ||
      !searchQuery.trim() ||
      !window.google?.maps
    ) {
      return;
    }

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address: searchQuery }, (results, status) => {
      if (status === "OK" && results?.[0]) {
        const newLocation = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        };

        mapInstance.current?.panTo(newLocation);
        mapInstance.current?.setZoom(14);
      } else {
        console.error("Geocoding failed:", status);
      }
    });
  }, [isLoaded, searchQuery]);

  if (error) {
    return (
      <div className={`w-full ${mapWrapperClassName}`}>
        <div
          className={`${mapHeight} bg-red-50 rounded-3xl border-2 border-red-200 flex items-center justify-center`}
        >
          <div className="text-center p-6">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h3 className="text-red-800 font-semibold mb-2">Map Loading Error</h3>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className={`w-full ${mapWrapperClassName}`}>
        <div
          className={`${mapHeight} bg-gray-100 rounded-3xl flex items-center justify-center`}
        >
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading Google Maps...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${mapWrapperClassName}`}>
      <div className={`${mapHeight} bg-gray-200 rounded-3xl overflow-hidden shadow-lg`}>
        <div ref={mapRef} className="w-full h-full" />
      </div>
    </div>
  );
}
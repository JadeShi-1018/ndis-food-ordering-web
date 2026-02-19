"use client";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import SearchBar from "../components/SearchBar";
import MapComponent from "../components/MapComponent";
import ProviderInfo from "../components/ProviderInfo";
import { Provider } from "../../types/models";
import { useRouter } from "next/navigation";

export default function DeliveryServicePage() {
  const [userLocation, setUserLocation] = useState<
    { lat: number; lng: number } | undefined
  >();
  const [searchLocation, setSearchLocation] = useState<string>("");
  const [selectedProvider, setSelectedProvider] = useState<Provider>();
  const router = useRouter();

  const handleLocationSelect = (location: string) => {
    console.log("Selected location:", location);
    setSearchLocation(location);
  };

  // Handle back button click
  const handleBack = () => {
    router.back();
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log("Current location obtained:", newLocation);
          setUserLocation(newLocation);
          // Clear search query, use current location
          setSearchLocation("");
        },
        (error) => {
          console.error("Failed to get location:", error);
          alert(
            "Unable to get current location, please check location permission settings",
          );
        },
      );
    } else {
      alert("Your browser does not support geolocation");
    }
  };

  const handleProviderSelect = (provider: Provider) => {
    setSelectedProvider(provider);
    console.log("Selected Provider:", provider);
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="px-4">
        {/* Page title section - full width */}
        <div className="pt-4 pb-6">
          <h1
            className="text-2xl font-bold text-gray-800 text-center"
            style={{ color: "var(--color-main)" }}
          >
            我附近的Providers
          </h1>
        </div>

        {/* Search section */}
        <div className="pb-2">
          <div className="flex items-center gap-4">
            {/* Back button */}
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-2 py-2 bg-white border rounded-full hover:bg-gray-50 transition-colors"
              aria-label="Go back"
              style={{
                color: "var(--color-main)",
                borderColor: "var(--color-main)",
              }}
            >
              <ArrowLeft
                size={24}
                className="text-gray-600"
                style={{ color: "var(--color-main)" }}
              />
              Back
            </button>

            {/* Search bar component */}
            <div className="flex-1 max-w-2xl mx-auto">
              <SearchBar
                onLocationSelect={handleLocationSelect}
                onCurrentLocation={handleCurrentLocation}
                inputPlaceholder="Type Your Location"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 pb-8">
          <MapComponent
            location={userLocation}
            searchQuery={searchLocation}
            onLocationSelect={handleLocationSelect}
            mapHeight="h-80"
            mapWrapperClassName="w-full"
          />
        </div>

        {/* ProviderInfomation */}
        <div className="mb-8">
          <ProviderInfo
            selectedProvider={selectedProvider}
            onProviderSelect={handleProviderSelect}
            providerInfoWrapperClassName=""
          />
        </div>
      </div>
    </div>
  );
}

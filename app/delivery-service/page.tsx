"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import SearchBar from "../components/SearchBar";
import MapComponent from "../components/MapComponent";
import ProviderInfo from "../components/ProviderInfo";
import { ProviderServiceDto, ProviderServiceDetailDto } from "../../types/providerService";
import { getProviderServices, getProviderServiceById } from "../../apis/providerService";
import { useRouter } from "next/navigation";

export default function DeliveryServicePage() {
  const router = useRouter();
  const [providers, setProviders] = useState<ProviderServiceDto[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<ProviderServiceDto>();
  const [selectedDetail, setSelectedDetail] = useState<ProviderServiceDetailDto>();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | undefined>();
  const [searchLocation, setSearchLocation] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProviderServices()
      .then((data) => {
        setProviders(data);
        if (data[0]) {
          setSelectedProvider(data[0]);
          getProviderServiceById(data[0].providerServiceId).then(setSelectedDetail);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleProviderSelect = (provider: ProviderServiceDto) => {
    setSelectedProvider(provider);
    getProviderServiceById(provider.providerServiceId).then(setSelectedDetail);
  };

  const handleLocationSelect = (location: string) => {
    setSearchLocation(location);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setSearchLocation("");
        },
        () => alert("Unable to get current location, please check location permission settings"),
      );
    } else {
      alert("Your browser does not support geolocation");
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="px-4">
        <div className="pt-4 pb-6">
          <h1 className="text-2xl font-bold text-center" style={{ color: "var(--color-main)" }}>
            Nearby Providers
          </h1>
        </div>

        <div className="pb-2">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-2 py-2 bg-white border rounded-full hover:bg-gray-50 transition-colors"
              aria-label="Go back"
              style={{ color: "var(--color-main)", borderColor: "var(--color-main)" }}
            >
              <ArrowLeft size={24} style={{ color: "var(--color-main)" }} />
              Back
            </button>
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

        <div className="mb-8">
          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading providers...</div>
          ) : (
            <ProviderInfo
              providers={providers}
              selectedProvider={selectedProvider}
              selectedDetail={selectedDetail}
              onProviderSelect={handleProviderSelect}
            />
          )}
        </div>
      </div>
    </div>
  );
}

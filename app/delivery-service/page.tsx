"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import MapComponent from "../components/MapComponent";
import ProviderInfo from "../components/ProviderInfo";
import {
  ProviderServiceDto,
  ProviderServiceDetailDto,
} from "../../types/providerService";
import {
  getProviderServices,
  getProviderServiceById,
} from "../../apis/providerService";
import { useRouter } from "next/navigation";

export default function DeliveryServicePage() {
  const router = useRouter();

  const [providers, setProviders] = useState<ProviderServiceDto[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<ProviderServiceDto>();
  const [selectedDetail, setSelectedDetail] = useState<ProviderServiceDetailDto>();
  const [userLocation] = useState<{ lat: number; lng: number }>();
  const [searchLocation] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProviderServices()
      .then((data) => {
        // console.log("provider services data =", data);
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



console.log("PAGE providers =", providers)
  return (
    
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-4 pb-6">
          <h1
            className="text-2xl font-bold text-center"
            style={{ color: "var(--color-main)" }}
          >
            Nearby Providers
          </h1>
        </div>

        <div className="pb-4">
  <div className="flex items-center justify-start max-w-5xl mx-auto">
    <button
      onClick={() => router.back()}
      className="shrink-0 flex items-center gap-2 px-3 py-2 bg-white border rounded-full hover:bg-gray-50 transition-colors"
      aria-label="Go back"
      style={{
        color: "var(--color-main)",
        borderColor: "var(--color-main)",
      }}
    >
      <ArrowLeft size={20} />
      <span>Back</span>
    </button>
  </div>
</div>

        <div className="mt-4 pb-8">
          <MapComponent
            providers={providers}
            selectedProvider={selectedProvider}
            userLocation={userLocation}
            searchQuery={searchLocation}
            onProviderSelect={handleProviderSelect}
            mapHeight="h-80"
            mapWrapperClassName="max-w-5xl mx-auto"
          />
        </div>

        <div className="mb-8">
          {loading ? (
            <div className="text-center py-12 text-gray-400">
              Loading providers...
            </div>
          ) : (
            <ProviderInfo
              providers={providers}
              selectedProvider={selectedProvider}
              selectedDetail={selectedDetail}
              onProviderSelect={handleProviderSelect}
              providerInfoWrapperClassName="max-w-7xl mx-auto"
            />
          )}
        </div>
      </div>
    </div>
  );
}
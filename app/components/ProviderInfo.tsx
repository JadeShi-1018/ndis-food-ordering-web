import React, { useRef, useLayoutEffect, useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Provider } from "../../types/models";
import { providerData, providerList } from "../data/mockData";

// Default restaurant image
const DEFAULT_RESTAURANT_IMAGE = "/provider.png";

interface ProviderInfoComponentProps {
  selectedProvider?: Provider;
  onProviderSelect?: (provider: Provider) => void;
  providerInfoWrapperClassName?: string;
}

export default function ProviderInfoComponent({
  selectedProvider = providerData,
  onProviderSelect,
  providerInfoWrapperClassName = "",
}: ProviderInfoComponentProps) {

  const handleProviderClick = (provider: Provider) => {
    onProviderSelect?.(provider);
  };

  const handleContactProvider = () => {
    console.log("Contact provider:", selectedProvider.name);
    // Add contact logic here
  };

  // Function to get image source with fallback
  const getImageSrc = (imageSrc: string) => {
    return imageSrc && imageSrc.trim() !== ""
      ? imageSrc
      : DEFAULT_RESTAURANT_IMAGE;
  };

  const rightRef = useRef<HTMLDivElement>(null);
  const [rightHeight, setRightHeight] = useState<number>(0);

  useLayoutEffect(() => {
    if (rightRef.current) {
      setRightHeight(rightRef.current.offsetHeight);
    }
  }, [selectedProvider]);

  // Minimum height for 4 providers
  const minSidebarHeight = 336;

  return (
    <div className={`w-full bg-white ${providerInfoWrapperClassName}`}>
      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <div
          className="flex flex-col w-80 p-2 border-2 rounded-3xl border-gray-200 bg-white"
          style={{
            height: Math.max(rightHeight, minSidebarHeight),
            minHeight: minSidebarHeight,
          }}
        >
          <div className="flex-1 overflow-y-auto h-full">
            <div className="space-y-0">
              {providerList.map((provider) => (
                <div
                  key={provider.id}
                  onClick={() => handleProviderClick(provider)}
                  className={`flex items-center p-4 cursor-pointer transition-colors border-b border-gray-200 ${
                    selectedProvider.id === provider.id
                      ? "bg-gray-100"
                      : "bg-white hover:bg-gray-100"
                  }`}
                  style={{ minHeight: 80 }}
                >
                  {/* Provider image */}
                  <div className="w-16 h-16 bg-gray-200 rounded-lg mr-3 flex-shrink-0 overflow-hidden relative">
                    <Image
                      src={getImageSrc(provider.image)}
                      alt={provider.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Provider info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 truncate">
                      {provider.name}
                    </h4>
                    <p className="text-sm text-gray-600 truncate">
                      {provider.type}
                    </p>
                    <div className="flex items-center mt-1">
                      <MapPin size={12} className="text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500">
                        {provider.distance}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right content */}
        <div className="flex-1 p-8 flex flex-col">
          <div
            className="max-w-4xl w-full flex-1 flex flex-col"
            ref={rightRef}
          >
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedProvider.name}
              </h1>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">
                {selectedProvider.description}
              </p>
            </div>

            {/* Details - wider label column */}
            <div className="space-y-4 mb-6">
              {/* Categories */}
              <div className="flex items-center">
                <span
                  className="w-32 text-gray-600 font-medium"
                  style={{
                    color: "var(--color-main)",
                  }}
                >
                  飲食需求
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedProvider.categories.map((category) => (
                    <span
                      key={category}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium border"
                      style={{
                        color: "var(--color-main)",
                        backgroundColor: "var(--color-secondary)",
                        borderColor: "var(--color-main)",
                      }}
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center">
                <span
                  className="w-32 text-gray-600 font-medium"
                  style={{
                    color: "var(--color-main)",
                  }}
                >
                  菜品類型
                </span>
                <div className="flex gap-2">
                  {selectedProvider.serviceType.map((type) => (
                    <span key={type} className="text-gray-800">
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-start">
                <span
                  className="w-32 text-gray-600 font-medium"
                  style={{
                    color: "var(--color-main)",
                  }}
                >
                  Provider 地址
                </span>
                <span className="text-gray-800 flex-1">
                  {selectedProvider.address}
                </span>
              </div>

              <div className="flex items-center">
                <span
                  className="w-32 text-gray-600 font-medium"
                  style={{
                    color: "var(--color-main)",
                  }}
                >
                  Provider 聯絡
                </span>
                <div className="flex items-center">
                  <span className="text-gray-800">{selectedProvider.phone}</span>
                </div>
              </div>

              <div className="flex items-start">
                <span
                  className="w-32 text-gray-600 font-medium"
                  style={{
                    color: "var(--color-main)",
                  }}
                >
                  備註
                </span>
                <span className="text-gray-800 flex-1">
                  若有特殊需求（如：特製蔬菜特別加工），請聯繫商品時詢問。
                </span>
              </div>
            </div>

            {/* Contact button */}
            <div className="flex justify-end">
              <button
                onClick={handleContactProvider}
                className="px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors font-medium"
                style={{
                  backgroundColor: "var(--color-main)",
                }}
              >
                聯絡 Provider
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

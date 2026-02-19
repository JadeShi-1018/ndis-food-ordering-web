"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onLocationSelect?: (location: string) => void;
  onCurrentLocation?: () => void;
  inputPlaceholder?: string;
  searchBarWrapperClassName?: string;
}

export default function SearchBar({
  onLocationSelect,
  onCurrentLocation,
  inputPlaceholder = "Type Your Location",
  searchBarWrapperClassName,
}: SearchBarProps) {
  const [searchValue, setSearchValue] = useState("");

  // Handle search functionality
  const handleSearch = () => {
    if (searchValue.trim()) {
      onLocationSelect?.(searchValue);
    }
  };

  // Handle enter key press for search
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Handle current location request
  const handleCurrentLocation = () => {
    console.log("SearchBar: Get current location button clicked");
    onCurrentLocation?.();
  };

  return (
    <div className={`flex items-center gap-3 ${searchBarWrapperClassName}`}>
      {/* Search input container */}
      <div className="relative flex-1">
        <div
          className="flex items-center bg-white rounded-2xl focus-within: transition-all border-none"
          style={{
            color: "var(--color-main)",
            backgroundColor: "var(--color-secondary)",
          }}
        >
          {/* Input field */}
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={inputPlaceholder}
            className="flex-1 px-4 py-3 bg-transparent outline-none border-none"
            style={{
              color: "var(--color-main)",
            }}
          />

          {/* Search button */}
          <button
            onClick={handleSearch}
            className="p-3 hover:text-blue-600 transition-colors"
            aria-label="Search location"
            style={{
              color: "var(--color-main)",
            }}
          >
            <Search size={20} />
          </button>
        </div>
      </div>

      {/* Location button */}
      <button
        onClick={handleCurrentLocation}
        className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-white border-none rounded-lg hover:border-blue-300 hover:bg-gray-50 transition-colors"
        aria-label="Use current location"
        style={{
          backgroundColor: "var(--color-secondary)",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className=""
          style={{
            color: "var(--color-main)",
          }}
        >
          <circle
            cx="12"
            cy="12"
            r="6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <line
            x1="2"
            y1="12"
            x2="6"
            y2="12"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="18"
            y1="12"
            x2="22"
            y2="12"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="12"
            y1="2"
            x2="12"
            y2="6"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="12"
            y1="18"
            x2="12"
            y2="22"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </button>
    </div>
  );
}

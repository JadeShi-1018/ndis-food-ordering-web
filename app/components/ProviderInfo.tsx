"use client";

import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, Clock, Star, UtensilsCrossed } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  ProviderServiceDto,
  ProviderServiceDetailDto,
  MenuItemDto,
} from "../../types/providerService";
import { getCategoryMenu } from "../../apis/providerService";

const DEFAULT_IMAGE = "/provider.png";

const CARD_GRADIENTS = [
  "from-teal-400 to-cyan-500",
  "from-emerald-400 to-teal-500",
  "from-sky-400 to-blue-500",
  "from-indigo-400 to-violet-500",
  "from-rose-400 to-pink-500",
  "from-amber-400 to-orange-500",
];

interface ProviderInfoProps {
  providers: ProviderServiceDto[];
  selectedProvider?: ProviderServiceDto;
  selectedDetail?: ProviderServiceDetailDto;
  onProviderSelect?: (provider: ProviderServiceDto) => void;
  providerInfoWrapperClassName?: string;
}

export default function ProviderInfo({
  providers,
  selectedProvider,
  selectedDetail,
  onProviderSelect,
  providerInfoWrapperClassName = "",
}: ProviderInfoProps) {
  const router = useRouter();
  const rightRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [rightHeight, setRightHeight] = useState(0);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItemDto[]>([]);
  const [menuLoading, setMenuLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const active = selectedProvider ?? providers[0];

  const activeCategory =
    selectedDetail?.categories?.find((c) => c.categoryId === activeCategoryId) ?? null;

  const displayedItems = showAll ? menuItems : menuItems.slice(0, 3);
  const minSidebarHeight = 360;

  useEffect(() => {
    if (selectedDetail?.categories?.length) {
      setActiveCategoryId(selectedDetail.categories[0].categoryId);
      setShowAll(false);
    } else {
      setActiveCategoryId(null);
      setMenuItems([]);
    }
  }, [selectedDetail]);

  useEffect(() => {
    if (!selectedDetail || !activeCategoryId) return;

    const categoryBelongsToProvider = selectedDetail.categories?.some(
      (c) => c.categoryId === activeCategoryId
    );

    if (!categoryBelongsToProvider) return;

    let cancelled = false;

    setMenuLoading(true);
    setShowAll(false);
    setMenuItems([]);

    getCategoryMenu(selectedDetail.providerServiceId, activeCategoryId)
      .then((data) => {
        if (!cancelled) {
          setMenuItems(data);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error(
            "Failed to load category menu",
            selectedDetail.providerServiceId,
            activeCategoryId,
            err
          );
          setMenuItems([]);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setMenuLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [selectedDetail, activeCategoryId]);

  useLayoutEffect(() => {
    if (rightRef.current) {
      setRightHeight(rightRef.current.offsetHeight);
    }
  }, [selectedProvider, menuItems, activeCategoryId, showAll]);

  useEffect(() => {
    if (!selectedProvider) return;

    const selectedElement = itemRefs.current[selectedProvider.providerServiceId];
    if (!selectedElement) return;

    selectedElement.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [selectedProvider]);

  const handleViewFullMenu = () => {
    if (!active) return;
    router.push(`/delivery-service/${active.providerServiceId}/menu`);
  };

  if (!providers.length) {
    return <div className="text-center py-12 text-gray-400">No providers found.</div>;
  }

  return (
    <div className={`w-full bg-white ${providerInfoWrapperClassName}`}>
      <div className="flex flex-col lg:flex-row gap-5 max-w-7xl mx-auto">
        <aside
          className="flex flex-col w-full lg:w-[340px] lg:flex-shrink-0 rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-sm"
          style={{
            height: rightHeight ? Math.max(rightHeight, minSidebarHeight) : minSidebarHeight,
            minHeight: minSidebarHeight,
          }}
        >
          <div className="px-5 py-4 border-b border-gray-100">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
              {providers.length} Providers
            </p>
          </div>

          <div className="flex-1 overflow-y-auto max-h-[460px] lg:max-h-none">
            {providers.map((p) => {
              const isActive = active?.providerServiceId === p.providerServiceId;

              return (
                <div
                  key={p.providerServiceId}
                  ref={(el) => {
                    itemRefs.current[p.providerServiceId] = el;
                  }}
                  onClick={() => onProviderSelect?.(p)}
                  className={`group flex items-center gap-4 px-4 py-5 cursor-pointer transition-all border-b border-gray-100 ${
                    isActive
                      ? "bg-[var(--color-secondary)] border-l-4 border-[var(--color-main)]"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={DEFAULT_IMAGE}
                      alt={p.providerServiceName}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-[15px] text-gray-800 leading-snug line-clamp-2">
                      {p.providerServiceName.replace(/\s*#\d+$/, "")}
                    </h4>

                    <div className="flex items-center gap-1.5 mt-1.5">
                      <MapPin size={12} className="text-gray-400 flex-shrink-0" />
                      <span className="text-sm text-gray-400 truncate">
                        {p.city}, {p.state}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {active && (
          <section className="flex-1 min-w-0" ref={rightRef}>
            <div
              className="rounded-3xl px-6 py-5 mb-6"
              style={{ backgroundColor: "var(--color-secondary)" }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h1
                    className="text-[22px] sm:text-[24px] font-bold leading-tight mb-2"
                    style={{ color: "var(--color-main)" }}
                  >
                    {active.providerServiceName.replace(/\s*#\d+$/, "")}
                  </h1>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} style={{ color: "var(--color-main)" }} />
                      <span>
                        {active.address}, {active.city}, {active.state} {active.postcode}
                      </span>
                    </span>

                    {selectedDetail?.openingHours && (
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} style={{ color: "var(--color-main)" }} />
                        <span>{selectedDetail.openingHours}</span>
                      </span>
                    )}

                    <span className="flex items-center gap-1.5">
                      <Star size={14} className="fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-gray-800">4.8</span>
                      <span className="text-gray-400">(128 reviews)</span>
                    </span>
                  </div>
                </div>

                <span
                  className="inline-flex w-fit flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap"
                  style={{
                    color: "var(--color-main)",
                    borderColor: "var(--color-main)",
                    backgroundColor: "white",
                  }}
                >
                  {active.serviceTypeName}
                </span>
              </div>
            </div>

            {selectedDetail?.categories?.length ? (
              <div className="mb-6">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h2
                    className="text-sm font-semibold uppercase tracking-[0.16em]"
                    style={{ color: "var(--color-main)" }}
                  >
                    Menu Categories
                  </h2>

                  {menuItems.length > 3 && (
                    <button
                      onClick={() => setShowAll((v) => !v)}
                      className="text-sm font-medium hover:opacity-80 transition-opacity"
                      style={{ color: "var(--color-main)" }}
                    >
                      {showAll ? "Show Less" : "Show More"}
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedDetail.categories.map((cat) => {
                    const isCategoryActive = activeCategoryId === cat.categoryId;

                    return (
                      <button
                        key={cat.categoryId}
                        onClick={() => setActiveCategoryId(cat.categoryId)}
                        className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
                        style={
                          isCategoryActive
                            ? {
                                backgroundColor: "var(--color-main)",
                                color: "white",
                                borderColor: "var(--color-main)",
                              }
                            : {
                                backgroundColor: "white",
                                color: "var(--color-main)",
                                borderColor: "var(--color-main)",
                              }
                        }
                      >
                        {cat.categoryName}
                      </button>
                    );
                  })}
                </div>

                {activeCategory?.categoryDescription && (
                  <p className="mt-3 text-sm text-gray-400">
                    {activeCategory.categoryDescription}
                  </p>
                )}
              </div>
            ) : (
              <div className="mb-6 flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-10 w-28 rounded-full bg-gray-100 animate-pulse" />
                ))}
              </div>
            )}

            <div className="mb-6">
              {menuLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="rounded-3xl overflow-hidden border border-gray-100"
                    >
                      <div className="h-28 bg-gray-100 animate-pulse" />
                      <div className="p-4 space-y-2">
                        <div className="h-4 bg-gray-100 rounded animate-pulse" />
                        <div className="h-3 bg-gray-100 rounded w-2/3 animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : menuItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {displayedItems.map((item, idx) => (
                    <div
                      key={item.menuId}
                      className="rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all"
                    >
                      <div
                        className={`h-28 bg-gradient-to-br ${
                          CARD_GRADIENTS[idx % CARD_GRADIENTS.length]
                        } flex flex-col items-center justify-center gap-2`}
                      >
                        <UtensilsCrossed className="w-10 h-10 text-white/80" />
                        <span className="text-xs font-medium text-white/80">
                          {item.periodName}
                        </span>
                      </div>

                      <div className="p-4">
                        <h4 className="font-semibold text-[15px] text-gray-800 leading-snug mb-3 line-clamp-2 min-h-[44px]">
                          {item.menuName}
                        </h4>

                        <div className="flex items-center justify-between gap-3">
                          <span
                            className="text-xs px-2.5 py-1 rounded-full font-medium"
                            style={{
                              backgroundColor: "var(--color-secondary)",
                              color: "var(--color-main)",
                            }}
                          >
                            {item.periodName}
                          </span>

                          <span
                            className="font-bold text-base"
                            style={{ color: "var(--color-main)" }}
                          >
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : activeCategory ? (
                <p className="text-sm text-gray-400 py-4">
                  No menu items available for this category.
                </p>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={handleViewFullMenu}
                className="px-5 py-2.5 rounded-full font-semibold text-sm border-2 transition-all hover:bg-gray-50"
                style={{
                  color: "var(--color-main)",
                  borderColor: "var(--color-main)",
                }}
              >
                View Full Menu
              </button>

              {/* <button
                onClick={() => console.log("Contact provider:", active.providerServiceId)}
                className="px-5 py-2.5 rounded-full font-semibold text-sm text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--color-main)" }}
              >
                Contact Provider
              </button> */}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
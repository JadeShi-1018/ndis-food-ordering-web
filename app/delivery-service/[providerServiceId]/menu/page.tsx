"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Clock, MapPin, UtensilsCrossed } from "lucide-react";
import {
  ProviderServiceDetailDto,
  MenuItemDto,
} from "../../../../types/providerService";
import {
  getProviderServiceById,
  getCategoryMenu,
} from "../../../../apis/providerService";

const CARD_GRADIENTS = [
  "from-teal-400 to-cyan-500",
  "from-emerald-400 to-teal-500",
  "from-sky-400 to-blue-500",
  "from-indigo-400 to-violet-500",
  "from-rose-400 to-pink-500",
  "from-amber-400 to-orange-500",
];

export default function FullMenuPage() {
  const router = useRouter();
  const params = useParams();
  const providerServiceId = params.providerServiceId as string;

  const [providerDetail, setProviderDetail] =
    useState<ProviderServiceDetailDto | null>(null);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItemDto[]>([]);
  const [loadingDetail, setLoadingDetail] = useState(true);
  const [loadingMenu, setLoadingMenu] = useState(false);

  useEffect(() => {
    if (!providerServiceId) return;

    setLoadingDetail(true);

    getProviderServiceById(providerServiceId)
      .then((data) => {
        setProviderDetail(data);

        if (data.categories?.length) {
          setActiveCategoryId(data.categories[0].categoryId);
        }
      })
      .catch((err) => {
        console.error("Failed to load provider detail", err);
      })
      .finally(() => {
        setLoadingDetail(false);
      });
  }, [providerServiceId]);

  useEffect(() => {
    if (!providerDetail || !activeCategoryId) return;

    setLoadingMenu(true);

    getCategoryMenu(providerDetail.providerServiceId, activeCategoryId)
      .then((data) => {
        setMenuItems(data);
      })
      .catch((err) => {
        console.error("Failed to load menu items", err);
        setMenuItems([]);
      })
      .finally(() => {
        setLoadingMenu(false);
      });
  }, [providerDetail, activeCategoryId]);

  const activeCategory = useMemo(() => {
    return (
      providerDetail?.categories?.find((c) => c.categoryId === activeCategoryId) ??
      null
    );
  }, [providerDetail, activeCategoryId]);

  const handleOrderThis = (item: MenuItemDto) => {
  if (!providerDetail || !activeCategoryId) return;

  const activeCategory = providerDetail.categories?.find(
    (c) => c.categoryId === activeCategoryId
  );

  const targetUrl =
    `/delivery-service/${providerDetail.providerServiceId}/menu/${item.menuId}/order` +
    `?categoryId=${encodeURIComponent(activeCategoryId)}` +
    `&providerName=${encodeURIComponent(
      providerDetail.providerServiceName.replace(/\s*#\d+$/, "")
    )}` +
    `&menuName=${encodeURIComponent(item.menuName)}` +
    `&categoryName=${encodeURIComponent(activeCategory?.categoryName || "")}` +
    `&periodName=${encodeURIComponent(item.periodName || "")}` +
    `&price=${encodeURIComponent(item.price.toString())}`;

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  if (!token) {
    router.push(`/user-login?redirect=${encodeURIComponent(targetUrl)}`);
    return;
  }

  router.push(targetUrl);
};

  if (loadingDetail) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-10 w-40 bg-gray-100 rounded-full" />
            <div className="h-32 bg-gray-100 rounded-3xl" />
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 w-28 bg-gray-100 rounded-full" />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-3xl border border-gray-100 overflow-hidden"
                >
                  <div className="h-28 bg-gray-100" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-100 rounded" />
                    <div className="h-3 bg-gray-100 rounded w-2/3" />
                    <div className="h-10 bg-gray-100 rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!providerDetail) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Provider not found
          </h2>
          <p className="text-gray-500 mb-6">
            We couldn&apos;t load the provider information.
          </p>
          <button
            onClick={() => router.back()}
            className="px-5 py-2.5 rounded-full border font-medium"
            style={{
              color: "var(--color-main)",
              borderColor: "var(--color-main)",
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-5">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-white hover:bg-gray-50 transition-colors"
            style={{
              color: "var(--color-main)",
              borderColor: "var(--color-main)",
            }}
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>

        <div
          className="rounded-3xl px-6 py-6 mb-6"
          style={{ backgroundColor: "var(--color-secondary)" }}
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h1
                className="text-2xl sm:text-3xl font-bold mb-3"
                style={{ color: "var(--color-main)" }}
              >
                {providerDetail.providerServiceName.replace(/\s*#\d+$/, "")}
              </h1>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} style={{ color: "var(--color-main)" }} />
                  <span>
                    {providerDetail.address}, {providerDetail.city},{" "}
                    {providerDetail.state} {providerDetail.postcode}
                  </span>
                </span>

                {providerDetail.openingHours && (
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} style={{ color: "var(--color-main)" }} />
                    <span>{providerDetail.openingHours}</span>
                  </span>
                )}
              </div>
            </div>

            <span
              className="inline-flex w-fit px-4 py-1.5 rounded-full text-xs font-semibold border bg-white"
              style={{
                color: "var(--color-main)",
                borderColor: "var(--color-main)",
              }}
            >
              {providerDetail.serviceTypeName}
            </span>
          </div>
        </div>

        {providerDetail.categories?.length ? (
          <div className="mb-6">
            <h2
              className="text-sm font-semibold uppercase tracking-[0.16em] mb-3"
              style={{ color: "var(--color-main)" }}
            >
              Menu Categories
            </h2>

            <div className="flex flex-wrap gap-2">
              {providerDetail.categories.map((cat) => {
                const isActive = activeCategoryId === cat.categoryId;

                return (
                  <button
                    key={cat.categoryId}
                    onClick={() => setActiveCategoryId(cat.categoryId)}
                    className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
                    style={
                      isActive
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
        ) : null}

        <div className="mb-6">
          {loadingMenu ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-3xl overflow-hidden border border-gray-100"
                >
                  <div className="h-28 bg-gray-100 animate-pulse" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-100 rounded animate-pulse" />
                    <div className="h-3 bg-gray-100 rounded w-2/3 animate-pulse" />
                    <div className="h-10 bg-gray-100 rounded-xl animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : menuItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {menuItems.map((item, idx) => (
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
                    <h3 className="font-semibold text-[15px] text-gray-800 leading-snug mb-2 line-clamp-2 min-h-[44px]">
                      {item.menuName}
                    </h3>

                    <div className="flex items-center justify-between mb-4">
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

                    <button
                      onClick={() => handleOrderThis(item)}
                      className="w-full px-4 py-2.5 rounded-2xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                      style={{ backgroundColor: "var(--color-main)" }}
                    >
                      Order This
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 py-6">
              No menu items available for this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
'use client';

import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import Image from 'next/image';
import { MapPin, Clock, Star } from 'lucide-react';
import { ProviderServiceDto, ProviderServiceDetailDto, CategoryDto, MenuItemDto } from '../../types/providerService';
import { getCategoryMenu } from '../../apis/providerService';

const DEFAULT_IMAGE = '/provider.png';

const CARD_GRADIENTS = [
  'from-teal-400 to-cyan-500',
  'from-emerald-400 to-teal-500',
  'from-sky-400 to-blue-500',
  'from-indigo-400 to-violet-500',
  'from-rose-400 to-pink-500',
  'from-amber-400 to-orange-500',
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
  providerInfoWrapperClassName = '',
}: ProviderInfoProps) {
  const rightRef = useRef<HTMLDivElement>(null);
  const [rightHeight, setRightHeight] = useState<number>(0);
const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItemDto[]>([]);
  const [menuLoading, setMenuLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
const activeCategory =
  selectedDetail?.categories?.find(
    (c) => c.categoryId === activeCategoryId
  ) ?? null;
  // Auto-select first category when detail changes
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
  console.log('selectedDetail provider:', selectedDetail?.providerServiceId);
  console.log('activeCategoryId:', activeCategoryId);
  console.log(
    'selectedDetail categories:',
    selectedDetail?.categories?.map((c) => ({
      id: c.categoryId,
      name: c.categoryName,
    }))
  );
  if (!selectedDetail || !activeCategoryId) return;

  const belongsToSelectedProvider = selectedDetail.categories?.some(
    (c) => c.categoryId === activeCategoryId
  );

  if (!belongsToSelectedProvider) {
    return;
  }

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
          'Failed to load category menu',
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
    if (rightRef.current) setRightHeight(rightRef.current.offsetHeight);
  }, [selectedProvider, menuItems, activeCategoryId]);

  const minSidebarHeight = 336;
  const active = selectedProvider ?? providers[0];
  const displayedItems = showAll ? menuItems : menuItems.slice(0, 3);

  if (providers.length === 0) {
    return <div className="text-center py-12 text-gray-400">No providers found.</div>;
  }

  return (
    <div className={`w-full bg-white ${providerInfoWrapperClassName}`}>
      <div className="flex max-w-7xl mx-auto gap-4">

        {/* ── Sidebar ── */}
        <div
          className="flex flex-col w-72 flex-shrink-0 border-2 rounded-3xl border-gray-100 bg-white overflow-hidden"
          style={{ height: Math.max(rightHeight, minSidebarHeight), minHeight: minSidebarHeight }}
        >
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              {providers.length} Providers
            </p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {providers.map((p) => (
              <div
                key={p.providerServiceId}
                onClick={() => onProviderSelect?.(p)}
                className={`flex items-center gap-3 p-4 cursor-pointer transition-colors border-b border-gray-50 ${
                  active?.providerServiceId === p.providerServiceId
                    ? 'bg-[var(--color-secondary)]'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="w-12 h-12 rounded-xl flex-shrink-0 overflow-hidden relative bg-gray-100">
                  <Image src={DEFAULT_IMAGE} alt={p.providerServiceName} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-gray-800 leading-tight line-clamp-2">
                    {p.providerServiceName.replace(/\s*#\d+$/, '')}
                  </h4>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={10} className="text-gray-400 flex-shrink-0" />
                    <span className="text-xs text-gray-400 truncate">{p.city}, {p.state}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Detail Panel ── */}
        {active && (
          <div className="flex-1 min-w-0" ref={rightRef}>

            {/* Hero Header */}
            <div
              className="rounded-2xl p-6 mb-5"
              style={{ backgroundColor: 'var(--color-secondary)' }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl font-bold leading-tight mb-2" style={{ color: 'var(--color-main)' }}>
                    {active.providerServiceName.replace(/\s*#\d+$/, '')}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} style={{ color: 'var(--color-main)' }} />
                      {active.address}, {active.city}, {active.state} {active.postcode}
                    </span>
                    {selectedDetail?.openingHours && (
                      <span className="flex items-center gap-1">
                        <Clock size={14} style={{ color: 'var(--color-main)' }} />
                        {selectedDetail.openingHours}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star size={14} className="fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-gray-800">4.8</span>
                      <span className="text-gray-400">(128 reviews)</span>
                    </span>
                  </div>
                </div>
                <span
                  className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap"
                  style={{ color: 'var(--color-main)', borderColor: 'var(--color-main)', backgroundColor: 'white' }}
                >
                  {active.serviceTypeName}
                </span>
              </div>
            </div>

            {/* Category Tags */}
            {selectedDetail?.categories?.length ? (
              <div className="mb-5">
                <h2 className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-main)' }}>
                  Menu Categories
                </h2>
                <div className="flex flex-wrap gap-2">
                  {selectedDetail.categories.map((cat) => {
                   const isActive = activeCategoryId === cat.categoryId;
                    return (
                      <button
                        key={cat.categoryId}
                        onClick={() => setActiveCategoryId(cat.categoryId)}
                        className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
                        style={
                          isActive
                            ? { backgroundColor: 'var(--color-main)', color: 'white', borderColor: 'var(--color-main)' }
                            : { backgroundColor: 'white', color: 'var(--color-main)', borderColor: 'var(--color-main)' }
                        }
                      >
                        {cat.categoryName}
                      </button>
                    );
                  })}
                  
                </div>
                {activeCategory && (
                  <p className="mt-2 text-xs text-gray-400">
                    {activeCategory.categoryDescription}
                  </p>
                )}
              </div>
            ) : (
              <div className="mb-5 flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-9 w-28 rounded-full bg-gray-100 animate-pulse" />
                ))}
              </div>
            )}

            {/* Menu Items */}
            <div className="mb-5">
              {menuLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="rounded-2xl overflow-hidden border border-gray-100">
                      <div className="h-32 bg-gray-100 animate-pulse" />
                      <div className="p-3 space-y-2">
                        <div className="h-4 bg-gray-100 rounded animate-pulse" />
                        <div className="h-3 bg-gray-100 rounded w-2/3 animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : menuItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {displayedItems.map((item, idx) => (
                    <div
                      key={item.menuId}
                      className="rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                      {/* Placeholder image */}
                      <div className={`h-32 bg-gradient-to-br ${CARD_GRADIENTS[idx % CARD_GRADIENTS.length]} flex items-center justify-center`}>
                        <svg className="w-12 h-12 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div className="p-3">
                        <h4 className="font-semibold text-sm text-gray-800 leading-snug mb-2 line-clamp-2">
                          {item.menuName}
                        </h4>
                        <div className="flex items-center justify-between">
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-medium"
                            style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-main)' }}
                          >
                            {item.periodName}
                          </span>
                          <span className="font-bold text-sm" style={{ color: 'var(--color-main)' }}>
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : activeCategory ? (
                <p className="text-sm text-gray-400 py-4">No menu items available for this category.</p>
              ) : null}
            </div>

            {/* CTA Row */}
            <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
              {menuItems.length > 3 && (
                <button
                  onClick={() => setShowAll((v) => !v)}
                  className="px-5 py-2.5 rounded-full font-semibold text-sm border-2 transition-all"
                  style={{ color: 'var(--color-main)', borderColor: 'var(--color-main)' }}
                >
                  {showAll ? 'Show Less' : `View Menu (${menuItems.length})`}
                </button>
              )}
              <button
                onClick={() => console.log('Contact provider:', active.providerServiceId)}
                className="px-5 py-2.5 rounded-full font-semibold text-sm text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--color-main)' }}
              >
                Contact Provider
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

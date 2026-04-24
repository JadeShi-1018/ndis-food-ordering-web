"use client";

import React, { useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createOrder } from "../../../../../../apis/order";



function generateIdempotencyKey() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getNextDate(dateString: string) {
  const d = new Date(`${dateString}T00:00:00`);
  d.setDate(d.getDate() + 1);
  return toLocalDateString(d);
}

function toLocalDateString(date: Date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function toIsoDateAtMidday(dateString: string) {
  
  return new Date(`${dateString}T12:00:00`).toISOString();
}

const AU_STATES = ["VIC", "NSW", "QLD", "SA", "WA", "TAS", "ACT", "NT"];

export default function OrderPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const providerServiceId = params.providerServiceId as string;
const menuId = params.menuId as string;
const categoryId = searchParams.get("categoryId") || "";

const providerName = searchParams.get("providerName") || "";
const menuName = searchParams.get("menuName") || "";
const categoryName = searchParams.get("categoryName") || "";
const periodName = searchParams.get("periodName") || "";
const price = searchParams.get("price") || "";

  const today = useMemo(() => toLocalDateString(new Date()), []);
  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return toLocalDateString(d);
  }, []);

  const [unitNumber, setUnitNumber] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [suburb, setSuburb] = useState("");
  const [state, setState] = useState("");
  const [postcode, setPostcode] = useState("");

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(tomorrow);

  const [idempotencyKey] = useState(() => generateIdempotencyKey());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const buildDeliveryAddress = () => {
    const streetPart = `${streetNumber.trim()} ${streetName.trim()}`.trim();
    const unitPrefix = unitNumber.trim() ? `${unitNumber.trim()}/` : "";

    return `${unitPrefix}${streetPart}, ${suburb.trim()}, ${state.trim()} ${postcode.trim()}, Australia`;
  };

  const validate = () => {
    if (!providerServiceId || !menuId || !categoryId) {
      return "Missing order information. Please go back and try again.";
    }

    if (!streetNumber.trim()) {
      return "Please enter street number.";
    }

    if (!streetName.trim()) {
      return "Please enter street name.";
    }

    if (!suburb.trim()) {
      return "Please enter suburb.";
    }

    if (!state.trim()) {
      return "Please select state.";
    }

    if (!AU_STATES.includes(state.trim())) {
      return "Please select a valid Australian state or territory.";
    }

    if (!/^\d{4}$/.test(postcode.trim())) {
      return "Postcode must be 4 digits.";
    }

    if (!startDate) {
      return "Please select start date.";
    }

    if (!endDate) {
      return "Please select end date.";
    }

    if (startDate < today) {
      return "Start date cannot be earlier than today.";
    }

    if (endDate <= startDate) {
      return "End date must be later than start date.";
    }

    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setSuccess("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const payload = {
        providerServiceId,
        categoryId,
        menuId,
        idempotencyKey,
        deliveryAddress: buildDeliveryAddress(),
        startDate: toIsoDateAtMidday(startDate),
        endDate: toIsoDateAtMidday(endDate),
      };
const createdOrder = await createOrder(payload);
 if (!createdOrder.orderId) {
      throw new Error("Order created but orderId was not returned.");
    }

    if (!createdOrder.paymentId) {
      throw new Error("Order created but paymentId was not returned.");
    }

    setSuccess("Order created successfully.");

    router.push(
  `/payment/${createdOrder.orderId}` +
    `?paymentId=${encodeURIComponent(createdOrder.paymentId)}` +
    `&providerName=${encodeURIComponent(createdOrder.providerName || providerName)}` +
    `&categoryName=${encodeURIComponent(categoryName)}` +
    `&menuName=${encodeURIComponent(createdOrder.menuName || menuName)}` +
    `&periodName=${encodeURIComponent(createdOrder.periodName || periodName)}` +
    `&orderPrice=${encodeURIComponent(String(createdOrder.orderPrice ?? price ?? ""))}` +
    `&quantity=${encodeURIComponent(String(createdOrder.quantity ?? ""))}` +
    `&startDate=${encodeURIComponent(createdOrder.startDate || "")}` +
    `&endDate=${encodeURIComponent(createdOrder.endDate || "")}` +
    `&deliveryAddress=${encodeURIComponent(createdOrder.deliveryAddress || "")}` +
    `&orderStatus=${encodeURIComponent(createdOrder.orderStatus || "")}`
);

    //   setTimeout(() => {
    //     router.push("/my-orders");
    //   }, 800);
    } catch (err) {
      console.error("Failed to create order:", err);
      setError(
        err instanceof Error ? err.message : "Failed to create order."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-white hover:bg-gray-50 transition-colors mb-6"
          style={{
            color: "var(--color-main)",
            borderColor: "var(--color-main)",
          }}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 bg-white">
          <h1
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--color-main)" }}
          >
            Create Order
          </h1>

          <p className="text-sm text-gray-500 mb-6">
            Fill in your delivery details and service dates.
          </p>

          <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 mb-6">
  <h2 className="text-base font-semibold text-gray-800 mb-3">
    Order Summary
  </h2>

  <div className="space-y-2 text-sm text-gray-700">
    <div className="flex justify-between gap-4">
      <span className="text-gray-500">Provider</span>
      <span className="font-medium text-right">{providerName || "N/A"}</span>
    </div>

    <div className="flex justify-between gap-4">
      <span className="text-gray-500">Menu</span>
      <span className="font-medium text-right">{menuName || "N/A"}</span>
    </div>

    <div className="flex justify-between gap-4">
      <span className="text-gray-500">Category</span>
      <span className="font-medium text-right">{categoryName || "N/A"}</span>
    </div>

    <div className="flex justify-between gap-4">
      <span className="text-gray-500">Period</span>
      <span className="font-medium text-right">{periodName || "N/A"}</span>
    </div>

    <div className="flex justify-between gap-4">
      <span className="text-gray-500">Price</span>
      <span className="font-semibold text-right">
        {price ? `$${Number(price).toFixed(2)}` : "N/A"}
      </span>
    </div>
  </div>
</div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit / Apartment Number <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                value={unitNumber}
                onChange={(e) => setUnitNumber(e.target.value)}
                placeholder="e.g. 5"
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Number
                </label>
                <input
                  type="text"
                  value={streetNumber}
                  onChange={(e) => setStreetNumber(e.target.value)}
                  placeholder="e.g. 12"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Name
                </label>
                <input
                  type="text"
                  value={streetName}
                  onChange={(e) => setStreetName(e.target.value)}
                  placeholder="e.g. Collins Street"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Suburb
                </label>
                <input
                  type="text"
                  value={suburb}
                  onChange={(e) => setSuburb(e.target.value)}
                  placeholder="e.g. Melbourne"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value.toUpperCase())}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                >
                  <option value="">Select state</option>
                  <option value="VIC">VIC</option>
                  <option value="NSW">NSW</option>
                  <option value="QLD">QLD</option>
                  <option value="SA">SA</option>
                  <option value="WA">WA</option>
                  <option value="TAS">TAS</option>
                  <option value="ACT">ACT</option>
                  <option value="NT">NT</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Postcode
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  value={postcode}
                  onChange={(e) =>
                    setPostcode(e.target.value.replace(/\D/g, "").slice(0, 4))
                  }
                  placeholder="e.g. 3000"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  min={today}
                  onChange={(e) => {
                    const newStartDate = e.target.value;
                    setStartDate(newStartDate);

                    if (endDate && endDate <= newStartDate) {
                      setEndDate("");
                    }
                  }}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  min={startDate ? getNextDate(startDate) : tomorrow}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-2xl bg-red-50 text-red-600 px-4 py-3 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-2xl bg-green-50 text-green-600 px-4 py-3 text-sm">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl text-white font-semibold transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ backgroundColor: "var(--color-main)" }}
            >
              {loading ? "Creating Order..." : "Submit Order"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
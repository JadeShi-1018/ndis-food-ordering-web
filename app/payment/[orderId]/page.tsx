"use client";

import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { payPayment } from "../../../apis/payment";

function formatDate(dateString: string) {
  if (!dateString) return "N/A";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "N/A";

  return date.toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function PaymentPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const orderId = params.orderId as string;
  const paymentId = searchParams.get("paymentId") || "";

  const providerName = searchParams.get("providerName") || "";
  const categoryName = searchParams.get("categoryName") || "";
  const menuName = searchParams.get("menuName") || "";
  const periodName = searchParams.get("periodName") || "";
  const orderPrice = searchParams.get("orderPrice") || "";
  const quantity = searchParams.get("quantity") || "";
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";
  const deliveryAddress = searchParams.get("deliveryAddress") || "";
  const orderStatus = searchParams.get("orderStatus") || "PendingPayment";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePayNow = async () => {
  if (loading) return;

  setError("");
  setSuccess("");

  try {
    setLoading(true);

    const result = await payPayment(paymentId);

    setSuccess(result.message || "Payment successful.");

    router.push("/my-orders");
  } catch (err) {
    console.error("Failed to process payment:", err);
    setError(
      err instanceof Error ? err.message : "Failed to process payment."
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
            Payment
          </h1>

          <p className="text-sm text-gray-500 mb-6">
            Review your order and complete payment.
          </p>

          <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 mb-6">
            <h2 className="text-base font-semibold text-gray-800 mb-3">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Provider</span>
                <span className="font-medium text-right">
                  {providerName || "N/A"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Category</span>
                <span className="font-medium text-right">
                  {categoryName || "N/A"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Menu</span>
                <span className="font-medium text-right">
                  {menuName || "N/A"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Period</span>
                <span className="font-medium text-right">
                  {periodName || "N/A"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Start Date</span>
                <span className="font-medium text-right">
                  {formatDate(startDate)}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">End Date</span>
                <span className="font-medium text-right">
                  {formatDate(endDate)}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Deliveries</span>
                <span className="font-medium text-right">
                  {quantity || "N/A"}
                </span>
              </div>

              <div className="flex justify-between gap-4 items-start">
                <span className="text-gray-500">Delivery Address</span>
                <span className="font-medium text-right max-w-[70%] break-words">
                  {deliveryAddress || "N/A"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Status</span>
                <span className="font-medium text-right">{orderStatus}</span>
              </div>

              <div className="border-t border-gray-200 pt-3 flex justify-between gap-4">
                <span className="text-gray-600 font-medium">Total Amount</span>
                <span
                  className="font-bold text-lg text-right"
                  style={{ color: "var(--color-main)" }}
                >
                  {orderPrice ? `$${Number(orderPrice).toFixed(2)}` : "N/A"}
                </span>
              </div>
            </div>
          </div>

          {error && (
            <div className="rounded-2xl bg-red-50 text-red-600 px-4 py-3 text-sm mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-2xl bg-green-50 text-green-600 px-4 py-3 text-sm mb-4">
              {success}
            </div>
          )}

          <button
            onClick={handlePayNow}
            disabled={loading || !paymentId}
            className="w-full py-3 rounded-2xl text-white font-semibold transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ backgroundColor: "var(--color-main)" }}
          >
            {loading ? "Processing Payment..." : "Pay Now"}
          </button>

          <p className="text-xs text-gray-400 mt-4 break-all">
            Reference: {orderId}
          </p>
        </div>
      </div>
    </div>
  );
}
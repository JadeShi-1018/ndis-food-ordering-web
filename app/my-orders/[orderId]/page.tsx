"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getMyOrders, MyOrderDto } from "../../../apis/orders";

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

function getStatusClass(status: string) {
  switch (status) {
    case "Paid":
      return "bg-green-50 text-green-600";
    case "PendingPayment":
      return "bg-yellow-50 text-yellow-700";
    case "Failed":
      return "bg-red-50 text-red-600";
    default:
      return "bg-gray-50 text-gray-600";
  }
}

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.orderId as string;

  const [order, setOrder] = useState<MyOrderDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const orders = await getMyOrders();
        const matched = orders.find((o) => o.orderId === orderId);

        if (!matched) {
          throw new Error("Order not found.");
        }

        setOrder(matched);
      } catch (err) {
        console.error("Failed to load order:", err);
        setError(err instanceof Error ? err.message : "Failed to load order.");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      loadOrder();
    }
  }, [orderId]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.push("/my-orders")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-white hover:bg-gray-50 transition-colors mb-6"
          style={{
            color: "var(--color-main)",
            borderColor: "var(--color-main)",
          }}
        >
          <ArrowLeft size={18} />
          Back to My Orders
        </button>

        {loading && (
          <div className="text-center py-12 text-gray-400">Loading order...</div>
        )}

        {!loading && error && (
          <div className="rounded-2xl bg-red-50 text-red-600 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {!loading && order && (
          <div className="rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
              <div>
                <h1
                  className="text-2xl font-bold"
                  style={{ color: "var(--color-main)" }}
                >
                  Order Details
                </h1>
                <p className="text-sm text-gray-500 mt-2">{order.providerName}</p>
              </div>

              <span
                className={`inline-flex w-fit px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                  order.orderStatus
                )}`}
              >
                {order.orderStatus}
              </span>
            </div>

            <div className="space-y-4 text-sm text-gray-700">
              <div className="rounded-2xl bg-gray-50 px-4 py-3">
                <p className="text-gray-500">Menu</p>
                <p className="font-medium">{order.menuName}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-gray-50 px-4 py-3">
                  <p className="text-gray-500">Period</p>
                  <p className="font-medium">{order.periodName}</p>
                </div>

                <div className="rounded-2xl bg-gray-50 px-4 py-3">
                  <p className="text-gray-500">Deliveries</p>
                  <p className="font-medium">{order.quantity}</p>
                </div>

                <div className="rounded-2xl bg-gray-50 px-4 py-3">
                  <p className="text-gray-500">Unit Price</p>
                  <p className="font-medium">${order.unitPrice.toFixed(2)}</p>
                </div>

                <div className="rounded-2xl bg-gray-50 px-4 py-3">
                  <p className="text-gray-500">Total Amount</p>
                  <p className="font-semibold">${order.orderPrice.toFixed(2)}</p>
                </div>

                <div className="rounded-2xl bg-gray-50 px-4 py-3">
                  <p className="text-gray-500">Start Date</p>
                  <p className="font-medium">{formatDate(order.startDate)}</p>
                </div>

                <div className="rounded-2xl bg-gray-50 px-4 py-3">
                  <p className="text-gray-500">End Date</p>
                  <p className="font-medium">{formatDate(order.endDate)}</p>
                </div>
              </div>

              <div className="rounded-2xl bg-gray-50 px-4 py-3">
                <p className="text-gray-500">Delivery Address</p>
                <p className="font-medium break-words">{order.deliveryAddress}</p>
              </div>

              <div className="rounded-2xl bg-gray-50 px-4 py-3">
                <p className="text-gray-500">Contact Number</p>
                <p className="font-medium">{order.customerContactNumber}</p>
              </div>

              <div className="rounded-2xl bg-gray-50 px-4 py-3">
                <p className="text-gray-500">Reference</p>
                <p className="font-medium break-all">{order.orderId}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {order.orderStatus === "PendingPayment" && (
                <button
                  onClick={() =>
                    router.push(
                      `/payment/${order.orderId}` +
                        `?paymentId=${encodeURIComponent(order.paymentId)}` +
                        `&providerName=${encodeURIComponent(order.providerName)}` +
                        `&menuName=${encodeURIComponent(order.menuName)}` +
                        `&periodName=${encodeURIComponent(order.periodName)}` +
                        `&orderPrice=${encodeURIComponent(String(order.orderPrice))}` +
                        `&quantity=${encodeURIComponent(String(order.quantity))}` +
                        `&startDate=${encodeURIComponent(order.startDate)}` +
                        `&endDate=${encodeURIComponent(order.endDate)}` +
                        `&deliveryAddress=${encodeURIComponent(order.deliveryAddress)}` +
                        `&orderStatus=${encodeURIComponent(order.orderStatus)}`
                    )
                  }
                  className="px-4 py-2 rounded-2xl text-white font-medium hover:opacity-90"
                  style={{ backgroundColor: "var(--color-main)" }}
                >
                  Go to Payment
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
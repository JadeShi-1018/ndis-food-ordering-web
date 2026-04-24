"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getMyOrders, MyOrderDto } from "../../apis/orders";

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

export default function MyOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<MyOrderDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getMyOrders();
        setOrders(data);
      } catch (err) {
        console.error("Failed to load my orders:", err);
        setError(err instanceof Error ? err.message : "Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        <div className="mb-6">
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--color-main)" }}
          >
            My Orders
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            View your order history and payment status.
          </p>
        </div>

        {loading && (
          <div className="text-center py-12 text-gray-400">
            Loading orders...
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl bg-red-50 text-red-600 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="rounded-3xl border border-gray-100 shadow-sm p-8 text-center text-gray-500">
            You have no orders yet.
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="rounded-3xl border border-gray-100 shadow-sm p-5 bg-white"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {order.menuName}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {order.providerName}
                    </p>
                  </div>

                  <span
                    className={`inline-flex w-fit px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-5">
                  <div>
                    <p className="text-gray-500">Period</p>
                    <p className="font-medium">{order.periodName}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Deliveries</p>
                    <p className="font-medium">{order.quantity}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Start Date</p>
                    <p className="font-medium">{formatDate(order.startDate)}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">End Date</p>
                    <p className="font-medium">{formatDate(order.endDate)}</p>
                  </div>

                  <div className="sm:col-span-2">
                    <p className="text-gray-500">Delivery Address</p>
                    <p className="font-medium break-words">
                      {order.deliveryAddress}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">Total Amount</p>
                    <p
                      className="font-semibold"
                      style={{ color: "var(--color-main)" }}
                    >
                      ${order.orderPrice.toFixed(2)}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">Created At</p>
                    <p className="font-medium">{formatDate(order.createdAt)}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => router.push(`/my-orders/${order.orderId}`)}
                    className="px-4 py-2 rounded-2xl border font-medium hover:bg-gray-50"
                    style={{
                      color: "var(--color-main)",
                      borderColor: "var(--color-main)",
                    }}
                  >
                    View Order
                  </button>

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
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
const API_BASE_URL = process.env.NEXT_PUBLIC_ORDER_API_URL;

export interface CreateOrderRequest {
  providerServiceId: string;
  categoryId: string;
  menuId: string;
  idempotencyKey: string;
  deliveryAddress: string;
  startDate: string;
  endDate: string;
}

export interface CreateOrderResponse {
  orderId: string;
  userId: string;
  customerName: string;
  providerId: string;
  providerName: string;
  menuId: string;
  menuName: string;
  periodName: string;
  quantity: number;
  unitPrice: number;
  orderPrice: number;
  paymentId: string;
  deliveryAddress: string;
  customerContactNumber: string;
  startDate: string;
  endDate: string;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
  message?: string;
}

export async function createOrder(
  payload: CreateOrderRequest
): Promise<CreateOrderResponse> {
  if (!API_BASE_URL) {
    throw new Error("ORDER API base URL is not configured");
  }

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60000);

  try {
    console.log("createOrder payload:", payload);

    const response = await fetch(`${API_BASE_URL}/Order/my-orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      let errorMessage = "Failed to create order";

      try {
        const errorJson = await response.json();
        errorMessage =
          errorJson?.message ||
          errorJson?.title ||
          errorJson?.error ||
          errorMessage;
      } catch {
        const errorText = await response.text();
        if (errorText) {
          errorMessage = errorText;
        }
      }

      throw new Error(errorMessage);
    }

    const data = (await response.json()) as CreateOrderResponse;
    console.log("createOrder response:", data);

    return data;
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new Error("Request timeout. Please try again.");
    }

    throw err;
  } finally {
    clearTimeout(timeout);
  }
}
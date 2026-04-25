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
    console.log("createOrder url:", `${API_BASE_URL}/Order`);

    const response = await fetch(`${API_BASE_URL}/Order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const responseText = await response.text();

    if (!response.ok) {
      let errorMessage = `Failed to create order (${response.status})`;

      if (responseText) {
        try {
          const errorJson = JSON.parse(responseText);
          errorMessage =
            errorJson?.message ||
            errorJson?.title ||
            errorJson?.error ||
            responseText ||
            errorMessage;
        } catch {
          errorMessage = responseText;
        }
      }

      throw new Error(errorMessage);
    }

    if (!responseText) {
      throw new Error("Empty response from server.");
    }

    const data = JSON.parse(responseText) as CreateOrderResponse;
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
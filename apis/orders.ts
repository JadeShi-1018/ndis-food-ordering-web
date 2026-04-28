const API_BASE_URL = process.env.NEXT_PUBLIC_ORDERS_API_URL;

export interface MyOrderDto {
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
}

export async function getMyOrders(): Promise<MyOrderDto[]> {
  if (!API_BASE_URL) {
    throw new Error("ORDER API base URL is not configured");
  }

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

    

  const response = await fetch(`${API_BASE_URL}/api/Order/my-orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
  let errorMessage = `Failed to load orders. Status: ${response.status}`;

  if(errorText){
    try {
      const errorJson = JSON.parse(errorText);
      errorMessage =
        errorJson?.errorMessage ||
        errorJson?.message ||
        errorJson?.title ||
        errorJson?.error ||
        errorMessage;
    } catch {
      errorMessage = errorText;
    }
  }
    

    throw new Error(errorMessage);
  }

  return (await response.json()) as MyOrderDto[];
}
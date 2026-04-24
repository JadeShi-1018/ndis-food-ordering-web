const PAYMENT_API_BASE_URL = process.env.NEXT_PUBLIC_PAYMENT_API_URL;

export interface PayPaymentRequest {
  paymentId: string;
}

export interface PayPaymentResponse {
  paymentId: string;
  paymentStatus: string;
  message: string;
}

export async function payPayment(paymentId: string): Promise<PayPaymentResponse> {
  if (!PAYMENT_API_BASE_URL) {
    throw new Error("PAYMENT API base URL is not configured");
  }

  if (!paymentId) {
    throw new Error("paymentId is required");
  }

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const payload: PayPaymentRequest = {
      paymentId,
    };

    console.log("payPayment request:", { paymentId, payload });

    const response = await fetch(
      `${PAYMENT_API_BASE_URL}/api/payment/pay/${paymentId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      }
    );

    if (!response.ok) {
      let errorMessage = "Failed to process payment";

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

    return (await response.json()) as PayPaymentResponse;
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new Error("Payment request timeout. Please try again.");
    }

    throw err;
  } finally {
    clearTimeout(timeout);
  }
}
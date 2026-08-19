
import axiosClient from "./axiosClient";

// POST /payments/process — amount in paise, currency, and a gateway token.
export const processPayment = (amountCents, token, currency = "INR") =>
  axiosClient
    .post("/payments/process", { amount_cents: amountCents, currency, token })
    .then((res) => res.data);

import axiosClient from "./axiosClient";
 
// body likely { order_id, ... } — confirm in Swagger
export const makePayment = (data) =>
  axiosClient.post("/api/payments/process", data).then((r) => r.data);
 
export const getBreakerStatus = () =>
  axiosClient.get("/api/payments/breaker_status").then((r) => r.data);
 
// aliases
export const processPayment = makePayment;
export const pay = makePayment;
 
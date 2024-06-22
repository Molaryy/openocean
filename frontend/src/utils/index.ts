export const displayBalance = (ugnot: number) => {
  const gnot = ugnot / 1000000;
  return gnot.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

import { constants } from "../constants";

export const displayBalance = (ugnot: number) => {
  const gnot = ugnot / 1000000;
  return displayGnot(gnot);
};

export const displayGnot = (gnot: number) => {
  return `${gnot.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })} GNOT`;
};

export const parseDataJson = <T>(data: string): T => {
  const content = data.slice(2, -'" string)'.length).replaceAll("\\", "");
  return JSON.parse(content);
};

export const urlFromIpfsHash = (hash: string) =>
  hash.includes("https://")
    ? hash
    : `https://${constants.pinataGateway}/ipfs/${hash}`;

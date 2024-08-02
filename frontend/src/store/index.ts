import { GnoJSONRPCProvider } from "@gnolang/gno-js-client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IAccountInfo } from "../services/adena/adena.types";

const useAccountStore = create<{
  address: string | null;
  balance: number;
  accountInfo: IAccountInfo | null;
  setAddress: (address: string) => void;
  setAccountInfo: (info: IAccountInfo) => void;
  setBalance: (balance: number) => void;
}>()(
  persist(
    (set) => ({
      address: null,
      accountInfo: null,
      balance: 0,
      setAddress: (address: string) => set({ address }),
      setAccountInfo: (accountInfo: IAccountInfo) => set({ accountInfo }),
      setBalance: (balance: number) => set({ balance }),
    }),
    {
      name: "account-storage",
    }
  )
);

const useProviderStore = create<{
  provider: GnoJSONRPCProvider | null;
  setProvider: (provider: GnoJSONRPCProvider) => void;
}>()(
  persist(
    (set) => ({
      provider: null,
      setProvider: (provider: GnoJSONRPCProvider) => set({ provider }),
    }),
    {
      name: "provider-storage",
    }
  )
);

export { useAccountStore, useProviderStore };

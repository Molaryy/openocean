import { GnoJSONRPCProvider } from "@gnolang/gno-js-client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IAccountInfo } from "../services/adena/adena.types";

const useAccountStore = create<{
  address: string | null;
  accountInfo: IAccountInfo | null;
  setAddress: (address: string) => void;
  setAccountInfo: (info: IAccountInfo) => void;
}>()(
  persist(
    (set) => ({
      address: null,
      accountInfo: null,
      setAddress: (address: string) => set({ address }),
      setAccountInfo: (accountInfo: IAccountInfo) => set({ accountInfo }),
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

import { GnoJSONRPCProvider } from "@gnolang/gno-js-client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAccountStore = create<{
  address: string | null;
  balance: number;
  setAddress: (address: string) => void;
  setBalance: (balance: number) => void;
}>()(
  persist(
    (set) => ({
      address: null,
      balance: 0,
      setAddress: (address: string) => set({ address }),
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

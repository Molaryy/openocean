import { GnoJSONRPCProvider } from "@gnolang/gno-js-client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAccountStore = create<{
  address: string | null;
  chainID: string | null;
  setAddress: (address: string) => void;
  setChainID: (chainID: string) => void;
}>()(
  persist(
    (set) => ({
      address: null,
      chainID: null,
      setAddress: (address: string) => set({ address }),
      setChainID: (chainID: string) => set({ chainID }),
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

import { useMemo } from "react";
import useGetAllCollections from "./useGetAllCollections";

const useGetAllNFTs = () => {
  const { data: collections } = useGetAllCollections();

  const nfts = useMemo(() => {
    const list = [];
    if (!collections) return [];
    for (const collection of collections) {
      for (const nft of collection.nfts) {
        if (!nft.isMinted) continue;
        list.push(nft);
      }
    }
    return list;
  }, [collections]);

  return { nfts };
};

export default useGetAllNFTs;

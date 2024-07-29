import { Nft } from "./nfts";

export interface CollectionStats {
  id: string;
  name: string;
  logo: string;
  volume: number;
  sales: number;
  nfts: Omit<Nft, "metadata">[];
}

export interface Collection {
  id: string;
  name: string;
  logo: string;
  owner: string;
  description: string;
  nfts: Nft[];
  sales: number;
  volume: number;
}

export interface CreateCollectionDto {
  name: string;
  symbol: string;
  description: string;
  logo: string;
  avaiableNfts: number;
}

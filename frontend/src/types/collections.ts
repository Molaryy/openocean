import { Nft } from "./nfts";

export interface Collection {
  id: string;
  name: string;
  logo: string;
  owner: string;
  description: string;
  nfts: Nft[];
}

export interface CreateCollectionDto {
  name: string;
  symbol: string;
  description: string;
  logo: string;
  avaiableNfts: number;
}

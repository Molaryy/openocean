export interface NftMetadata {
  name: string;
  description: string;
  owner: string;
  cid: string;
}

export interface Nft {
  id: string;
  owner: string;
  isMinted: boolean;
  metadata?: NftMetadata;
  price: number;
}

export interface MintDto {
  cltId: string;
  nftName: string;
  cid: string;
  description: string;
  price: number;
}

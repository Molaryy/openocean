export type NftMetadata = {
  name: string;
  description: string;
  owner: string;
  cid: string;
};

export type Nft = {
  id: string;
  owner: string;
  isMinted: boolean;
  metadata?: NftMetadata;
  price: number;
};

export type MintDto = {
  cltId: string;
  nftName: string;
  cid: string;
  description: string;
  price: number;
};

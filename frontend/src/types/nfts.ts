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
  isForSale: boolean;
  collectionId: string;
};

export type MintDto = {
  cltId: string;
  nftName: string;
  cid: string;
  description: string;
  price: number;
};

export type BuyNFTDto = {
  collectionId: string;
  nftId: string;
};

export type SetNFTForSaleDto = {
  collectionId: string;
  nftId: string;
  sellingState: boolean;
};

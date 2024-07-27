export interface NftMetadata {
  name: string;
  description: string;
  owner: string;
  ipfsUrl: string;
}

export interface Nft {
  id: string;
  owner: string;
  isMinted: boolean;
  metadata?: NftMetadata;
}

export interface MintDto {
  cltId: string;
  nftName: string;
  ipfsUrl: string;
  description: string;
  owner: string;
}

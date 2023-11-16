export interface FetchNftMarketReq {
  dateCreated: number;
}
export interface SelfFetchNftMarketReq {
  dateCreated: number;
  owner: string;
}
export interface FetchSingleNftMarketReq {
  id: string;
}
export interface FetchNftMarketRes {
  nfts: NftItemRes[];
}
export type NftItemRes = {
  id: string;
  owner: {
    id: string;
  };
  uri: string;
  description: string;
  dateCreated: string;
};

import { SUBGRAPH_NFT_MARKET_URL } from "@/consts/contract";
import { doGraphqlRequest } from "../graphqlRequest";
import {
  fetchMarketNftQuery,
  fetchSelfMarketNftQuery,
  fetchSingleNftQuery,
} from "../query/nftQuery";
import {
  FetchNftMarketReq,
  FetchNftMarketRes,
  FetchSingleNftMarketReq,
  SelfFetchNftMarketReq,
} from "./fetchNft_model";
import useSWR from "swr";
export const useFetchNftMarket = () => {
  const { url, execute } = doGraphqlRequest<
    FetchNftMarketReq,
    FetchNftMarketRes
  >(SUBGRAPH_NFT_MARKET_URL, fetchMarketNftQuery, { dateCreated: 0 });
  const { data, isLoading, error } = useSWR(url, execute, {
    revalidateOnFocus: false,
  });
  return {
    nftMarketData: data,
    isLoading,
    error,
  };
};
export const useSelfFetchNftMarket = (owner?: string) => {
  const { url, execute } = doGraphqlRequest<
    SelfFetchNftMarketReq,
    FetchNftMarketRes
  >(SUBGRAPH_NFT_MARKET_URL, fetchSelfMarketNftQuery, {
    dateCreated: 0,
    owner: owner ? owner.toLowerCase() : "",
  });
  const { data, isLoading, error } = useSWR([url, owner], execute);
  return {
    nftMarketData: data,
    isLoading,
    error,
  };
};

export const useFetchSingleNft = (id: string | null) => {
  const { url, execute } = doGraphqlRequest<
    FetchSingleNftMarketReq,
    FetchNftMarketRes
  >(
    SUBGRAPH_NFT_MARKET_URL,
    fetchSingleNftQuery,
    id
      ? {
          id: id,
        }
      : { id: "0" }
  );
  const { data, isLoading, error } = useSWR([url, id], execute);
  console.log(data);
  return {
    nftData: data,
    isLoading,
    error,
  };
};

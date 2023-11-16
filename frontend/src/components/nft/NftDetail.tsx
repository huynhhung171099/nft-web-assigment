"use client";
import { Suspense } from "react";
import Loading from "../utils/Loading";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { testIfValidURL } from "@/utils/validateString";
import { useFetchSingleNft } from "@/lib/graphql/request/fetchNft_api";
import Spacing from "../utils/Spacing";
const NftDetail = () => {
  const searchParams = useSearchParams();
  // E.g. `/dashboard?page=2&order=asc`
  const id = searchParams.get("id");
  const { nftData } = useFetchSingleNft(id);
  return nftData?.nfts && nftData.nfts.length > 0 ? (
    <div className="bg-gray-900 text-white flex flex-col space-y-5 items-center shadow-lg p-3 rounded-xl">
      <Suspense fallback={<Loading />}>
        <Image
          className="md:w-72 block rounded-xl"
          src={
            testIfValidURL(nftData.nfts[0].uri)
              ? nftData.nfts[0].uri
              : "/image/no_image.jpg"
          }
          height="300"
          width="300"
          alt="nft image"
        />
      </Suspense>
      <div className="mb-1 text-base">
        Desciption: {nftData.nfts[0].description}
      </div>

      <Spacing h="11px" />
      <div className="text-sm">Owner:</div>
      {nftData.nfts[0].owner.id}
      <div className="p-5 flex flex-col justify-center space-y-3">
        <div className="text-2xl text-white self-center">
          ID: {nftData.nfts[0].id}
        </div>
      </div>
    </div>
  ) : (
    <div className="text-7xl text-center text-white">Not Found ID = {id}</div>
  );
};
export default NftDetail;

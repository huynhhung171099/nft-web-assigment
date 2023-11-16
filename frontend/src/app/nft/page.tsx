import { Suspense } from "react";
import Loading from "@/components/utils/Loading";
import HeaderSection from "@/components/home/HeaderSection";
import Spacing from "@/components/utils/Spacing";
import NftDetail from "@/components/nft/NftDetail";
import { NFT_CONTRACT_ADDRESS } from "@/consts/contract";

export default function NftDetailPage() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <HeaderSection />
      </Suspense>
      <a
        className="text-white text-center"
        href="https://goerli.etherscan.io/address/0x6e4684badf4017bc0da987cfe1f6d1f17c40974a"
      >
        Contract: {NFT_CONTRACT_ADDRESS}
      </a>
      <Spacing h="100px"></Spacing>
      <Suspense fallback={<Loading />}>
        <NftDetail />
      </Suspense>
    </>
  );
}

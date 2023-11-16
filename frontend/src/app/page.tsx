import NftSection from "../components/home/NftSection";
import { Suspense } from "react";
import Loading from "@/components/utils/Loading";
import HeaderSection from "@/components/home/HeaderSection";
import Spacing from "@/components/utils/Spacing";
import SelfNftSection from "@/components/home/SelfNftSection";
import { NFT_CONTRACT_ADDRESS } from "@/consts/contract";

export default function Home() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <HeaderSection />
      </Suspense>
      <Spacing h="20px"></Spacing>
      <a
        className="ml-64 text-white"
        href="https://goerli.etherscan.io/address/0x6e4684badf4017bc0da987cfe1f6d1f17c40974a"
      >
        Contract: {NFT_CONTRACT_ADDRESS}
      </a>
      <Suspense fallback={<Loading />}>
        <NftSection title="Market Nft" />
      </Suspense>
      <Spacing h="100px"></Spacing>
      <Suspense fallback={<Loading />}>
        <SelfNftSection title="Your Nfts" />
      </Suspense>
    </>
  );
}

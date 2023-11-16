import NftSection from "../components/home/NftSection";
import { Suspense } from "react";
import Loading from "@/components/utils/Loading";
import HeaderSection from "@/components/home/HeaderSection";
import Spacing from "@/components/utils/Spacing";
import SelfNftSection from "@/components/home/SelfNftSection";

export default function Home() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <HeaderSection />
      </Suspense>
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

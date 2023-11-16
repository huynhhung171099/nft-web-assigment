import { Suspense } from "react";
import Loading from "@/components/utils/Loading";
import HeaderSection from "@/components/home/HeaderSection";
import Spacing from "@/components/utils/Spacing";
import NftDetail from "@/components/nft/NftDetail";

export default function NftDetailPage() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <HeaderSection />
      </Suspense>
      <Spacing h="100px"></Spacing>
      <Suspense fallback={<Loading />}>
        <NftDetail />
      </Suspense>
    </>
  );
}

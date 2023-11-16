import { Suspense } from "react";
import Loading from "@/components/utils/Loading";
import HeaderSection from "@/components/home/HeaderSection";
import MintForm from "@/components/mint/MintForm";

export default function NftMint() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <HeaderSection />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <MintForm />
      </Suspense>
    </>
  );
}

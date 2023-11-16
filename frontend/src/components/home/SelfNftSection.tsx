"use client";
import Loading from "@/components/utils/Loading";
import Spacing from "@/components/utils/Spacing";
import { useSelfFetchNftMarket } from "@/lib/graphql/request/fetchNft_api";
import Image from "next/image";
import { Suspense, useEffect, useRef, useState } from "react";
import ErrorAlertSection from "../utils/ErrorAlertSection";
import { formatStringToLimitChars } from "@/utils/formatString";
import { testIfValidURL } from "@/utils/validateString";
import { getCurrentAccount } from "@/lib/web3/account";

interface CardConfig {
  id: string;
  owner: string;
  description: string;
  uri: string;
  dateCreated: string;
}

const Card = (cardConfig: CardConfig) => {
  return (
    <div
      key={cardConfig.id}
      className="bg-gray-900 shadow-lg p-3 rounded-xl transform transition duration-500 hover:scale-110"
    >
      <div className="group relative rounded-md">
        <Suspense fallback={<Loading />}>
          <Image
            className="md:w-72 block rounded-xl"
            src={
              testIfValidURL(cardConfig.uri)
                ? cardConfig.uri
                : "/image/no_image.jpg"
            }
            height="300"
            width="300"
            alt="nft image"
          />
        </Suspense>
        <div
          style={{
            top: "0px"
          }}
          className="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full flex items-center group-hover:opacity-100 transition justify-evenly"
        >
          <button
            style={{ top: "0px" }}
            className="absolute text-white opacity-0 group-hover:translate-y-1 hover:scale-110 group-hover:opacity-100"
          >
            Nft Details
          </button>
          <div className="w-4/5 text-white transition transform translate-y-4 opacity-0 group-hover:translate-y-1 hover:scale-110 group-hover:opacity-100">
            <div className="mb-1 text-base">
              Desciption:
              {formatStringToLimitChars(cardConfig.description, 100)}
            </div>

            <Spacing h="11px" />
            <div className="text-sm">Owner:</div>
            {formatStringToLimitChars(cardConfig.owner, 20)}
          </div>
        </div>
      </div>
      <div className="p-5 flex flex-col justify-center space-y-3">
        <div className="text-2xl text-white self-center">
          ID: {cardConfig.id}
        </div>
        <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-2 px-4 rounded hover:from-purple-500 hover:to-pink-500 transition duration-300">
          Detail
        </button>
      </div>
    </div>
  );
};

function SelfNftSection({ title }: { title: string }) {
  const [owner, setOwner] = useState<string>();
  const { nftMarketData, error } = useSelfFetchNftMarket(owner);

  useEffect(() => {
    async function setAnOwner() {
      const account = await getCurrentAccount();
      if (account) {
        setOwner(account);
      }
    }
    setAnOwner();
  }, []);
  return (
    <>
      {error ? (
        <ErrorAlertSection message={error.message}></ErrorAlertSection>
      ) : (
        <></>
      )}
      {nftMarketData ? (
        <div className="grid min-h-screen overflow-auto place-items-center bg-gradient-to-t from-indigo-900 to-slate-700 p-5">
          <Spacing h="50px"></Spacing>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-200">
            {title}
          </h1>
          <Spacing h="100px"></Spacing>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nftMarketData.nfts.map(value => {
              return Card({
                id: value.id,
                owner: value.owner.id,
                uri: value.uri,
                description: value.description,
                dateCreated: value.dateCreated
              });
            })}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default SelfNftSection;

"use client";

import { getContract } from "@/lib/web3/contract";
import { useState } from "react";
import CheckedAlert from "../utils/CheckedAlertSection";
import Spacing from "../utils/Spacing";
import { NFT_CONTRACT_ADDRESS } from "@/consts/contract";

export default function MintForm() {
  const [uri, setUri] = useState("");
  const [description, setDescription] = useState("");
  const [mintSuccess, setMintSuccess] = useState(false);
  const [account, setAccount] = useState(
    "0x87781d2e4ce7b3869481e8b75344b936bc967120"
  );
  async function mintNft() {
    const contract = await getContract();
    const tx = await contract?.requestNftItem(uri, description, account);
    await tx.wait();
    setMintSuccess(true);
    setTimeout(() => {
      setMintSuccess(false);
    }, 5000);
  }
  return (
    <>
      {mintSuccess ? (
        <CheckedAlert message="mint success you can get to home page to see after few seconds"></CheckedAlert>
      ) : (
        <></>
      )}
      <div className="flex flex-col space-y-4">
        <div className="text-lg font-medium text-white">URL</div>
        <input
          type="url"
          id="url"
          name="url"
          onChange={e => {
            setUri(e.target.value);
          }}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://example.com"
          required
        />

        <label htmlFor="description" className="text-lg font-medium text-white">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          onChange={e => {
            setDescription(e.target.value);
          }}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter a description"
          required
        ></textarea>
        <label htmlFor="description" className="text-lg font-medium text-white">
          Owner
        </label>
        <input
          type="text"
          onChange={e => {
            setAccount(e.target.value);
          }}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="0x87781d2e4ce7b3869481e8b75344b936bc967120"
          required
        />
        <button
          onClick={async () => {
            await mintNft();
          }}
          className="bg-gradient-to-r from-green-300 via-emerald-500 to-green-600 font-bold py-2 px-4 rounded hover:bg-gradient-to-l hover:from-purple-400 hover:via-indigo-500 hover:to-purple-800 hover:shadow-md hover:shadow-slate-500"
        >
          {"Mint"}
        </button>
        <Spacing h="150px"></Spacing>
        <a
          className="text-white text-center"
          href="https://goerli.etherscan.io/address/0x6e4684badf4017bc0da987cfe1f6d1f17c40974a"
        >
          Contract: {NFT_CONTRACT_ADDRESS}
        </a>
        <button
          onClick={() => {
            window.location.assign(
              "https://goerli.etherscan.io/address/0x6e4684badf4017bc0da987cfe1f6d1f17c40974a"
            );
          }}
          className="bg-gradient-to-r from-green-300 via-emerald-500 to-green-600 font-bold py-2 px-4 rounded hover:bg-gradient-to-l hover:from-purple-400 hover:via-indigo-500 hover:to-purple-800 hover:shadow-md hover:shadow-slate-500"
        >
          {"View Contract"}
        </button>
      </div>
    </>
  );
}

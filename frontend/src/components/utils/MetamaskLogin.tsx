"use client";
import { MetaMaskButton, MetaMaskUIProvider } from "@metamask/sdk-react-ui";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spacing from "./Spacing";

export const MetamaskLogin = () => {
  const router = useRouter();
  const [account, setAccount] = useState<string>();
  function handleAccountsChanged(accounts: string[]) {
    if (accounts[0] !== account) {
      setAccount(accounts[0]);
    }
  }
  useEffect(() => {
    try {
      if (window.ethereum !== undefined) {
        window.ethereum
          .request({ method: "eth_accounts" })
          .then(accounts => {
            handleAccountsChanged(accounts as string[]);
          })
          .catch(err => {
            if (err.code === 4001) {
              console.log("Please connect to MetaMask.");
            } else {
              console.error(err);
            }
          });
      }
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  });

  return (
    <MetaMaskUIProvider
      sdkOptions={{
        dappMetadata: {
          name: "App"
        }
      }}
    >
      <div className="flex flex-row">
        {account ? (
          <button
            onClick={async () => {
              router.push("/mint");
            }}
            className="bg-gradient-to-r from-green-300 via-emerald-500 to-green-600 font-bold py-2 px-4 rounded hover:bg-gradient-to-l hover:from-purple-400 hover:via-indigo-500 hover:to-purple-800 hover:shadow-md hover:shadow-slate-500"
          >
            {"Mint now"}
          </button>
        ) : (
          <></>
        )}
        <Spacing w="20px"></Spacing>
        <MetaMaskButton theme={"dark"} color="blue"></MetaMaskButton>
      </div>
    </MetaMaskUIProvider>
  );
};

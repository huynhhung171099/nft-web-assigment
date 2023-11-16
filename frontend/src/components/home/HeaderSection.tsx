"use client";

import { MetamaskLogin } from "../utils/MetamaskLogin";
export default function HeaderSection() {
  return (
    <div className="sticky z-50 top-0 2xl:container 2xl:mx-auto bg-gray-900 rounded shadow-lg py-5 px-7">
      <nav className="flex mx-2 justify-between">
        <div className="flex items-center space-x-3 lg:pr-16 pr-6">
          <h1
            onClick={() => window.location.assign("/")}
            className="text-white text-2xl hover:cursor-pointer"
          >
            Market Nft
          </h1>
        </div>
        <MetamaskLogin />
      </nav>
    </div>
  );
}

import { BigInt } from "@graphprotocol/graph-ts";
import { ADDRESS_ZERO, NFT_ADDRESS } from "../../package/constants/index";
import { MarketNft } from "../../generated/schema";

export function getMarketNft(): MarketNft {
  let nft = MarketNft.load(NFT_ADDRESS.toHex());

  if (nft === null) {
    nft = new MarketNft(NFT_ADDRESS.toHex());
    nft.tokenAddress = ADDRESS_ZERO;
    nft.transferCount = BigInt.zero();
    nft.nftCount = BigInt.zero();
    nft.userCount = BigInt.zero();
    nft.recentTransfer = "0";
    nft.recentNftIdCreated = "0";
    nft.save();
  }

  return nft;
}

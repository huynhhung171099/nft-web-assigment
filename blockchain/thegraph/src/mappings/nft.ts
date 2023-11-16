import { BigInt } from "@graphprotocol/graph-ts";
import {
  RequestedNftItem as RequestedNftItemEvent,
  Transfer as TransferEvent,
} from "../../generated/Nft/Nft";
import { ADDRESS_ZERO, BIG_INT_ONE } from "../../package/constants";
import { getTransfer, getUser, getMarketNft, getNft } from "../entites";

/**
 * Get Mint Event and store it
 * return 0, if not found
 */

export function handleRequestedNftItem(event: RequestedNftItemEvent): void {
  let marketNft = getMarketNft();
  marketNft.nftCount = marketNft.nftCount.plus(BIG_INT_ONE);
  marketNft.recentNftIdCreated = event.params.requestId.toString();
  marketNft.save();
  // Force creation of users if not already known will be lazily created
  let user = getUser(event.params.requester);
  user.numberOfNfts = user.numberOfNfts.plus(BIG_INT_ONE);
  user.save();

  let nft = getNft(event.params.requestId.toString());
  nft.owner = user.id;
  nft.description = event.params.description.toString();
  nft.uri = event.params.uri.toString();
  nft.marketNft = marketNft.id;
  nft.dateCreated = event.block.timestamp;
  nft.save();
}

export function handleTransfer(event: TransferEvent): void {
  let marketNft = getMarketNft();
  let transfer = getTransfer(marketNft.transferCount.toString());
  marketNft.transferCount = marketNft.transferCount.plus(BIG_INT_ONE);
  marketNft.recentTransfer = transfer.id;
  transfer.blockNumber = event.block.number;
  transfer.timestamp = event.block.timestamp;
  transfer.from = event.params.from;
  transfer.to = event.params.to;
  transfer.nft = event.params.tokenId.toString();
  transfer.txHash = event.transaction.hash;
  marketNft.save();
  transfer.save();
  let nft = getNft(event.params.tokenId.toString());

  // Force creation of users if not already known will be lazily created
  let from = getUser(event.params.from);
  let to = getUser(event.params.to);

  nft.owner = to.id;
  nft.recentTransfer = transfer.id;
  nft.save();
  if (event.params.from == ADDRESS_ZERO) {
    getUser(event.params.from);
    return;
  }
  from.numberOfNfts = from.numberOfNfts.minus(BigInt.fromString("1"));
  to.numberOfNfts = to.numberOfNfts.plus(BigInt.fromString("1"));
  from.save();
  to.save();
}

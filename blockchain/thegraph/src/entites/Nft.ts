import { BigInt } from "@graphprotocol/graph-ts";
import { ADDRESS_ZERO, BIG_INT_ZERO } from "../../package/constants/index";
import { Nft } from "../../generated/schema";
import { getUser } from "./User";

export function getNft(id: string = "-1"): Nft {
  let nft = Nft.load(id);

  if (nft === null) {
    nft = new Nft(id);
    nft.clearId = BigInt.fromString(id);
    nft.marketNft = ADDRESS_ZERO.toHex();
    nft.description = "NULL";
    nft.uri = "NULL";
    nft.owner = ADDRESS_ZERO.toHex();
    nft.dateCreated = BigInt.zero();
    nft.recentTransfer = "0";
    nft.save();
  }

  return nft;
}

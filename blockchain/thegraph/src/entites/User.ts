import { Address, BigInt } from "@graphprotocol/graph-ts";
import { User } from "../../generated/schema";
import { ADDRESS_ZERO, BIG_INT_ONE } from "../../package/constants";
import { getMarketNft } from "./MarketNft";

export function getUser(id: Address = ADDRESS_ZERO): User {
  let user = User.load(id.toHex());

  if (user === null) {
    user = new User(id.toHex());
    user.numberOfNfts = BigInt.zero();
    let aniwar = getMarketNft();
    aniwar.userCount = aniwar.userCount.plus(BIG_INT_ONE);
    aniwar.save();
    user.save();
  }
  return user;
}

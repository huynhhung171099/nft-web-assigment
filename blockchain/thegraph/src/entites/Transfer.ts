import { ADDRESS_ZERO } from "../../package/constants";
import { BigInt } from "@graphprotocol/graph-ts";
import { Transfer } from "../../generated/schema";

export function getTransfer(id: string = "-1"): Transfer {
  let transfer = Transfer.load(id);

  if (transfer === null) {
    transfer = new Transfer(id);
    transfer.clearId = BigInt.fromString(id);
    transfer.blockNumber = BigInt.zero();
    transfer.timestamp = BigInt.zero();
    transfer.from = ADDRESS_ZERO;
    transfer.to = ADDRESS_ZERO;
    transfer.txHash = ADDRESS_ZERO;
    transfer.nft = "0";
    transfer.save();
  }

  return transfer;
}

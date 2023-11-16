import {
  Address,
  BigDecimal,
  BigInt,
} from "@graphprotocol/graph-ts/common/numbers";

export const BIG_DECIMAL_ZERO = BigDecimal.zero();
export const BIG_DECIMAL_ONE = BigDecimal.fromString("1");

export const BIG_INT_ZERO = BigInt.zero();
export const BIG_INT_ONE = BigInt.fromI32(1);
export const NULL_CALL_RESULT_VALUE =
  "0x0000000000000000000000000000000000000000000000000000000000000001";

export const ADDRESS_ZERO = Address.fromString(
  "0x0000000000000000000000000000000000000000"
);

export const NFT_ADDRESS = Address.fromString(
  "0x6e4684badf4017bc0da987cfe1f6d1f17c40974a"
);
export const BIG_DECIMAL_18 = BigDecimal.fromString("1000000000000000000");

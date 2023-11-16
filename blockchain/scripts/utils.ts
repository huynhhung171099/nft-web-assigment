import { run } from "hardhat";
import "@nomiclabs/hardhat-etherscan";
export async function verifyContract(
  contractAddress: any,
  constructorArguments: any
) {
  await run("verify:verify", {
    address: contractAddress,
    constructorArguments: constructorArguments,
  });
}

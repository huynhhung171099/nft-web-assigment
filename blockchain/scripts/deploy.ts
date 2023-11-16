import { ethers } from "hardhat";
import { verifyContract } from "./utils";
const DEPLOY_STEP = 1;
async function main() {
  let step = 0;
  // Contracts are deployed using the first signer/account by default
  const [dev] = await ethers.getSigners();
  const Nft = await ethers.getContractFactory("Nft");
  const nft = await Nft.connect(dev).deploy(dev.address);
  await nft.deployed();

  console.log(step++, ". AniwarNftController: ", nft.address);

  await new Promise((resolve) => {
    setTimeout(resolve, 40000);
    console.log("step done waiting verify...");
  });
  //Verify contract
  try {
    await verifyContract(nft.address, [dev.address]);
  } catch (e) {
    console.log("Can not verify: ");
    console.log(e);
  }
  await new Promise((resolve) => setTimeout(resolve, 15000));
  return {
    nft,
  };
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

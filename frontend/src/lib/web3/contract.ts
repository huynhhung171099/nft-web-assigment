import { NFT_CONTRACT_ADDRESS } from "@/consts/contract";
import { ethers } from "ethers";
const abi = [
  "function requestNftItem(string memory uri, string memory description, address owner)",
];
export async function getContract() {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(NFT_CONTRACT_ADDRESS, abi, signer);
  }
}

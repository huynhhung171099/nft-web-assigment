import { expect } from "chai";
import { ethers } from "hardhat";
describe("Lock", function() {
  async function deploy() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const Nft = await ethers.getContractFactory("Nft");
    const nft = await Nft.connect(owner).deploy(owner.address);

    return { nft, owner, otherAccount };
  }

  describe("Deployment", function() {
    it("Should set the right owner", async function() {
      const { nft, owner } = await deploy();
      const currOwner = await nft.owner();
      expect(currOwner).to.equal(owner.address);
    });
    it("Should okay for mint", async function() {
      const { nft, owner } = await deploy();
      const tokenId = 0;
      const uri = "https://google.com";
      const desc = "new item des";
      const nftReq = await nft.requestNftItem(uri, desc, owner.address);
      nftReq.wait(1);
      // Expect owner has one nft
      expect((await nft.balanceOf(owner.address)).toString()).to.equal("1");

      // Expect owner to be own this nft
      const trueOwner = await nft.ownerOf(tokenId);
      expect(trueOwner).to.equal(owner.address);

      // Expect uri equal
      const nftUri = await nft.getTokenURI(tokenId);
      expect(nftUri).to.equal(uri);

      // Expect attribute equal
      const nftItem = await nft.nftItems(tokenId);
      expect(nftItem.description).to.equal(desc);
    });
  });
});

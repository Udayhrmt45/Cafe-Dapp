import { expect } from "chai";
import pkg from 'hardhat';
const { ethers } = pkg;

describe("Cafe Contract", function () {
  let Cafe;
  let cafe;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // Get the contract factory and signers
    Cafe = await ethers.getContractFactory("cafe");
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy the contract
    cafe = await Cafe.deploy();
    await cafe.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await cafe.owner()).to.equal(owner.address);
    });
  });

  describe("Transactions", function () {
    it("Should allow a user to buy an item", async function () {
      // User buys an item by sending 1 ether
      await expect(
        cafe.connect(addr1).buyItem("Alice", "Enjoy your coffee!", { value: ethers.utils.parseEther("1") })
      ).to.changeEtherBalance(owner, ethers.utils.parseEther("1"));

      // Check that the memo was added
      const memos = await cafe.getMemos();
      expect(memos.length).to.equal(1);
      expect(memos[0].name).to.equal("Alice");
      expect(memos[0].message).to.equal("Enjoy your coffee!");
      expect(memos[0].from).to.equal(addr1.address);
    });

    it("Should fail if the payment is 0 ether", async function () {
      await expect(
        cafe.connect(addr1).buyItem("Bob", "Thank you!", { value: ethers.utils.parseEther("0") })
      ).to.be.revertedWith("Please pay more than 0 ether");
    });

    it("Should store multiple memos", async function () {
      await cafe.connect(addr1).buyItem("Alice", "Great coffee!", { value: ethers.utils.parseEther("0.5") });
      await cafe.connect(addr2).buyItem("Bob", "Loved the tea!", { value: ethers.utils.parseEther("0.2") });

      const memos = await cafe.getMemos();
      expect(memos.length).to.equal(2);
      expect(memos[0].name).to.equal("Alice");
      expect(memos[0].message).to.equal("Great coffee!");
      expect(memos[0].from).to.equal(addr1.address);
      expect(memos[1].name).to.equal("Bob");
      expect(memos[1].message).to.equal("Loved the tea!");
      expect(memos[1].from).to.equal(addr2.address);
    });
  });
});

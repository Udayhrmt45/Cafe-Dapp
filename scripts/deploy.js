const hre = require("hardhat");

async function main() {
  const Cafe = await hre.ethers.getContractFactory("cafe"); //fetching bytecode and ABI
  const cafe = await Cafe.deploy(); //creating an instance of our smart contract

  await cafe.waitForDeployment();//deploying your smart contract

  console.log("Deployed contract address:", await cafe.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

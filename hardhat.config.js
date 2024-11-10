require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */


module.exports = {
  solidity: "0.8.27",
  defaultNetwork:"sepolia",
  networks:{
    sepolia:{
      url:`https://sepolia.infura.io/v3/${process.env.SEPOLIA_URL}`,
      accounts:[process.env.PRIVATE_KEY],
    }
  }
};



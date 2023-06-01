require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: ["00d24812427da03a1a01742cd24783cacb12e85628a96a7540290dddc2ebbb43"]
    }
  }
};

import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "./tasks/Token.task"

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.11",
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    teleport: {
      url: 'https://teleport-localvalidator.qa.davionlabs.com/',
      gasPrice: 5000000000,
      chainId: 7001,
      gas: 4100000,
      accounts:['8f14df1da1a318bec99800b72c5031e4fdc4ec017f00ab9659339ecb0193120e']
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;

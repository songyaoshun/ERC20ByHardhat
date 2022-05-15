import { ethers } from "hardhat";
import { TestToken__factory } from '../typechain-types'


async function main() {
  const accounts = await ethers.getSigners()
  const erc20 = await new TestToken__factory(accounts[0]).deploy("Test Token", "TE");
  await erc20.deployed();

  console.log("ERC20 Token deployed to:", erc20.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

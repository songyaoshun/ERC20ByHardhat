const fs = require("fs");
import "@nomiclabs/hardhat-web3";
import { task } from "hardhat/config";
import { TestToken__factory } from '../typechain-types'

task("accounts", "Prints the list of accounts", async (taskArgs,hre) => {

    const accounts = await hre.ethers.getSigners();
    for (const account of accounts) {
      console.log(account.address);
    }
  });

task("qBalance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs, { web3 }) => {

    const account = web3.utils.toChecksumAddress(taskArgs.account);
    const balance = await web3.eth.getBalance(account);

    console.log(web3.utils.fromWei(balance, "ether"), "ETH");
  });

task("qBalanceOfERC20", "Prints an account's balance")
  .addParam("account", "The account's address")
  .addParam("token", "The token's address")
  .setAction(async (taskArgs, hre) => {

    const accounts = await hre.ethers.getSigners();
    const erc20 = await new TestToken__factory(accounts[0]).attach(taskArgs.token)

    const balance = await erc20.balanceOf(taskArgs.account)
    console.log("balance: ", balance.toString())
  });

task("mint", "Prints an account's balance")
  .addParam("account", "The account's address")
  .addParam("token", "The token's address")
  .setAction(async (taskArgs,hre) => {
    const accounts = await hre.ethers.getSigners();
    const erc20 = await new TestToken__factory(accounts[0]).attach(taskArgs.token)

    const txn = await erc20.mint(taskArgs.account, "123456789000000000000000000")

    console.log("txn hash: ",txn.hash)
  });

task("autoMint", "给1000个地址mint", async (taskArgs, hre)=>{
    const accounts = await hre.ethers.getSigners();
    const tokenFactory = await hre.ethers.getContractFactory("TestToken")
    const erc20 = await tokenFactory.attach("0x74F39688CFf9a2B825AdF429a99496fea6877913")

    let secrects = read_csv('./secrect.csv')
    for (let i = 1;i<1000;i++){
        await erc20.mint(secrects[i][1], "123456789000000000000000000")
        const balances = (await erc20.balanceOf(secrects[i][1])).toString()
        console.log(secrects[i][1], balances)
    }
})

task("autoQBalances", "给1000个地址mint", async (taskArgs, hre)=>{
  const accounts = await hre.ethers.getSigners();
  const tokenFactory = await hre.ethers.getContractFactory("TestToken")
  const erc20 = await tokenFactory.attach("0x74F39688CFf9a2B825AdF429a99496fea6877913")

  let secrects = read_csv('./secrect.csv')
  for (let i = 1;i<1000;i++){
      const balances = (await erc20.balanceOf(secrects[i][1])).toString()
      console.log(secrects[i][1], balances)
    }
})

task("autoTB","给1000个地址转入2个Tele")
    .setAction(async (taskArgs, hre) => {

      const secrects = read_csv('./secrect.csv')
      for (let i = 1;i<1000;i++){
          let tx =await hre.web3.eth.sendTransaction({
            from:"0x387F83710c848Ead3047B2cDF85Ad87127309A49",
            to:secrects[i][1],
            value:"2000000000000000000",
        })
        console.log(tx.transactionHash)
    }
});

function read_csv(csvfile: any){
    let csvstr: string = fs.readFileSync(csvfile,"utf8",'r+');
    let arr: string[] = csvstr.split('\n');
    let array: any = [];
    arr.forEach(line => {
      array.push(line.split(','));
    });
    return array
  }

module.exports = {};
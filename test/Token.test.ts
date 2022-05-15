import { Signer} from "ethers"
import { TestToken, TestToken__factory } from '../typechain-types'
import {expect} from "chai"

const { ethers } = require("hardhat")

describe('Transfer', () => {
    let accounts: Signer[]
    let erc20: TestToken
    const srcChainName = "srcChain"
    const destChainName = "dstChain"
    const relayChainName = ""

    before('deploy Transfer', async () => {
        accounts = await ethers.getSigners()
        await deployToken()
    })

    it("test transfer ERC20", async () => {

        await erc20.mint(await accounts[1].getAddress(), 10000000000000)
        expect((await erc20.balanceOf(await accounts[1].getAddress()))
            .toString()).to.eq("10000000000000")

        await erc20.mint(await accounts[2].getAddress(), 10000000000000)
        expect((await erc20.balanceOf(await accounts[2].getAddress()))
            .toString()).to.eq("10000000000000")

        await erc20.mint(await accounts[3].getAddress(), 10000000000000)
        expect((await erc20.balanceOf(await accounts[3].getAddress()))
            .toString()).to.eq("10000000000000")
    })

    const deployToken = async () => {

        erc20 = await new TestToken__factory(accounts[0]).deploy("Testcoin", "abiton");
        await erc20.deployed();

        await erc20.mint(await accounts[0].getAddress(), 10000000000000)
        expect((await erc20.balanceOf(await accounts[0].getAddress()))
            .toString()).to.eq("10000000000000")
    }
})
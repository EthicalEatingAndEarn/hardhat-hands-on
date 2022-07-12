import { expect } from "chai";
import "@nomiclabs/hardhat-ethers";
import { ethers, deployments } from "hardhat";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { OneTwoThree } from "../typechain-types";


describe("OneTwoThree Game", async () => {
  let game: OneTwoThree;
  let accounts: SignerWithAddress[];
  let owner: SignerWithAddress;

  beforeEach(async () => {
    const { OneTwoThree } = await deployments.fixture(["OneTwoThree"]);

    game = (await ethers.getContractAt(
      "OneTwoThree",
      OneTwoThree.address,
      owner
    )) as OneTwoThree;

    accounts = await ethers.getSigners()
    owner = accounts[0]
  });

  it("can enter 3", async () => {
    expect(await game.max()).to.equal(30);
    await expect(game.connect(accounts[1]).inc(3)).to.emit(game, "Inc").withArgs(accounts[1].address)
  });

  it("cannot enter above 4", async () => {
    await expect(game.connect(accounts[1]).inc(4)).to.revertedWith("you can enter number 3 or less.")
  });

  it("Lose above 30", async () => {
    await expect(game.connect(accounts[1]).inc(3)).to.emit(game, "Inc").withArgs(accounts[1].address)
    await expect(game.connect(accounts[2]).inc(3)).to.emit(game, "Inc").withArgs(accounts[2].address)
    await expect(game.connect(accounts[3]).inc(3)).to.emit(game, "Inc").withArgs(accounts[3].address)
    await expect(game.connect(accounts[1]).inc(3)).to.emit(game, "Inc").withArgs(accounts[1].address)
    await expect(game.connect(accounts[2]).inc(3)).to.emit(game, "Inc").withArgs(accounts[2].address)
    await expect(game.connect(accounts[3]).inc(3)).to.emit(game, "Inc").withArgs(accounts[3].address)
    await expect(game.connect(accounts[1]).inc(3)).to.emit(game, "Inc").withArgs(accounts[1].address)
    await expect(game.connect(accounts[2]).inc(3)).to.emit(game, "Inc").withArgs(accounts[2].address)
    await expect(game.connect(accounts[3]).inc(3)).to.emit(game, "Inc").withArgs(accounts[3].address)
    await expect(game.connect(accounts[1]).inc(3)).to.emit(game, "GameOver").withArgs(accounts[1].address)
    // await expect(game.connect(signer).inc(3)).to.be.revertedWith("the game was over. create new game")
  });
});

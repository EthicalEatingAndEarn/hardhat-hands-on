import { NetworksUserConfig } from "hardhat/types";
import dotenv from 'dotenv';

dotenv.config();

const networks: NetworksUserConfig = {};

if (process.env.PRIVATE_KEY) {
  networks.goerli = {
    chainId: 5,
    url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
    accounts: [process.env.PRIVATE_KEY],
  };
} else {
  console.log("fill private key to .env")
  networks.hardhat = {}
}

export default networks;
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import { SimpleAccountAPI } from "@account-abstraction/sdk";

const InitAA = async (hre: HardhatRuntimeEnvironment) => {
  const { ethers } = hre;
  const mnemonic =
    "either clever polar crack agree edge area effort portion movie outdoor drastic";

  const entryPointAddress = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
  const factoryAddress = "0x9406Cc6185a346906296840746125a0E44976454";
  const rpcUrl =
    "https://api.stackup.sh/v1/node/09b0b15c992db3bc056c367840e10df3e816ea4a80a6a144d06d4e3f6a6547d1";

  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

  const wallets = [];
  var scw = [];
  for (let i = 0; i < 10; i++) {
    const wallet = ethers.Wallet.fromMnemonic(mnemonic, `m/44'/0'/0'/0/${i}`);
    wallets.push(wallet);
  }

  for (let i = 0; i < 10; i++) {
    const owner = wallets[i];
    const walletAPI = new SimpleAccountAPI({
      provider,
      entryPointAddress,
      owner,
      factoryAddress,
    });
    console.log("Owner Address : ", wallets[i].address);
    console.log("Owner Private Key : ", wallets[i].privateKey);
    console.log(
      "Smart Contract Wallet Address : ",
      await walletAPI.getAccountAddress()
    );
    console.log("");
  }
};

task("initaa", "An example task").setAction(async (_, hre) => {
  await InitAA(hre);
});

export default InitAA;

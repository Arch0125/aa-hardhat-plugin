import { HardhatRuntimeEnvironment } from "hardhat/types";
import { task } from "hardhat/config";
import { ethers } from "ethers";

const InitAA = async (hre: HardhatRuntimeEnvironment) => {
  const mnemonic = "test test test test test test test test test test test junk";

  const entryPointAddress = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
  const factoryAddress = "0x9406Cc6185a346906296840746125a0E44976454";
  const rpcUrl = "http://localhost:8545";

  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

  const wallets = [];
  var scw = [];
  for (let i = 0; i < 10; i++) {
    const wallet = ethers.Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${i}`);
    wallets.push(wallet);
  }

  const factory = new ethers.Contract("SimpleAccountFactory",'0x9406Cc6185a346906296840746125a0E44976454',provider)

  for (let i = 0; i < 10; i++) {
    const owner = wallets[i];
    await factory.createAccount(owner.address, "");
    console.log("Owner Address : ", wallets[i].address);
    console.log("Owner Private Key : ", wallets[i].privateKey);
    console.log(
      "Smart Contract Wallet Address : ",
      await factory.getAddress(owner.address,'')
    );
    console.log("");
  }
};

task("initaa", "An example task").setAction(async (_, hre) => {
  await InitAA(hre);
});

export default InitAA;

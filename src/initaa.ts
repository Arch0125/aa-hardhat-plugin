import { HardhatRuntimeEnvironment } from "hardhat/types";
import { task } from "hardhat/config";
import { ethers } from "ethers";
import factoryinterface from "./factoryinterface.json";

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

  
  for (let i = 0; i < 10; i++) {
    let owner = wallets[i];
    let signer = new ethers.Wallet(owner.privateKey, provider);
    let factory = new ethers.Contract("0x9406Cc6185a346906296840746125a0E44976454",factoryinterface.abi,signer)
    await factory.createAccount(wallets[i].address,ethers.BigNumber.from('0'))
    let scw = await factory.getAddress(wallets[i].address,ethers.BigNumber.from('0'))
    console.log("Owner Address : ", wallets[i].address);
    console.log("Owner Private Key : ", wallets[i].privateKey);
    console.log(
      "Smart Contract Wallet Address : ",
      scw
    );
    await signer.sendTransaction({
      to: scw,
      value: ethers.utils.parseEther("100.0"),
    })
    console.log("Smart Contract Wallet Balance : ", ethers.utils.formatEther(await provider.getBalance(scw)));
    console.log("");
  }
};

task("initaa", "An example task").setAction(async (_, hre) => {
  await InitAA(hre);
});

export default InitAA;

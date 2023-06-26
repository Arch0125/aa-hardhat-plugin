import { HardhatRuntimeEnvironment } from "hardhat/types";
import { task } from "hardhat/config";
import { spawn } from "child_process";
import clc from "cli-color";

export const DeployFactory = (hre:HardhatRuntimeEnvironment) => {
    return new Promise((resolve, reject) => {
        const child = spawn('sh', ['-c', `cp ${__dirname}/../../src/helper/BNPairingPrecompileCostEstimator.sol ${__dirname}/../../src/account-abstraction/contracts/samples/bls/lib/hubble-contracts/contracts/libs && cd ${__dirname}/../../src/account-abstraction && yarn && yarn deploy --network dev `]);
        console.log(clc.whiteBright.bgGreen(`Deploying Entrypoint and Factory...`));
        child.stdout.on('data', (data) => {
            console.log(clc.whiteBright.bgGreen(`STDOUT`));
            console.log(`${data}`);
        });

        child.stderr.on('data', (data) => {
            console.log(clc.whiteBright.bgRed(`STDERR`))
            console.error(`${data}`);
        });

        child.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            if (code !== 0) {
                reject(new Error(`child process exited with code ${code}`));
            } else {
                resolve(null);
            }
        });

        child.on('error', (error) => {
            console.error(`child process error: ${error}`);
            reject(error);
        });
    });
}




task("deployfactory", "Deploy Entrypoint and Factory").setAction(async (_, hre) => {
    await DeployFactory(hre);
});
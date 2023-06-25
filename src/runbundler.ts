import { HardhatRuntimeEnvironment } from "hardhat/types";
import { task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import {exec} from "child_process";
import { spawn } from "child_process";
import clc from "cli-color";

export const RunBundler = (hre:HardhatRuntimeEnvironment) => {
    return new Promise((resolve, reject) => {
        const child = spawn('sh', ['-c', 'cd ./node_modules/hardhat-aa/src/bundler && yarn && yarn preprocess && yarn hardhat-deploy --network localhost && yarn run bundler --unsafe']);
        console.log(clc.whiteBright.bgGreen(`Bundler is starting...`));
        child.stdout.on('data', (data) => {
            console.log(clc.whiteBright.bgGreen(`STDOUT`));
            console.log(`${data}`);
            if(data.includes('running on http://localhost:3000/rpc')){
                console.log(clc.bgGreen.whiteBright.bold(`Bundler is running on http://localhost:3000/rpc`));
            }
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




task("runbundler", "An example task").setAction(async (_, hre) => {
    await RunBundler(hre);
});
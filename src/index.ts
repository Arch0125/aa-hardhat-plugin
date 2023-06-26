import { extendConfig, extendEnvironment } from "hardhat/config";
import { lazyObject } from "hardhat/plugins";
import { HardhatConfig, HardhatUserConfig } from "hardhat/types";
import path from "path";

import "./type-extensions";
import "./initaa";
import InitAA from "./initaa";
import "./runbundler";
import { RunBundler } from "./runbundler";
import { DeployFactory } from "./deployfactory";
import './deployfactory';
extendConfig(
  (config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => {
    const userPath = userConfig.paths?.newPath;

    let newPath: string;
    if (userPath === undefined) {
      newPath = path.join(config.paths.root, "newPath");
    } else {
      if (path.isAbsolute(userPath)) {
        newPath = userPath;
      } else {
        newPath = path.normalize(path.join(config.paths.root, userPath));
      }
    }

    config.paths.newPath = newPath;
  }
);

extendEnvironment((hre) => {
  hre.initaa=InitAA;
  hre.runbundler=RunBundler;
  hre.deployfactory = DeployFactory;
});

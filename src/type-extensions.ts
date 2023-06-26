import "hardhat/types/config";
import "hardhat/types/runtime";


declare module "hardhat/types/config" {
  export interface ProjectPathsUserConfig {
    newPath?: string;
  }
  export interface ProjectPathsConfig {
    newPath: string;
  }
}

declare module "hardhat/types/runtime" {
  export interface HardhatRuntimeEnvironment {
    initaa: (
      hre:HardhatRuntimeEnvironment
    )=>Promise<void>;
    runbundler: (
      hre:HardhatRuntimeEnvironment
    )=>Promise<unknown>;
    deployfactory: (
      hre:HardhatRuntimeEnvironment
    )=>Promise<unknown>;
  }
}

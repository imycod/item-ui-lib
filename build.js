// 去packages/unisc-item-ui/package.json
// 依次执行 npm run build , npm run build:umd , npm run build:style
// 然后在回到 当前项目执行package.json里面的 npm run unisc-item-ui:css

import { execSync } from "child_process";
import path from "path";

const projectRoot = process.cwd();
const uiPackagePath = path.join(projectRoot, "packages", "unisc-item-ui");

function runCommand(command, options = {}) {
  try {
    execSync(command, { stdio: "inherit", ...options });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    process.exit(1);
  }
}

function buildUIPackage() {
  process.chdir(uiPackagePath);
  runCommand("npm run build");
  runCommand("npm run build:umd");
  runCommand("npm run build:style");
}

function buildRootCSS() {
  process.chdir(projectRoot);
  runCommand("npm run unisc-item-ui:css");
}

function main() {
  buildUIPackage();
  buildRootCSS();
}

main();

// 去packages/unisc-item-ui/package.json
// 依次执行 npm run build , npm run build:umd , npm run build:style
// 然后在回到 当前项目执行package.json里面的 npm run unisc-item-ui:css

import { execSync } from "child_process";
import path from "path";
import fs from "fs";

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

// Function to update the version in package.json
function updatePackageVersion() {
  const packageJsonPath = path.join(uiPackagePath, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

  const versionParts = packageJson.version.split(".");
  versionParts[2] = parseInt(versionParts[2], 10) + 1; // Increment patch version
  packageJson.version = versionParts.join(".");

  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2),
    "utf8"
  );
  console.log(`Updated version to ${packageJson.version}`);
}

function publish() {
  process.chdir(uiPackagePath);
  runCommand("npm publish");
}

function pushGithub() {
  runCommand("git add .");
  runCommand(`git commit -m "feat:tailwindcss"`);
  runCommand("git push");
}

function main() {
  buildUIPackage();
  buildRootCSS();
  if (process.env.publish) {
    updatePackageVersion();
    publish();
    pushGithub()
  }
}

main();

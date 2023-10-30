//每次打包构建代码，自动更新版本号，同一天加1，隔天自动回归变成 1 。例如{ 今天：1.20200917.3，第二天：1.20200918.1 }
import chalk from "chalk";
import * as fs from "fs";

const UpdateVersion = () => {
  try {
    const version = GetVersion("./package.json");
    ["./package.json", "./package-lock.json", "./static/version.json"].forEach((item) => {
      let packageTxt = fs.readFileSync(item, "utf8");
      let versionData = packageTxt.split("\n");
      let VersionArr = version.split(".");
      let date = new Date();
      let today = date.getFullYear() + "" + AddZero((date.getMonth() + 1)) + "" + AddZero(date.getDate());
      if (today === VersionArr[1]) {
        VersionArr[2] = parseInt(VersionArr[2]) + 1;
      } else {
        VersionArr[1] = date.getFullYear() + "" + AddZero((date.getMonth() + 1)) + "" + AddZero(date.getDate());
        VersionArr[2] = 1;
      }
      let versionLine = VersionArr.join(".");
      for (let i = 0; i < versionData.length; i++) {
        if (versionData[i].indexOf("\"version\":") !== -1) {
          versionData.splice(i, 1, "  \"version\": \"" + versionLine + (versionData[i].indexOf(",") !== -1 ? "\"," : "\""));
          break;
        }
      }
      fs.writeFileSync(item, versionData.join("\n"), "utf8");
      console.log(chalk.green.bold(`${item}更新版本号成功！当前最新版本号为：${versionLine}`));
    });
  } catch (e) {
    console.log(chalk.red.bold("读取文件修改版本号出错:", e.toString()));
  }
};

const AddZero = (time) => {
  if (time < 10) {
    return "0" + time;
  } else {
    return time;
  }
};

const GetVersion = (arg_file_path) => {
  let packageTxt = fs.readFileSync(arg_file_path, "utf8");
  let packageJson = JSON.parse(packageTxt);
  return packageJson.version;
};

switch (process.argv[2]) {
  case "update":
    UpdateVersion();
    break;
  case "get":
    console.log(chalk.green.bold(`当前版本号为：${GetVersion("./package.json")}`));
    break;
  default:
    break;
}

export default GetVersion;
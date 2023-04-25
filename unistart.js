const inquirer = require('inquirer')
const shell = require('shelljs')
const os = require('os')
const path = require('path')
const fs = require('fs')

inquirer
  .prompt([
    {
      type: 'list',
      message: '请选择执行命令',
      name: 'script',
      choices: [
        {
          name: '运行到微信小程序',
          value: 'dev:mp-weixin'
        },
        {
          name: '发行到微信小程序',
          value: 'build:mp-weixin'
        },
        {
          name: '运行到H5',
          value: 'dev:h5'
        },
        {
          name: '发行到H5',
          value: 'build:h5'
        },
        {
          name: '运行到H5 SSR',
          value: 'dev:h5:ssr'
        },
        {
          name: '发行到H5 SSR',
          value: 'build:h5:ssr'
        },
      ]
    }
  ])
  .then(({ script }) => {
    if (shell.exec('chcp 65001').code !== 0) {
      shell.echo('chcp 65001 Error')
      shell.exit(1)
    }
    shell.exec(`npm run ${script}`, function (code, stdout, stderr) {
      console.log('Exit code:', code);
      console.log('Program output:', stdout);
      console.log('Program stderr:', stderr);
    })
    if (script.endsWith('mp-weixin')) {
      let dontOpen = false
      const SupportedPlatformsMap = {
        Windows_NT: 'Windows_NT',
        Darwin: 'Darwin'
      };
      const defaultPathMap = {
        [SupportedPlatformsMap.Windows_NT]: 'C:\\Program Files (x86)\\Tencent\\微信web开发者工具\\cli.bat',
        [SupportedPlatformsMap.Darwin]: '/Applications/wechatwebdevtools.app/Contents/MacOS/cli'
      };
      const defaultCustomConfigFilePath = path.join(path.join(os.homedir(), '.weapp-ide-cli'), 'config.json');
      const defaultPath = defaultPathMap[os.type()];
      let configInfo1
      let configInfo2
      try {
        configInfo1 = fs.statSync(defaultCustomConfigFilePath)
      } catch (error) { }
      try {
        configInfo2 = fs.statSync(defaultPath)
      } catch (error) { }
      if (!configInfo1?.isFile() && !configInfo2?.isFile()) {
        dontOpen = true
      }
      if (dontOpen) {
        shell.echo('\x1b[31m%s\x1b[0m', '首次运行请先执行 npm run initide 设置小程序开发者工具路径后再重新 npm run start')
        shell.exit(1)
      }
      const config = fs.readFileSync(path.join(__dirname, './src/manifest.json'), 'utf8')
      if (config.match(/"mp-weixin"\s*:[\w\W]+?"appid"\s*:\s*"(.*?)"/)?.[1].length === 0) {
        console.log('\x1b[34m%s\x1b[0m', '没有配置小程序 appid, 建议在 src/manifest.json 中进行配置')
      }
      const openIde = () => {
        let ins
        if (script.startsWith('dev')) {
          ins = shell.exec('weapp open -p dist/dev/mp-weixin', { silent: true })
        } else if (script.startsWith('build')) {
          ins = shell.exec('weapp open -p dist/build/mp-weixin', { silent: true })
        }
        if (ins.code !== 0) {
          shell.echo('Open WeiXin IDE Error: weapp open -p dist/dev/mp-weixin')
          shell.exit(1)
        }
        if (ins.stdout.includes('Error')) {
          setTimeout(() => {
            openIde()
          }, 1000)
        }
      }
      openIde()
    }
  })
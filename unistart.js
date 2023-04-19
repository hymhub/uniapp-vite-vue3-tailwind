const inquirer = require('inquirer');
var shell = require('shelljs');

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
    Promise.resolve().then(() => {
      if (shell.exec(`npm run ${script}`).code !== 0) {
        shell.echo(`Error: npm run ${script}`);
        shell.exit(1);
      }
    })
    if (script.endsWith('mp-weixin')) {
      if (script.startsWith('dev')) {
        if (shell.exec('weapp open -p dist/dev/mp-weixin').code !== 0) {
          shell.echo('Open WeiXin IDE Error: weapp open -p dist/dev/mp-weixin');
          shell.exit(1);
        }
      } else if(script.startsWith('build')) {
        if (shell.exec('weapp open -p dist/build/mp-weixin').code !== 0) {
          shell.echo('Open WeiXin IDE Error: weapp open -p dist/build/mp-weixin');
          shell.exit(1);
        }
      }
    }
  })
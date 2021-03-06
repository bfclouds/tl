import chalk from 'chalk'
import child_process from 'child_process'
import util from 'util'
import { handleExeRes } from '../utils.js'

const exec = util.promisify(child_process.exec)

export default function (program) {
  program
    .command('gitreset')
    .description('执行回退到上一个版本')
    .action(async () => {
      try {
        await exec('git add .') // 解决未add的情况下不能reset
        handleExeRes(await exec('git reset --hard HEAD'))
      } catch (err) {
        console.log(chalk.red(`err: ${err}`))
      }
    })
}

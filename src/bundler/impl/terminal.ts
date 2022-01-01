import { Bundler } from '../bundler'
import { Bundle } from '../../codegen'
import chalk from 'chalk'
import minimatch from 'minimatch'

interface Options {
    printContent?: boolean
}

export class TerminalBundler implements Bundler {

    constructor(
        private readonly pattern: string = '**',
        private readonly options: Options = {
            printContent: false
        }
    ) { }

    async writeBundle(bundle: Bundle) {
        for (const asset of bundle.assets.filter(i => minimatch(i.path, this.pattern))) {
            console.log(chalk.inverse(`${asset.path}`))
            this.options.printContent && console.log(chalk.dim(asset.data.toString()))
            console.log()
        }
    }

}

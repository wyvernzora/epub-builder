import { Asset, Bundle } from '../../codegen'
import { Bundler } from '../bundler'
import { promises } from 'fs'
import { resolve, dirname } from 'path'


export class DirectoryBundler implements Bundler {

    constructor(private readonly root: string) {
    }

    async writeBundle(bundle: Bundle) {
        for (const asset of bundle.assets) {
            await this.writeFile(asset)
        }
    }

    private async writeFile(asset: Asset) {
        const outfile = resolve(this.root, asset.path);
        await promises.mkdir(dirname(outfile), { recursive: true });
        await promises.writeFile(outfile, asset.data, { encoding: 'utf8' });
    }

}

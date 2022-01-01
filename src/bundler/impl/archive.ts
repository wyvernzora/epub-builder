import JSZip from 'jszip'
import { promises } from 'fs'
import { Bundler } from '../bundler'
import { Bundle } from '../../codegen'
import { dirname } from 'path'

export class ArchiveBundler implements Bundler {

    constructor(private readonly path: string) {
    }

    async writeBundle(bundle:Bundle) {
        const zipfile = new JSZip()
        zipfile.file('mimetype', 'application/epub+zip', { compression: 'STORE' })

        for (const asset of bundle.assets) {
            zipfile.file(asset.path, asset.data, { compression: 'DEFLATE' })
        }

        const buffer = await zipfile.generateAsync({
            type: 'nodebuffer',
            compressionOptions: {
                level: 9
            }
        })
        await promises.mkdir(dirname(this.path), { recursive: true });
        await promises.writeFile(this.path, buffer)
    }

}

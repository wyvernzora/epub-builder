import '../../declarations'
import { tidy } from 'htmltidy2'
import { minify } from 'html-minifier'
import { Plugin } from '../plugin'
import { Assets, Context } from '../../codegen'
import { promisify } from 'util'
import { Content } from '../../structure'

const tidyAsync: (html: string, options?: any) => Promise<string> = promisify(tidy)
const mimetypes: Set<string> = new Set(['application/xhtml+xml'])

export class XhtmlCleanupPlugin extends Plugin {

    content = async (content: Content, assets: Assets, context: Context) => {
        for (const asset of assets.filter(i => mimetypes.has(i.type))) {
            asset.data = await this.runCleanup(asset.data.toString())
        }
    }

    async runCleanup(html: string): Promise<string> {
        return minify(await tidyAsync(html), {
            sortClassName: true,
            keepClosingSlash: true,
            removeComments: true,
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
        })
    }

}

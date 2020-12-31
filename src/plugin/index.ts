import { RenderContentPlugin } from './impl/render-content-plugin'
import { RenderGroupPlugin } from './impl/render-group-plugin'
import { GenerateTocPlugin } from './impl/generate-toc-plugin'
import { GenerateCoverPlugin } from './impl/generate-cover-plugin'
import { GenerateNcxPlugin } from './impl/generate-ncx-plugin'
import { GenerateOpfPlugin } from './impl/generate-opf-plugin'
import { GenerateContainerXmlPlugin } from './impl/generate-container-xml-plugin'
import { XhtmlCleanupPlugin } from './impl/xhtml-cleanup-plugin'

export * from './plugin'
export namespace Plugin {
    export const Defaults = [
        new RenderContentPlugin(),
        new RenderGroupPlugin(),
        new GenerateTocPlugin(),
        new GenerateCoverPlugin(),
        new GenerateNcxPlugin(),
        new GenerateOpfPlugin(),
        new GenerateContainerXmlPlugin(),
        new XhtmlCleanupPlugin(),
    ]
}

export default Plugin

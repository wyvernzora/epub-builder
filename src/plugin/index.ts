import { RenderContentPlugin } from './impl/render-content-plugin'
import { RenderGroupPlugin } from './impl/render-group-plugin'
import { TocPlugin } from './impl/toc-plugin'
import { CoverPlugin } from './impl/cover-plugin'
import { NcxPlugin } from './impl/ncx-plugin'
import { OpfPlugin } from './impl/opf-plugin'
import { ContainerXmlPlugin } from './impl/container-xml-plugin'
import { XhtmlCleanupPlugin } from './impl/xhtml-cleanup-plugin'
import { StylesPlugin } from './impl/styles-plugin'
import { PluginSet } from './plugin'

export * from './plugin'

const _corePlugins = [
    new TocPlugin(),
    new RenderContentPlugin(),
    new RenderGroupPlugin(),
    new NcxPlugin(),
    new OpfPlugin(),
    new ContainerXmlPlugin(),
]
export const CorePlugins = new PluginSet(_corePlugins)

const _defaultPlugins = [
    new StylesPlugin(),
    new CoverPlugin(),
    ..._corePlugins,
    new XhtmlCleanupPlugin(),
]
export const DefaultPlugins = new PluginSet(_defaultPlugins)

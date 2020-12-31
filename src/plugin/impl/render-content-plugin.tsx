import { renderToXhtmlString, Xhtml } from '@wyvernzora/epub-jsx'
import { Plugin } from '../plugin'
import { Asset, Assets, Context, Paths } from '../../codegen'
import { Content } from '../../structure'


export class RenderContentPlugin extends Plugin {

    content = async (content: Content, assets: Assets, context: Context) => {
        const path = content.accept(Paths.NodePathVisitor)
        const dom = (
            <Xhtml
                title={content.title}
                language={context.book.language}
                stylesheets={
                    context.bundle.stylesheets()
                        .map(i => Paths.relativeLink(path, i.path))
                }
            >{content.content}</Xhtml>
        )
        const asset: Asset = {
            id: content.uid,
            category: 'text',
            type: 'application/xhtml+xml',
            path: path,
            data: renderToXhtmlString(dom),
        }
        if (content.role === 'toc') {
            asset.properties = 'nav'
        }
        assets.push(asset)
    }

}

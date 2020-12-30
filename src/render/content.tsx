import { Xhtml, renderToXhtmlString } from 'epub-jsx'
import { Content } from '../structure'
import { Asset, RenderingContext, Paths } from '../bundle'

export async function renderContent(context: RenderingContext, content: Content): Promise<void> {
    const asset: Asset = {
        id: content.uid,
        category: 'text',
        type: 'application/xhtml+xml',
        path: content.accept(Paths.NodePathVisitor),
        data: renderToXhtmlString(createContentElement(context, content)),
    }
    context.bundle.addAssets(asset)
}

const createContentElement = (context: RenderingContext, content: Content) =>
    <Xhtml {...context}
           stylesheets={context.bundle.stylesheets().map(i => i.path)}
           title={content.title}
    >{content.content}</Xhtml>

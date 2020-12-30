import { renderToXhtmlString, Xhtml } from 'epub-jsx'
import { Book } from '../structure'
import { Asset, RenderingContext, Paths } from '../bundle'
import { JSXInternal } from "preact/src/jsx";
import CSSProperties = JSXInternal.CSSProperties;

export async function renderCover(context: RenderingContext, book: Book): Promise<void> {
    const asset: Asset = {
        id: 'cover',
        category: 'text',
        type: 'application/xhtml+xml',
        path: Paths.CoverPath,
        data: renderToXhtmlString(createCoverElement(context, book)),
    }
    context.bundle.addAssets(asset)
}

const createCoverElement = (context: RenderingContext, book: Book) =>
    <Xhtml {...context}
           stylesheets={context.bundle.stylesheets().map(i => i.path)}
           title={book.title}
    >
        <h1 style={titleStyles}>{book.title}</h1>
    </Xhtml>

const titleStyles: CSSProperties = {
    fontSize: '1.5em',
    margin: '50% 0 0 0',
    transform: 'translateY(-75%)',
    textAlign: 'center',
}

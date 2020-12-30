import { Link, Links, renderToXhtmlString, TableOfContents, Xhtml } from 'epub-jsx'
import { Book, NodeVisitor } from '../structure'
import { Asset, Paths, RenderingContext } from '../bundle'
import { VNode } from "preact";

export async function renderToc(context: RenderingContext, book: Book): Promise<void> {
    const asset: Asset = {
        id: 'toc',
        category: 'text',
        type: 'application/xhtml+xml',
        path: Paths.TOCPath,
        data: renderToXhtmlString(createTocElement(context, book))
    }
    context.bundle.addAssets(asset)
}

const createTocElement = (context: RenderingContext, book: Book) =>
    <Xhtml
        title={book.title}
        language={context.language}
        stylesheets={context.bundle.stylesheets().map(i => i.path)}
    >
        <h1 className='toc-title'>{book.title}</h1>
        {book.accept(TocRenderVisitor)}
    </Xhtml>

const TocRenderVisitor: NodeVisitor<VNode> = {

    visitBook: book =>
        <TableOfContents className='toc-book'>{
            book.children().map(node => node.accept(TocRenderVisitor))
        }</TableOfContents>,

    visitGroup: group =>
        <Links
            className='toc-group'
            label={group.title}
            href={Paths.relativeLink(Paths.TOCPath, group.accept(Paths.NodePathVisitor))}
        >{
            group.children().map(node => node.accept(TocRenderVisitor))
        }</Links>,

    visitContent: content =>
        <Link
            className='toc-content'
            label={content.title}
            href={Paths.relativeLink(Paths.TOCPath, content.accept(Paths.NodePathVisitor))}
        />,
}

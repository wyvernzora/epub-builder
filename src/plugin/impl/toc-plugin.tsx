import { Link, Links, renderToXhtmlString, TableOfContents } from '@wyvernzora/epub-jsx'
import { Plugin } from '../plugin'
import { Assets, Context, Paths } from '../../codegen'
import { Book, Content, NodeVisitor } from '../../structure'
import { VNode } from 'preact'


export class TocPlugin extends Plugin {

    book = async (book: Book, assets: Assets, context: Context) => {
        const dom =
            <>
                <h1 className='toc-title'>{book.title}</h1>
                {book.accept(TocRenderVisitor)}
            </>
        const content = renderToXhtmlString(dom)

        context.guide.references.unshift({
            type: 'toc',
            title: 'Table of Contents',
            href: Paths.relativeLink(Paths.OPFPath, Paths.TOCPath),
        })
        context.book.unshift(new Content({
            name: 'toc',
            role: 'toc',
            title: 'Table of Contents',
            content: content,
        }))
    }

}

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

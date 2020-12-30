import { Book, Content, Group, NodeVisitor } from "../structure"
import { Asset, RenderingContext, Paths } from "../bundle";
import { NavMap, NavPoint, NCX, renderToXmlString } from 'epub-jsx'
import { VNode } from "preact"

export async function renderNCX(context: RenderingContext, book: Book): Promise<void> {
    const asset: Asset = {
        id: 'ncx',
        category: 'metadata',
        type: 'application/x-dtbncx+xml',
        path: Paths.NCXPath,
        data: renderToXmlString(createNCXElement(book)),
    }
    context.bundle.addAssets(asset)
}

function createNCXElement(book: Book) {
    const metadata = {
        'dtb:uid': book.name,
        'dtb:generator': 'scrappy',
        'dtb:depth': book.accept(BookDepthVisitor),
        'dtb:totalPageCount': 0,
        'dtb:maxPageNumber': 0,
    }
    return (
        <NCX
            id={book.name}
            title={book.title}
            author={book.author}
            metadata={metadata}
        >{book.accept(new RenderNavMapVisitor())}</NCX>
    )
}

const BookDepthVisitor: NodeVisitor<number> = {
    visitBook: (book: Book) =>
        BookDepthVisitor.visitGroup(book) - 1,

    visitGroup: (group: Group) =>
        Math.max(...group.children().map(node => node.accept(BookDepthVisitor))) + 1,

    visitContent: () => 1,
}

class RenderNavMapVisitor implements NodeVisitor<VNode> {
    private playOrder = 3

    visitBook = (book: Book) =>
        <NavMap>
            <NavPoint id='cover' playOrder={1} label='Cover' link='xhtml/cover.xhtml' />
            <NavPoint id='toc' playOrder={2} label='TOC' link='xhtml/toc.xhtml' />
            {book.children().map(node => node.accept(this))}
        </NavMap>

    visitGroup = (group: Group) =>
        <NavPoint
            id={group.uid}
            playOrder={this.playOrder++}
            label={group.title}
            link={Paths.relativeLink(Paths.NCXPath, group.accept(Paths.NodePathVisitor))}
        >{group.children().map(node => node.accept(this))}</NavPoint>

    visitContent = (content: Content) =>
        <NavPoint
            id={content.uid}
            playOrder={this.playOrder++}
            label={content.title}
            link={Paths.relativeLink(Paths.NCXPath, content.accept(Paths.NodePathVisitor))}
        />
}

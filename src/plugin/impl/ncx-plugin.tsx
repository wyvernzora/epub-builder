import { NavMap, NavPoint, NCX, renderToXmlString } from '@wyvernzora/epub-jsx'
import { Book, Content, Group, NodeVisitor } from '../../structure'
import { VNode } from 'preact'
import { Plugin } from '../plugin'
import { Context, Paths } from '../../codegen'


export class NcxPlugin extends Plugin {

    global = async ({ book, bundle }: Context) => {
        const metadata = {
            'dtb:uid': book.name,
            'dtb:generator': 'scrappy',
            'dtb:depth': book.accept(BookDepthVisitor),
            'dtb:totalPageCount': 0,
            'dtb:maxPageNumber': 0,
        }
        const dom =
            <NCX
                id={book.name}
                title={book.title}
                author={book.author}
                metadata={metadata}
            >{book.accept(new RenderNavMapVisitor())}</NCX>
        bundle.pushAssets({
            category: 'metadata',
            type: 'application/x-dtbncx+xml',
            path: Paths.NCXPath,
            data: renderToXmlString(dom),
        })
    }

}

const BookDepthVisitor: NodeVisitor<number> = {
    visitBook: (book: Book) =>
        BookDepthVisitor.visitGroup(book) - 1,

    visitGroup: (group: Group) =>
        Math.max(...group.children().map(node => node.accept(BookDepthVisitor))) + 1,

    visitContent: () => 1,
}

class RenderNavMapVisitor implements NodeVisitor<VNode> {
    private playOrder = 1

    visitBook = (book: Book) =>
        <NavMap>{book.children().map(node => node.accept(this))}</NavMap>

    visitGroup = (group: Group) =>
        <NavPoint
            id={group.uid.value}
            playOrder={this.playOrder++}
            label={group.title}
            link={Paths.relativeLink(Paths.NCXPath, group.accept(Paths.NodePathVisitor))}
        >{group.children().map(node => node.accept(this))}</NavPoint>

    visitContent = (content: Content) =>
        <NavPoint
            id={content.uid.value}
            playOrder={this.playOrder++}
            label={content.title}
            link={Paths.relativeLink(Paths.NCXPath, content.accept(Paths.NodePathVisitor))}
        />
}

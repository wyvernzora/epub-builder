import { RenderingContext } from "../../codegen";
import { Book, Content, Group, NodeVisitor } from "../../structure";
import { NavPoint } from "./nav-point";
import { createElement, FunctionComponent } from "preact";
import { JSXInternal } from "preact/src/jsx";
import Element = JSXInternal.Element;


export const NCX: FunctionComponent<RenderingContext<Book>> = ({ node: book }) => {
    return createElement('ncx', {
        xmlns: 'http://www.daisy.org/z3986/2005/ncx/',
        version: '2005-1'
    }, [
        renderHead(book),
        renderMetadata(book),
        renderNavMap(book),
    ])
}

function renderHead(book: Book) {
    return (
        <head>
            <meta key='dtb:uid' name='dtb:uid' content={book.id} />
            <meta key='dtb:generator'  name='dtb:generator' content='scrappy' />
            <meta key='dtb:depth' name='dtb:depth' content={`${book.accept(BookDepthVisitor)}`} />
            <meta key='dtb:totalPageCount' name='dtb:totalPageCount' content='0' />
            <meta key='dtb:maxPageNumber' name='dtb:maxPageNumber' content='0' />
        </head>
    )
}

function renderMetadata(book: Book) {
    return (
        <>
            { createElement('docTitle', { }, createElement('text', { }, book.title)) }
            { createElement('docAuthor', { }, createElement('text', { }, book.author)) }
        </>
    )
}

function renderNavMap(book: Book) {
    return book.accept(new RenderNavMapVisitor())
}


const BookDepthVisitor: NodeVisitor<number> = {
    visitBook(book) {
        return this.visitGroup(book) - 1
    },
    visitGroup(group) {
        return Math.max(...group.children().map(node => node.accept(BookDepthVisitor))) + 1
    },
    visitContent(content) {
        return 1
    }
}

class RenderNavMapVisitor implements NodeVisitor<JSXInternal.Element> {
    private playOrder = 2

    visitBook(book: Book): Element {
        return createElement('navMap', { }, [
            <NavPoint key='toc' id='toc' playOrder={1} label='TOC' link='' />,
            ...book.children().map(node => node.accept(this))
        ])
    }
    visitContent(content: Content): Element {
        return (
            <NavPoint
                id={content.path}
                playOrder={this.playOrder++}
                label={content.title}
                link={content.link()}
            />
        )
    }
    visitGroup(group: Group): Element {
        return (
            <NavPoint
                id={group.path}
                playOrder={this.playOrder++}
                label={group.title}
                link={group.link()}
            >{group.children().map(node => node.accept(this))}</NavPoint>
        )
    }
}

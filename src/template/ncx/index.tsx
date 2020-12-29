import { RenderingContext } from "../../codegen";
import { Book, Content, Group, NodeVisitor } from "../../structure";
import { NavPoint } from "./nav-point";
import React from "react";


export const NCX: React.FunctionComponent<RenderingContext<Book>> = ({ node: book }) => {
    return React.createElement('ncx', {
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
            { React.createElement('docTitle', { }, React.createElement('text', { }, book.title)) }
            { React.createElement('docAuthor', { }, React.createElement('text', { }, book.author)) }
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

class RenderNavMapVisitor implements NodeVisitor<React.ReactElement> {
    private playOrder = 2

    visitBook(book: Book): React.ReactElement {
        return React.createElement('navMap', { }, [
            <NavPoint key='toc' id='toc' playOrder={1} label='TOC' link='' />,
            ...book.children().map(node => node.accept(this))
        ])
    }
    visitContent(content: Content): React.ReactElement {
        return (
            <NavPoint
                id={content.path}
                playOrder={this.playOrder++}
                label={content.title}
                link={content.link()}
            />
        )
    }
    visitGroup(group: Group): React.ReactElement {
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

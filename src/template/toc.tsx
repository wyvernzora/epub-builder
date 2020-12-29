import { RenderingContext } from "../codegen";
import { Book, NodeVisitor } from "../structure";
import { Page } from "./page";
import { createElement, FunctionalComponent } from "preact";
import { JSXInternal } from "preact/src/jsx";
import Element = JSXInternal.Element;

export const TableOfContents: FunctionalComponent<RenderingContext<Book>> = (props) => (
    <Page {...props}>{ props.node.accept(TocRenderVisitor) }</Page>
)

const TocRenderVisitor: NodeVisitor<Element> = {
    visitBook(book) {
        return (
            <>
                <h1 className='toc-book__title' />
                {
                    createElement('nav', {
                        id: 'toc',
                        role: 'doc-toc',
                        'epub:type': 'toc',
                    }, (
                        <ol className='toc-group'>{
                            book.children().map(node => node.accept(TocRenderVisitor))
                        }</ol>
                    ))
                }
            </>
        )
    },
    visitGroup(group) {
        return (
            <li key={group.path} className='toc-group'>
                <a className='toc-group__link' href={group.link()}>{group.title}</a>
                <ol className='toc-group__list'>{
                    group.children().map(node => node.accept(TocRenderVisitor))
                }</ol>
            </li>
        )
    },
    visitContent(content) {
        return (
            <li key={content.path} className='toc-content'>
                <a className='toc-content__link' href={content.link()}>{content.title}</a>
            </li>
        )
    },
}

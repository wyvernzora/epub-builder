import { Book, Content, Group, NodeVisitor } from '../structure'
import { Bundle } from './bundle'
import { RenderingContext } from './index'
import { Locale } from 'locale-enum/index'
import { renderContent } from '../render/content'
import { renderGroup } from '../render/group'
import { renderNCX } from '../render/ncx'
import { renderCover } from '../render/cover'
import { renderToc } from '../render/toc'
import { renderOPF } from '../render/opf'
import { renderContainerXml } from '../render/container'

export class Bundler implements NodeVisitor<Promise<Bundle>>, RenderingContext {
    readonly language = Locale.ja
    readonly bundle = new Bundle()

    async visitContent(content: Content) {
        await renderContent(this, content)
        return this.bundle
    }

    async visitGroup(group: Group): Promise<Bundle> {
        await renderGroup(this, group)
        for (const node of group.children()) {
            await node.accept(this)
        }
        return this.bundle
    }

    async visitBook(book: Book): Promise<Bundle> {
        await renderNCX(this, book)
        await renderCover(this, book)
        await renderToc(this, book)
        for (const node of book.children()) {
            await node.accept(this)
        }
        await renderOPF(this, book)
        await renderContainerXml(this, book)
        return this.bundle
    }
}

import { Context } from '../context'
import { Plugin } from '../../plugin/plugin'
import { Book, Content, Group } from '../../structure'
import assert from 'assert'
import { Bundle } from '../bundle'
import { Assets } from '../asset'
import { CodeGenerator } from '../codegen'

export class DefaultCodeGenerator extends CodeGenerator {
    private readonly _context: Context
    private readonly _plugins: Plugin[]

    constructor(book: Book, plugins: Plugin[]) {
        super()
        assert(!!book, 'DefaultCodeGenerator: book must not be null')
        this._context = {
            book,
            bundle: new Bundle(),
            guide: { references: [] }
        }
        this._plugins = plugins
    }

    async visitContent(content: Content) {
        this.emit('visit', content)

        const assets: Assets = [];
        for (const plugin of this._plugins.filter(p => p.supports('content'))) {
            await plugin.content!(content, assets, this._context)
        }
        this._context.bundle.pushAssets(...assets)

        return this._context.bundle
    }

    async visitGroup(group: Group) {
        this.emit('visit', group)

        const assets: Assets = [];
        for (const plugin of this._plugins.filter(p => p.supports('group'))) {
            await plugin.group!(group, assets, this._context)
        }
        this._context.bundle.pushAssets(...assets)

        for (const child of group.children()) {
            await child.accept(this)
        }

        return this._context.bundle
    }

    async visitBook(book: Book) {
        this.emit('visit', book)

        const assets: Assets = [];
        for (const plugin of this._plugins.filter(p => p.supports('book'))) {
            await plugin.book!(book, assets, this._context)
        }
        this._context.bundle.pushAssets(...assets)

        for (const child of book.children()) {
            await child.accept(this)
        }

        for (const plugin of this._plugins.filter(p => p.supports('global'))) {
            await plugin.global!(this._context)
        }

        return this._context.bundle
    }

}

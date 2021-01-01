import { Context } from '../context'
import { Book, Content, Group } from '../../structure'
import assert from 'assert'
import { Bundle } from '../bundle'
import { Assets } from '../asset'
import { CodeGenerator } from '../codegen'
import { PluginSet } from '../../plugin/plugin'

export class DefaultCodeGenerator extends CodeGenerator {
    private readonly _context: Context
    private readonly _plugins: PluginSet

    constructor(book: Book, plugins: PluginSet) {
        super()
        assert(!!book, 'DefaultCodeGenerator: book must not be null')
        this._context = {
            book,
            bundle: new Bundle(),
            guide: { references: [] }
        }
        this._plugins = plugins
    }

    bundle(): Bundle {
        return this._context.bundle
    }

    async visitContent(content: Content) {
        this.emit('visit', content)

        const assets: Assets = [];
        await this._plugins.content(content, assets, this._context)
        this._context.bundle.pushAssets(...assets)

        return this._context.bundle
    }

    async visitGroup(group: Group) {
        this.emit('visit', group)

        const assets: Assets = [];
        await this._plugins.group(group, assets, this._context)
        this._context.bundle.pushAssets(...assets)

        for (const child of group.children()) {
            await child.accept(this)
        }

        return this._context.bundle
    }

    async visitBook(book: Book) {
        this.emit('visit', book)

        const assets: Assets = [];
        await this._plugins.book(book, assets, this._context)
        this._context.bundle.pushAssets(...assets)

        for (const child of book.children()) {
            await child.accept(this)
        }

        await this._plugins.global(this._context)
        return this._context.bundle
    }

}

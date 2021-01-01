import { Book, Content, Group, Node } from '../structure'
import { Assets, Context } from '../codegen'

type PluginFunc<T extends Node> = (node: T, assets: Assets, context: Context) => Promise<void>
type GlobalPluginFunc = (context: Context) => Promise<void>

export abstract class Plugin {
    readonly content: PluginFunc<Content> = () => Promise.resolve()
    readonly group?: PluginFunc<Group> = () => Promise.resolve()
    readonly book?: PluginFunc<Book> = () => Promise.resolve()
    readonly global?: GlobalPluginFunc = () => Promise.resolve()
}

export class PluginSet extends Plugin {
    private readonly _plugins: Plugin[]

    constructor(plugins: Plugin[]) {
        super();
        this._plugins = plugins
    }

    content: PluginFunc<Content> = async (node, assets, context) => {
        for (const plugin of this._plugins) {
            await plugin.content!(node, assets, context)
        }
    }

    group: PluginFunc<Group> = async (node, assets, context) => {
        for (const plugin of this._plugins) {
            await plugin.group!(node, assets, context)
        }
    }

    book: PluginFunc<Book> = async (node, assets, context) => {
        for (const plugin of this._plugins) {
            await plugin.book!(node, assets, context)
        }
    }

    global = async (context: Context) => {
        for (const plugin of this._plugins) {
            await plugin.global!(context)
        }
    }

}

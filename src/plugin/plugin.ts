import { Book, Content, Group, Node } from '../structure'
import { Assets, Context } from '../codegen'

type PluginFunc<T extends Node> = (node: T, assets: Assets, context: Context) => Promise<void>

export abstract class Plugin {
    readonly content?: PluginFunc<Content>
    readonly group?: PluginFunc<Group>
    readonly book?: PluginFunc<Book>
    readonly global?: (context: Context) => Promise<void>

    supports(type: Plugin.Type): boolean {
        return typeof this[type] === 'function'
    }
}
export namespace Plugin {
    export type Type = keyof Omit<Plugin, 'supports'>
}

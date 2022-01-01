import { Book } from "./book"
import { Group } from "./group"
import { Content } from "./content"
import assert from "assert";
import { UID } from '../uid'

export abstract class Node {
    abstract readonly kind: Node.Kind

    readonly name: string
    readonly title: string
    parent?: Node

    private _path: string
    private _uid: UID

    protected constructor({ name, title }: Node.Props) {
        assert(!!(this._path = this.name = name), 'Node: name must not be null')
        assert(!!(this.title = title), 'Node: title must not be null or empty')
        this._uid = UID.fromPath(this._path)
    }

    abstract accept<T>(visitor: NodeVisitor<T>): T

    public get uid(): UID {
        return this._uid
    }

    public get path(): string {
        return this._path
    }

    public set path(value: string) {
        this._path = value
        this._uid = UID.fromPath(this._path)
    }

}

export namespace Node {
    export type Kind = 'book' | 'group' | 'content'

    export interface Props {
        name: string
        title: string
    }
}

export interface NodeVisitor<T> {
    visitBook(i: Book): T
    visitGroup(i: Group): T
    visitContent(i: Content): T
}

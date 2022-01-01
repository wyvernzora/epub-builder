import { Book } from "./book"
import { Group } from "./group"
import { Content } from "./content"
import { createHash } from 'crypto'
import base from 'base-x'
import assert from "assert";

const Base58 = base('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz')
export type ID = string;

export abstract class Node {
    abstract readonly kind: Node.Kind

    readonly name: string
    readonly title: string
    parent?: Node

    private _path: string
    private _uid: string

    protected constructor({ name, title }: Node.Props) {
        assert(!!(this._path = this.name = name), 'Node: name must not be null')
        assert(!!(this.title = title), 'Node: title must not be null or empty')
        this._uid = generateUidFromPath(this._path)
    }

    abstract accept<T>(visitor: NodeVisitor<T>): T

    public get uid(): ID {
        return this._uid
    }

    public get path(): string {
        return this._path
    }

    public set path(value: string) {
        this._path = value
        this._uid = generateUidFromPath(this._path)
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

function generateUidFromPath(path: string): ID {
    const buffer = createHash('sha256')
        .update(path)
        .digest()
    const hash = Base58.encode(buffer)
        .substr(0, 16)
    return `i${hash}`;
}

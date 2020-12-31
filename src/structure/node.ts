import { Book } from "./book";
import { Group } from "./group";
import { Content } from "./content";
import UUID from "short-uuid";
import assert from "assert";

export type ID = string;


export abstract class Node {
    abstract readonly kind: Node.Kind

    readonly uid: ID
    readonly name: string
    readonly title: string
    parent?: Node
    path: string

    protected constructor({ name, title }: Node.Props) {
        this.uid = `i${UUID.generate()}`
        assert(!!(this.path = this.name = name), 'Node: name must not be null')
        assert(!!(this.title = title), 'Node: title must not be null or empty')
    }

    abstract accept<T>(visitor: NodeVisitor<T>): T
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

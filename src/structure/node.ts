import { Book } from "./book";
import { Group } from "./group";
import { Content } from "./content";

export type ID = string;
export type Kind = 'book' | 'group' | 'content'

export interface NodeProps {
    id: ID
    title: string
}

export interface Node extends NodeProps {
    readonly kind: Kind
    readonly id: ID
    readonly title: string
    parent?: Node
    path: string
    accept<T>(visitor: NodeVisitor<T>): T
}

export interface NodeVisitor<T> {
    visitBook(i: Book): T
    visitGroup(i: Group): T
    visitContent(i: Content): T
}

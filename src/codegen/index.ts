import { Book, Group, Content, Node, NodeVisitor } from '../structure'
import { Locale } from "locale-enum";

export interface CodeGenerator extends NodeVisitor<DataFile[]> {
    language: Locale
    stylesheets: DataFile[]

    visitBook(i: Book): DataFile[]
    visitGroup(i: Group): DataFile[]
    visitContent(i: Content): DataFile[]
}

export interface AsyncCodeGenerator extends NodeVisitor<Promise<DataFile[]>> {
    language: Locale
    stylesheets: DataFile[]

    visitBook(i: Book): Promise<DataFile[]>
    visitGroup(i: Group): Promise<DataFile[]>
    visitContent(i: Content): Promise<DataFile[]>
}

export interface RenderingContext<NodeType extends Node> {
    language: Locale
    stylesheets: DataFile[]
    node: NodeType
}

export interface DataFile {
    path: string
    data: Buffer
}

import assert from "assert"
import { Locale } from 'locale-enum'
import { Kind, Node, NodeProps, NodeVisitor } from './node'
import { Group } from './group'

export type BookProps = NodeProps & {
    author: string
    language: Locale
    updatedAt: Date
}

export class Book extends Group {
    public readonly kind: Kind = 'book'
    public readonly path: string = ''

    public readonly author: string
    public readonly language: Locale
    public readonly updatedAt: Date

    constructor({ name, title, author, language, updatedAt }: BookProps) {
        super({ name, title })

        assert(!!(this.author = author), 'Book: Author must not be null or empty')
        assert(!!(this.language = language), 'Book: Language must not be null or empty')
        assert(!!(this.updatedAt = updatedAt), 'Book: UpdatedAt must not be null or empty')
    }

    accept<T>(visitor: NodeVisitor<T>): T {
        return visitor.visitBook(this)
    }
}

export function isBook(node: Node): node is Book {
    return node.kind === 'book'
}

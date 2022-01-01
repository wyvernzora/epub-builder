import assert from "assert"
import { Locale } from 'locale-enum'
import { Node, NodeVisitor } from './node'
import { Group } from './group'

export type BookProps = Node.Props & {
    author: string
    language: Locale
    updatedAt: Date
}

export class Book extends Group {
    public readonly kind: Node.Kind = 'book'

    public readonly author: string
    public readonly language: Locale
    public readonly updatedAt: Date

    constructor({ name, title, author, language, updatedAt }: BookProps) {
        super({ name, title })

        this.path = '';
        assert(!!(this.author = author), 'Book: Author must not be null or empty')
        assert(!!(this.language = language), 'Book: Language must not be null or empty')
        assert(!!(this.updatedAt = updatedAt), 'Book: UpdatedAt must not be null or empty')
    }

    push(...nodes: Node[]): Book {
        super.push(...nodes)
        return this
    }

    unshift(...nodes: Node[]): Book {
        super.unshift(...nodes)
        return this
    }

    accept<T>(visitor: NodeVisitor<T>): T {
        return visitor.visitBook(this)
    }
}

export function isBook(node: Node): node is Book {
    return node.kind === 'book'
}

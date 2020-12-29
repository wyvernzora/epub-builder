import assert from 'assert'
import { join } from 'path'
import { ID, Kind, Node, NodeProps, NodeVisitor } from './node'

export type ContentProps = NodeProps & {
    content: string
}

export class Content implements Node, ContentProps {
    public readonly kind: Kind = 'content'

    public readonly id: ID
    public readonly title: string
    public readonly content: string
    public path: string

    constructor({ id, title, content }: ContentProps) {
        assert(!!(this.path = this.id = id), 'Content: ID must not be null')
        assert(!!(this.title = title), 'Content: Title must not be null or empty')
        assert(!!(this.content = content), 'Content: Content must not be null or empty')
    }

    accept<T>(visitor: NodeVisitor<T>): T {
        return visitor.visitContent(this)
    }

    link(): string {
        return join('OEBPS/text', `${this.path}.xhtml`)
    }
}

export function isContent(node: Node): node is Content {
    return node.kind === 'content'
}

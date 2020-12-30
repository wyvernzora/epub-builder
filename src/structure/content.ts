import assert from 'assert'
import { join } from 'path'
import { Kind, Node, NodeProps, NodeVisitor } from './node'

export type ContentProps = NodeProps & {
    content: string
}

export class Content extends Node {
    public readonly kind: Kind = 'content'
    public readonly content: string

    constructor({ name, title, content }: ContentProps) {
        super({ name, title })
        assert(!!(this.content = content), 'Content: Content must not be null or empty')
    }

    accept<T>(visitor: NodeVisitor<T>): T {
        return visitor.visitContent(this)
    }

    link(): string {
        return join('OPS/xhtml', `${this.path}.xhtml`)
    }
}

export function isContent(node: Node): node is Content {
    return node.kind === 'content'
}

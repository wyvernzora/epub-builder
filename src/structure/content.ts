import assert from 'assert'
import { Node, NodeVisitor } from './node'

export type ContentProps = Node.Props & {
    role?: Content.Role
    content: string
}

export class Content extends Node {
    public readonly kind: Node.Kind = 'content'
    public readonly role: Content.Role
    public readonly content: string

    constructor({ name, role = 'text', title, content }: ContentProps) {
        super({ name, title })
        assert(!!(this.content = content), 'Content: Content must not be null or empty')
        this.role = role;
    }

    accept<T>(visitor: NodeVisitor<T>): T {
        return visitor.visitContent(this)
    }

}

export namespace Content {
    export type Role = 'text' | 'toc' | 'cover'
}

export function isContent(node: Node): node is Content {
    return node.kind === 'content'
}

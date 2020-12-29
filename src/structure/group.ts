import assert from "assert"
import { join } from 'path'
import { ID, Kind, Node, NodeProps, NodeVisitor } from './node'

export type GroupProps = NodeProps

export class Group implements Node, GroupProps {
    public readonly kind: Kind = 'group'

    public readonly id: ID
    public readonly title: string
    public path: string;
    public parent?: Node;
    private _children: Node[] = []

    constructor({ id, title }: GroupProps) {
        assert(!!(this.path = this.id = id), 'Group: ID must not be null')
        assert(!!(this.title = title), 'Group: Title must not be null or empty')
    }

    push(node: Node): void {
        const newpath = join(this.path, node.id)

        // Cycle check
        let current: Node | undefined = this
        while (!!current) {
            if (node === current) {
                throw new Error(`Cycle detected: pushing node to ${newpath}, but it already exists at ${node.path}`)
            }
            current = current.parent
        }

        node.parent = this
        node.path = newpath
        this._children.push(node)
    }

    children(): Node[] {
        return this._children
    }

    accept<T>(visitor: NodeVisitor<T>): T {
        return visitor.visitGroup(this)
    }

    link(): string {
        return join('OEBPS/text', `${this.path}/index.xhtml`)
    }

}

export function isGroup(node: Node): node is Group {
    return node.kind === 'group'
}

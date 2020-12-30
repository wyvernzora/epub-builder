import { join } from 'path'
import { Kind, Node, NodeProps, NodeVisitor } from './node'

export type GroupProps = NodeProps

export class Group extends Node {
    public readonly kind: Kind = 'group'

    public parent?: Node;
    private _children: Node[] = []

    constructor(props: GroupProps) {
        super(props)
    }

    push(node: Node): void {
        const newpath = join(this.path, node.name)

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
        return join('OPS/xhtml', `${this.path}/index.xhtml`)
    }

}

export function isGroup(node: Node): node is Group {
    return node.kind === 'group'
}

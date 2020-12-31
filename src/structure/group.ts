import { join } from 'path'
import { Node, NodeVisitor } from './node'

export type GroupProps = Node.Props

export class Group extends Node {
    public readonly kind: Node.Kind = 'group'
    public parent?: Node;
    private _children: Node[] = []

    constructor(props: GroupProps) {
        super(props)
    }

    push(...nodes: Node[]): Group {
        for (const node of nodes) {
            this.cycleCheck(node)
            node.parent = this
            node.path = join(this.path, node.name)
            this._children.push(node)
        }
        return this
    }

    unshift(...nodes: Node[]): Group {
        for (const node of nodes) {
            this.cycleCheck(node)
            node.parent = this
            node.path = join(this.path, node.name)
            this._children.unshift(node)
        }
        return this
    }

    children(): Node[] {
        return this._children
    }

    accept<T>(visitor: NodeVisitor<T>): T {
        return visitor.visitGroup(this)
    }

    private cycleCheck(node: Node): void {
        let current: Node | undefined = this
        const newpath = join(this.path, node.name)
        while (!!current) {
            if (node === current) {
                throw new Error(`Cycle detected: pushing node to ${newpath}, but it already exists at ${node.path}`)
            }
            current = current.parent
        }
    }

}

export function isGroup(node: Node): node is Group {
    return node.kind === 'group'
}

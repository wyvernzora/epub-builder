import { EventEmitter } from 'events'
import { Book, Content, Group, Node, NodeVisitor } from '../structure'
import { Bundle } from './bundle'
import { DefaultCodeGenerator } from './impl/default'
import { DefaultPlugins } from '../plugin'

export abstract class CodeGenerator extends EventEmitter implements NodeVisitor<Promise<Bundle>> {
    public static default(book: Book): CodeGenerator {
        return new DefaultCodeGenerator(book, DefaultPlugins)
    }

    emit(event: 'visit', node: Node): boolean {
        return super.emit('visit', node)
    }

    on(event: 'visit', listener: (node: Node) => void): this {
        return super.on('visit', listener)
    }

    abstract bundle(): Bundle

    abstract visitBook(i: Book): Promise<Bundle>

    abstract visitGroup(i: Group): Promise<Bundle>

    abstract visitContent(i: Content): Promise<Bundle>
}

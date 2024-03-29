import { CodeGenerator as CodeGeneratorType } from './codegen'
import { DefaultCodeGenerator } from './impl/default'
import { DefaultPlugins, PluginSet } from '../plugin'
import { Book } from '../structure'

export * from './asset'
export * from './bundle'
export * from './codegen'
export * from './context'
export * from './paths'

export namespace CodeGenerator {
    export function defaultGenerator(book: Book): CodeGeneratorType {
        return new DefaultCodeGenerator(book, DefaultPlugins)
    }
    export function create(book: Book, plugins: PluginSet) {
        return new DefaultCodeGenerator(book, plugins)
    }
}

export default CodeGenerator

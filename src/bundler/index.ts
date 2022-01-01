export * from './bundler'

import { Bundler as BundlerType } from './bundler'
import { ArchiveBundler } from './impl/archive'
import { DirectoryBundler } from './impl/directory'
import { TerminalBundler } from './impl/terminal'
export namespace Bundler {

    export function archive(filepath: string): BundlerType {
        return new ArchiveBundler(filepath)
    }

    export function directory(rootpath: string): BundlerType {
        return new DirectoryBundler(rootpath)
    }

    export function terminal(pattern?: string): BundlerType {
        return new TerminalBundler(pattern)
    }

}

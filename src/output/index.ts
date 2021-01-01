import { ArchiveOutput } from './impl/archive'

export * from './output'

import { Output as OutputType } from './output'
import { DirectoryOutput } from './impl/directory'
import { TerminalOutput } from './impl/terminal'
export namespace Output {

    export function archive(filepath: string): OutputType {
        return new ArchiveOutput(filepath)
    }

    export function directory(rootpath: string): OutputType {
        return new DirectoryOutput(rootpath)
    }

    export function terminal(pattern?: string): OutputType {
        return new TerminalOutput(pattern)
    }

}

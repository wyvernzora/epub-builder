import { OPFProps } from '@wyvernzora/epub-jsx'
import { Book } from '../structure'
import { Bundle } from './bundle'

export interface Context {
    readonly book: Book
    readonly bundle: Bundle
    readonly guide: Required<OPFProps['guide']>
}

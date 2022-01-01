import { Bundle } from '../codegen'

export interface Bundler {
    writeBundle(bundle: Bundle): Promise<void>
}

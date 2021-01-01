import { Bundle } from '../codegen'

export interface Output {
    writeBundle(bundle: Bundle): Promise<void>
}

import base from 'base-x'
import { createHash } from 'crypto'
import assert from 'assert'


const Base58 = base('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz')

export class UID {
    readonly value;

    public static fromPath(path: string): UID {
        const buffer = createHash('sha256')
            .update(path)
            .digest()
        const hash = Base58.encode(buffer)
            .substr(0, 16)
        return new UID(`i${hash}`)
    }

    constructor(value: string) {
        assert((this.value = value), 'UID: value must be present')
    }
}


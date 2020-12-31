
export type Assets = Asset[]

export interface Asset {
    id: string
    category: Asset.Category
    type: string
    path: string
    data: Buffer | string
    properties?: 'nav'
}

export namespace Asset {
    export type Category = 'metadata' | 'text' | 'image' | 'font' | 'style'
}

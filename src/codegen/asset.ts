
export type Assets = Asset[]

export interface Asset {
    id: string
    category: Asset.Category
    type: Asset.MimeType
    path: string
    data: Buffer | string
    properties?: 'nav'
}

export namespace Asset {
    export type Category = 'metadata' | 'text' | 'image' | 'font' | 'style'
    export type MimeType = string

    export const MimeTypes = {
        XHTML: 'application/xhtml+xml',
        XML: 'application/xml',
        NCX: 'application/x-dtbncx+xml',
        CONTAINER: 'application/oebps-package+xml',
    }

}

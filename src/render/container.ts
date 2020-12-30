import { Paths, RenderingContext } from '../bundle'
import { Book } from '../structure'

const containerXmlContent =
    '<?xml version="1.0"?>' +
    '<container xmlns="urn:oasis:names:tc:opendocument:xmlns:container" version="1.0">' +
    '<rootfiles><rootfile full-path="OPS/package.opf" media-type="application/oebps-package+xml"/></rootfiles>' +
    '</container>'

export async function renderContainerXml(context: RenderingContext, book: Book): Promise<void> {
    context.bundle.addAssets({
        id: 'container_xml',
        category: 'metadata',
        type: 'application/xml',
        path: Paths.ContainerXmlPath,
        data: containerXmlContent,
    })
}

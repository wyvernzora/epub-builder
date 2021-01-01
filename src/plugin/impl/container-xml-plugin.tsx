import { Container, renderToXmlString } from '@wyvernzora/epub-jsx'
import { Plugin } from '../plugin'
import { Context, Paths } from '../../codegen'


export class ContainerXmlPlugin extends Plugin {

    global = async (context: Context) => {
        const dom =
            <Container rootfiles={[{
                path: 'OPS/package.opf',
                mediaType: 'application/oebps-package+xml' }]}
            />
        context.bundle.unshiftAssets({
            category: 'metadata',
            type: 'application/xml',
            path: Paths.ContainerXmlPath,
            data: renderToXmlString(dom),
        })
    }

}

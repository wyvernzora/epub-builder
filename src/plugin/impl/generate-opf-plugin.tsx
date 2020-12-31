import { OPF, renderToXmlString } from '@wyvernzora/epub-jsx'
import { Plugin } from '../plugin'
import { Context, Paths } from '../../codegen'


export class GenerateOpfPlugin extends Plugin {

    global = async ({ book, bundle, guide }: Context) => {
        const dom =
            <OPF
                metadata={{...book, id: book.name}}
                manifest={{
                    items: bundle.assets.map(asset => ({
                        id: asset.id,
                        href: Paths.relativeLink(Paths.OPFPath, asset.path),
                        mediaType: asset.type,
                        properties: asset.properties,
                    }))
                }}
                spine={{
                    toc: 'ncx',
                    items: bundle.text().map(asset => ({ idref: asset.id }))
                }}
                guide={guide}
            />

        bundle.pushAssets({
            id: 'opf',
            category: 'metadata',
            type: 'application/xml',
            path: Paths.OPFPath,
            data: renderToXmlString(dom),
        })
    }

}

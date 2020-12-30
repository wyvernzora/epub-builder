import { Guide, Manifest, OPF, renderToXmlString, Spine } from 'epub-jsx'
import { Book } from '../structure'
import { Asset, RenderingContext, Paths } from '../bundle'

export async function renderOPF(context: RenderingContext, book: Book): Promise<void> {
    const asset: Asset = {
        id: 'opf',
        category: 'metadata',
        type: 'application/xml',
        path: Paths.OPFPath,
        data: renderToXmlString(createOPFElement(context, book)),
    }
    context.bundle.addAssets(asset)
}

function createOPFElement(context: RenderingContext, book: Book) {
    return (
        <OPF {...book} id={book.name}>
            <Manifest>{
                context.bundle.assets.map(asset => <Manifest.Item {...manifestItemProps(asset)} />)
            }</Manifest>
            <Spine toc='ncx'>{
                context.bundle.text()
                    .map(asset => <Spine.ItemRef idref={asset.id} />)
            }</Spine>
            <Guide>
                <Guide.Reference type='cover' title='Cover Page' href='xhtml/cover.xhtml' />
                <Guide.Reference type='toc' title='Table of Contents' href='xhtml/toc.xhtml' />
            </Guide>
        </OPF>
    )
}

function manifestItemProps(asset: Asset): Manifest.ItemProps {
    const props: Manifest.ItemProps = {
        id: asset.id,
        href: Paths.relativeLink(Paths.OPFPath, asset.path),
        mediaType: asset.type,
    }
    if (asset.id === 'toc') {
        props.properties = 'nav'
    }
    return props
}

import { renderToXhtmlString, Xhtml } from 'epub-jsx'
import { Group } from '../structure'
import { Asset, RenderingContext, Paths } from '../bundle'
import { JSXInternal } from "preact/src/jsx";
import CSSProperties = JSXInternal.CSSProperties;

export async function renderGroup(context: RenderingContext, group: Group): Promise<void> {
    const asset: Asset = {
        id: group.uid,
        category: 'text',
        type: 'application/xhtml+xml',
        path: group.accept(Paths.NodePathVisitor),
        data: renderToXhtmlString(createGroupElement(context, group)),
    }
    context.bundle.addAssets(asset)
}

const createGroupElement = (context: RenderingContext, group: Group) =>
    <Xhtml {...context}
        stylesheets={context.bundle.stylesheets().map(i => i.path)}
        title={group.title}
    >
        <h2 style={groupTitleStyles}>{group.title}</h2>
    </Xhtml>

const groupTitleStyles: CSSProperties = {
    fontSize: '1.5em',
    margin: '50% 0 0 0',
    transform: 'translateY(-75%)',
    textAlign: 'center',
}

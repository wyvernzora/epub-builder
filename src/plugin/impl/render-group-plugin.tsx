import { renderToXhtmlString, Xhtml } from '@wyvernzora/epub-jsx'
import { Plugin } from '../plugin'
import { Assets, Context, Paths } from '../../codegen'
import { Group } from '../../structure'


export class RenderGroupPlugin extends Plugin {

    group = async (group: Group, assets: Assets, context: Context) => {
        const path = group.accept(Paths.NodePathVisitor)
        const dom = (
            <Xhtml
                title={group.title}
                language={context.book.language}
                stylesheets={
                    context.bundle.stylesheets()
                        .map(i => Paths.relativeLink(path, i.path))
                }
            ><h2 className="group-title">{group.title}</h2></Xhtml>
        )
        assets.push({
            id: group.uid,
            category: 'text',
            type: 'application/xhtml+xml',
            path: path,
            data: renderToXhtmlString(dom),
        })
    }

}

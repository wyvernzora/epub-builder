import { join, dirname, relative } from 'path'
import { NodeVisitor } from '../structure'

export namespace Paths {

    export const ContentBasePath = 'OPS'
    export const ContainerXmlPath = 'META-INF/container.xml'
    export const OPFPath = join(ContentBasePath, 'package.opf')
    export const NCXPath = join(ContentBasePath, 'toc.ncx')
    export const CoverPath = join(ContentBasePath, 'xhtml', 'cover.xhtml')
    export const TOCPath = join (ContentBasePath, 'xhtml', 'toc.xhtml')

    export const NodePathVisitor: NodeVisitor<string> = {
        visitBook: () => '',
        visitGroup: group => join(ContentBasePath, 'xhtml', `${group.path}/index.xhtml`),
        visitContent: content => join(ContentBasePath, 'xhtml', `${content.path}.xhtml`),
    }

    export const relativeLink = (basefile: string, href: string) => relative(dirname(basefile), href)

}


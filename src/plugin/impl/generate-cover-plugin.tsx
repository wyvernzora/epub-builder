import { renderToXhtmlString } from '@wyvernzora/epub-jsx'
import { Book, Content } from '../../structure'
import { Plugin } from '../plugin'
import { Assets, Context, Paths } from '../../codegen'


export class GenerateCoverPlugin extends Plugin {

    book = async (book: Book, assets: Assets, context: Context) => {
        const dom = (
            <h1 className='book-title'>{book.title}</h1>
        )
        const content = renderToXhtmlString(dom)

        context.guide.references.unshift({
            type: 'cover',
            title: 'Cover',
            href: Paths.relativeLink(Paths.OPFPath, Paths.CoverPath),
        })
        context.book.unshift(new Content({
            name: 'cover',
            role: 'cover',
            title: 'Cover',
            content: content,
        }))
    }

}

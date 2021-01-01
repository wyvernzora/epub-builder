import { Assets, Context } from '../../codegen'
import { Plugin } from '../plugin'
import { Book } from '../../structure'

const defaultCSS = `
.episode-title {
    display: block;
    font-size: 1.5em;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1em;
}
.book-title,
.group-title {
    font-size: 1.5em;
    margin: 50% 0 0 0;
    -webkit-transform: translateY(-75%);
    transform: translateY(-75%);
    text-align: center;
}
.toc-title {
    text-align: center;
}
.toc-book > ol {
    padding-left: 0;
    list-style: none;
}
.toc-group > ol {
    list-style: none;
}
.toc-group > a,
.toc-group > span{
    font-weight: bold;
}
`

interface Props {
    css?: string
}

export class StylesPlugin extends Plugin {
    private readonly _css: string

    constructor(props?: Props) {
        super();
        this._css = props?.css || defaultCSS
    }

    book = async (book: Book, assets: Assets, context: Context) => {
        const index = context.bundle.assets.filter(a => a.category === 'style').length

        context.bundle.pushAssets({
            category: 'style',
            type: 'text/css',
            path: `OPS/style/stylesheet-${index}.css`,
            data: this._css,
        })
    }

}

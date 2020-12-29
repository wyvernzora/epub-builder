import { Node } from "../structure";
import { RenderingContext } from "../codegen";
import { Component, createElement } from "preact";

export type PageProps<NodeType extends Node> = RenderingContext<NodeType> & {
    innerHtml?: string
}

export class Page<NodeType extends Node> extends Component<PageProps<NodeType>> {
    render() {
        const { innerHtml, stylesheets, language, node } = this.props;
        return createElement('html', {
            xmlns: 'http://www.w3.org/1999/xhtml',
            'xmlns:epub': 'http://www.idpf.org/2007/ops',
            lang: language,
            xmlLang: language,
        }, (
            <>
                <head>
                    <meta httpEquiv='Content-Type' content='text/html; charset=UTF=8'/>
                    <title>{node.title}</title>
                    {stylesheets.map(stylesheet => <link rel='stylesheet' href={stylesheet.path} />)}
                </head>
                {
                    innerHtml
                        ? <body dangerouslySetInnerHTML={{ __html: innerHtml! }} />
                        : <body>{this.props.children}</body>
                }
            </>
        ))
    }
}

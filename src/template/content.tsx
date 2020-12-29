import { Content } from "../structure";
import { Page } from "./page";
import React from "react";
import { RenderingContext } from "../codegen";


export class ContentComponent extends React.PureComponent<RenderingContext<Content>> {
    render(): JSX.Element {
        const { node } = this.props;
        return (
            <Page {...this.props} innerHtml={node.content} />
        )
    }
}

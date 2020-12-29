import React from "react";
import { Page } from "./page";
import { Group } from "../structure";
import { RenderingContext } from "../codegen";

const groupTitleStyles: React.CSSProperties = {
    fontSize: '1.5em',
    margin: '50% 0 0 0',
    transform: 'translateY(-75%)',
    textAlign: 'center',
}

export class GroupComponent extends React.PureComponent<RenderingContext<Group>> {
    render() {
        const { node } = this.props;
        return (
            <Page {...this.props}>
                <h2 style={groupTitleStyles}>{node.title}</h2>
            </Page>
        )
    }
}

import { Page } from "./page";
import { Group } from "../structure";
import { RenderingContext } from "../codegen";
import { FunctionalComponent } from "preact";
import { JSXInternal } from "preact/src/jsx";
import CSSProperties = JSXInternal.CSSProperties;

const groupTitleStyles: CSSProperties = {
    fontSize: '1.5em',
    margin: '50% 0 0 0',
    transform: 'translateY(-75%)',
    textAlign: 'center',
}

export const GroupComponent: FunctionalComponent<RenderingContext<Group>> = (props) => (
    <Page {...props}>
        <h2 style={groupTitleStyles}>{props.node.title}</h2>
    </Page>
)

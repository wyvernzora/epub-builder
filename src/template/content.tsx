import { Content } from "../structure";
import { Page } from "./page";
import { RenderingContext } from "../codegen";
import { FunctionComponent } from "preact";


export const ContentComponent: FunctionComponent<RenderingContext<Content>> = (props) =>
    (<Page {...props} innerHtml={props.node.content} />)

import { createElement, FunctionComponent } from "preact";

interface NavPointProps {
    id: string
    playOrder: number
    label: string
    link: string
}

export const NavPoint: FunctionComponent<NavPointProps> = (props) => {
    const { id, playOrder, label, link } = props;
    return createElement('navPoint', {
        id,
        playOrder,
        key: id,
    }, [
        <NavLabel text={label} />,
        <NavContent src={link} />,
        props.children,
    ])
}

export const NavLabel: FunctionComponent<{ text: string }> = ({ text }) =>
    createElement('navLabel', { }, <text>{text}</text>)

export const NavContent: FunctionComponent<{ src: string }> = ({ src }) =>
    createElement('content', { src })

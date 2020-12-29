import React from "react";

interface NavPointProps {
    id: string
    playOrder: number
    label: string
    link: string
}

export const NavPoint: React.FunctionComponent<NavPointProps> = (props) => {
    const { id, playOrder, label, link } = props;
    return React.createElement('navPoint', {
        id,
        playOrder,
        key: id,
    }, [
        <NavLabel text={label} />,
        <NavContent src={link} />,
        props.children,
    ])
}

export const NavLabel: React.FunctionComponent<{ text: string }> = ({ text }) =>
    React.createElement('navLabel', <text>{text}</text>)

export const NavContent: React.FunctionComponent<{ src: string }> = ({ src }) =>
    React.createElement('content', { src })

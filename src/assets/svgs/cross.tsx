import React from "react"
import { SvgXml } from "react-native-svg"

export const Cross = ({ }) => {
    const xml = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.17 13.83L13.83 8.17M13.83 13.83L8.17 8.17M8 21H14C19 21 21 19 21 14V8C21 3 19 1 14 1H8C3 1 1 3 1 8V14C1 19 3 21 8 21Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `
    return <SvgXml xml={xml} />
}
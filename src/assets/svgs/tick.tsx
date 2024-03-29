import React from "react"
import { SvgXml } from "react-native-svg"

export const Tick = ({ }) => {
    const xml = `<svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 3.5L2.5 5L6.5 1" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
    return <SvgXml xml={xml} />
}
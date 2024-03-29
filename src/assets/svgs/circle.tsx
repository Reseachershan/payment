import React from "react"
import { SvgXml } from "react-native-svg"

export const Circle = ({ width, height }: { width: string, height: string }) => {
    const xml = `<svg width=${width ? width : '49'} height=${height ? height : '49'} viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24.5" cy="24.5" r="24.5" fill="#F9F9F9"/>
    <circle cx="24.5" cy="24.5" r="24.5" fill="url(#paint0_linear_117_3023)" fill-opacity="0.54"/>
    <defs>
    <linearGradient id="paint0_linear_117_3023" x1="0" y1="0" x2="58.2472" y2="16.6348" gradientUnits="userSpaceOnUse">
    <stop stop-color="#BE00FF"/>
    <stop offset="1" stop-color="#3F46FF" stop-opacity="0.79"/>
    </linearGradient>
    </defs>
    </svg>`
    return <SvgXml xml={xml} />
}
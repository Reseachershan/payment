import React from "react"
import { SvgXml } from "react-native-svg"

export const RightTop = ({ }) => {
    const xml = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.67437 23.1056L2.67437 6.28631C2.67437 4.29998 4.29955 2.6748 6.28588 2.6748H23.1052" stroke="#F9F9F9" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M2.67437 23.1056L2.67437 6.28631C2.67437 4.29998 4.29955 2.6748 6.28588 2.6748H23.1052" stroke="url(#paint0_linear_326_419)" stroke-opacity="0.54" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <defs>
    <linearGradient id="paint0_linear_326_419" x1="23.1052" y1="2.6748" x2="-7.47944" y2="9.44841" gradientUnits="userSpaceOnUse">
    <stop stop-color="#BE00FF"/>
    <stop offset="1" stop-color="#3F46FF" stop-opacity="0.79"/>
    </linearGradient>
    </defs>
    </svg>`
    return <SvgXml xml={xml} />
}
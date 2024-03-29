

import React from "react"
import { SvgXml } from "react-native-svg"

export const LeftBottom = ({ }) => {
    const xml = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.70391 2.79183L2.70391 19.6111C2.70391 21.5975 4.32909 23.2227 6.31542 23.2227L23.1347 23.2227" stroke="#F9F9F9" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M2.70391 2.79183L2.70391 19.6111C2.70391 21.5975 4.32909 23.2227 6.31542 23.2227L23.1347 23.2227" stroke="url(#paint0_linear_326_425)" stroke-opacity="0.54" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <defs>
    <linearGradient id="paint0_linear_326_425" x1="23.1347" y1="23.2227" x2="-7.4499" y2="16.4491" gradientUnits="userSpaceOnUse">
    <stop stop-color="#BE00FF"/>
    <stop offset="1" stop-color="#3F46FF" stop-opacity="0.79"/>
    </linearGradient>
    </defs>
    </svg>`
    return <SvgXml xml={xml} />
}
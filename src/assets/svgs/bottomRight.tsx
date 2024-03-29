

import React from "react"
import { SvgXml } from "react-native-svg"

export const RightBottom = ({ }) => {
    const xml = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.2372 2.79183L23.2372 19.6111C23.2372 21.5975 21.612 23.2227 19.6257 23.2227L2.8064 23.2227" stroke="#F9F9F9" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M23.2372 2.79183L23.2372 19.6111C23.2372 21.5975 21.612 23.2227 19.6257 23.2227L2.8064 23.2227" stroke="url(#paint0_linear_326_421)" stroke-opacity="0.54" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <defs>
    <linearGradient id="paint0_linear_326_421" x1="2.8064" y1="23.2227" x2="33.391" y2="16.449" gradientUnits="userSpaceOnUse">
    <stop stop-color="#BE00FF"/>
    <stop offset="1" stop-color="#3F46FF" stop-opacity="0.79"/>
    </linearGradient>
    </defs>
    </svg>`
    return <SvgXml xml={xml} />
}

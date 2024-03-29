import React from "react"
import { SvgXml } from "react-native-svg"

export const LeftTop = ({ }) => {
    const xml = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.2077 23.1056L23.2077 6.28631C23.2077 4.29998 21.5825 2.6748 19.5962 2.6748H2.77686" stroke="#F9F9F9" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M23.2077 23.1056L23.2077 6.28631C23.2077 4.29998 21.5825 2.6748 19.5962 2.6748H2.77686" stroke="url(#paint0_linear_326_423)" stroke-opacity="0.54" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_326_423" x1="2.77686" y1="2.6748" x2="33.3615" y2="9.44841" gradientUnits="userSpaceOnUse">
<stop stop-color="#BE00FF"/>
<stop offset="1" stop-color="#3F46FF" stop-opacity="0.79"/>
</linearGradient>
</defs>
</svg>`
    return <SvgXml xml={xml} />
}
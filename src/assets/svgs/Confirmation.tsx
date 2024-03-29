import React from "react"
import { SvgXml } from "react-native-svg"

export const COnfitmation = ({ }) => {
    const xml = `<svg width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.2043 1.30226L3.71708 3.74633C2.22204 4.30535 1 6.0734 1 7.65944V17.3187C1 18.8528 2.01403 20.8678 3.24906 21.7908L8.83923 25.964C10.6723 27.342 13.6884 27.342 15.5214 25.964L21.1116 21.7908C22.3466 20.8678 23.3606 18.8528 23.3606 17.3187V7.65944C23.3606 6.0604 22.1386 4.29235 20.6436 3.73333L14.1564 1.30226C13.0513 0.899247 11.2833 0.899247 10.2043 1.30226Z" fill="white" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10 8.15708C10.6021 7.97499 11.2664 7.85593 12 7.85593C15.3149 7.85593 18 10.5733 18 13.928C18 17.2826 15.3149 20 12 20C8.68512 20 6 17.2826 6 13.928C6 12.6813 6.3737 11.5188 7.01038 10.5523M11.1419 6L9.14187 8.32516L11.474 10.048" stroke="#F9F9F9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10 8.15708C10.6021 7.97499 11.2664 7.85593 12 7.85593C15.3149 7.85593 18 10.5733 18 13.928C18 17.2826 15.3149 20 12 20C8.68512 20 6 17.2826 6 13.928C6 12.6813 6.3737 11.5188 7.01038 10.5523M11.1419 6L9.14187 8.32516L11.474 10.048" stroke="url(#paint0_linear_326_684)" stroke-opacity="0.54" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <defs>
    <linearGradient id="paint0_linear_326_684" x1="6" y1="6" x2="20.5558" y2="9.56314" gradientUnits="userSpaceOnUse">
    <stop stop-color="#BE00FF"/>
    <stop offset="1" stop-color="#3F46FF" stop-opacity="0.79"/>
    </linearGradient>
    </defs>
    </svg>`
    return <SvgXml xml={xml} />
}
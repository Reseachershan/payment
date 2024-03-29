import React from "react"
import { SvgXml } from "react-native-svg"

export const Receive = ({ }) => {
    const xml = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.25 13.925C9.25 14.992 10.075 15.85 11.087 15.85H13.155C14.035 15.85 14.75 15.102 14.75 14.167C14.75 13.166 14.31 12.803 13.661 12.572L10.35 11.417C9.701 11.186 9.261 10.834 9.261 9.82196C9.261 8.89796 9.976 8.13896 10.856 8.13896H12.924C13.936 8.13896 14.761 8.99696 14.761 10.064M12 7.04996V16.95" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M23 12C23 18.072 18.072 23 12 23C5.928 23 1 18.072 1 12C1 5.928 5.928 1 12 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.5 2.1V6.5M17.5 6.5H21.9M17.5 6.5L23 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    `
    return <SvgXml xml={xml} />
}
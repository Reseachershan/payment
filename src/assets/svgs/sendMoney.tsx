import React from "react"
import { SvgXml } from "react-native-svg"

export const SendMoney = ({ }) => {
    const xml = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.85693 13.5934C8.85693 14.6942 9.68029 15.5795 10.6903 15.5795H12.7541C13.6324 15.5795 14.346 14.8077 14.346 13.843C14.346 12.8103 13.9068 12.4357 13.2591 12.1974L9.95474 11.0057C9.30703 10.7674 8.86791 10.4042 8.86791 9.36011C8.86791 8.40677 9.58148 7.62368 10.4597 7.62368H12.5236C13.5336 7.62368 14.3569 8.50892 14.3569 9.60979M11.6014 6.50011V16.7144" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M23 12C23 18.072 18.072 23 12 23C5.928 23 1 18.072 1 12C1 5.928 5.928 1 12 1M23 5.4V1M23 1H18.6M23 1L17.5 6.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
    return <SvgXml xml={xml} />
}
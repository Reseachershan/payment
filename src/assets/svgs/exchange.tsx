import React from "react"
import { SvgXml } from "react-native-svg"

export const Exchange = ({ width = 18, height = 18 }) => {
    const xml = `
  <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13.49 17.01L18.5 11.99H1.5M6.51 0.989998L1.5 6.01H18.5" stroke="#7A7A7A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `
    return <SvgXml xml={xml} />
}
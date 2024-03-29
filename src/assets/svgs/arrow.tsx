import React from "react"
import { SvgXml } from "react-native-svg"

export const LeftArrow = ({ }) => {
  const xml = `
  <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff" stroke-width="102.4"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#000000" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path><path fill="#000000" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path></g></svg>
  `
  return <SvgXml xml={xml} />
}

export const RightArrowMini = ({ }) => {
  const xml = `
    <svg width="8" height="12" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 9L4.67453 5.70707C5.10849 5.31818 5.10849 4.68182 4.67453 4.29293L1 1" stroke="#F9F9F9" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M1 9L4.67453 5.70707C5.10849 5.31818 5.10849 4.68182 4.67453 4.29293L1 1" stroke="url(#paint0_linear_610_404)" stroke-opacity="0.54" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <defs>
        <linearGradient id="paint0_linear_610_404" x1="1" y1="1" x2="6.03992" y2="1.71967" gradientUnits="userSpaceOnUse">
          <stop stop-color="#BE00FF"/>
          <stop offset="1" stop-color="#3F46FF" stop-opacity="0.79"/>
        </linearGradient>
      </defs>
    </svg>
  `
  return <SvgXml xml={xml} />
}
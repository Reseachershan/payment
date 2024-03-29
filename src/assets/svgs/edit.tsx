import React from "react"
import { SvgXml } from "react-native-svg"

export const Edit = ({ width=18, height=18} ) => {
  const xml = `
  <?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="${width}px" height="${width}px">    <path d="M 18 2 L 15.585938 4.4140625 L 19.585938 8.4140625 L 22 6 L 18 2 z M 14.076172 5.9238281 L 3 17 L 3 21 L 7 21 L 18.076172 9.9238281 L 14.076172 5.9238281 z"/></svg>
  `
  return <SvgXml xml={xml} />
}
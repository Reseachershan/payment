import React from "react"
import { SvgXml } from "react-native-svg"

export const EyeOff = ({}) => {
  const xml = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.277 7.72295L7.72302 12.2769C7.11912 11.6731 6.77985 10.854 6.77985 9.99995C6.77985 9.57707 6.86315 9.15833 7.02497 8.76765C7.1868 8.37696 7.424 8.02197 7.72302 7.72295C8.02204 7.42393 8.37703 7.18673 8.76771 7.02491C9.1584 6.86308 9.57714 6.77979 10 6.77979C10.8541 6.77979 11.6731 7.11905 12.277 7.72295Z" stroke="#7A7A7A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15.238 4.39313C13.663 3.20513 11.863 2.55713 10 2.55713C6.82303 2.55713 3.86203 4.42913 1.80103 7.66913C0.991027 8.93813 0.991027 11.0711 1.80103 12.3401C2.51203 13.4561 3.34003 14.4191 4.24003 15.1931M6.77803 16.7771C7.80403 17.2091 8.89303 17.4431 10 17.4431C13.177 17.4431 16.138 15.5711 18.199 12.3311C19.009 11.0621 19.009 8.92913 18.199 7.66013C17.902 7.19213 17.578 6.75113 17.245 6.33713" stroke="#7A7A7A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13.159 10.63C13.0371 11.2578 12.7303 11.8349 12.2781 12.2871C11.8259 12.7393 11.2488 13.0461 10.621 13.168M7.723 12.277L1 19M19 1L12.277 7.723" stroke="#7A7A7A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `
  return <SvgXml xml={xml} />
}

export const EyeOn = ({}) => {
  const xml = `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `
  return <SvgXml xml={xml} />
}

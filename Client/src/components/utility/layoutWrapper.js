import React from "react";
import { LayoutContentWrapper } from "./layoutWrapper.style";

export default props => {
  const isIframe = JSON.parse(localStorage.getItem('data_config'))?.isIframe ? JSON.parse(localStorage.getItem('data_config')).isIframe : false
  return <LayoutContentWrapper
    style={{height : isIframe ? '100%' : 'auto'}}
    className={
      props.className != null
        ? `${props.className} isoLayoutContentWrapper`
        : "isoLayoutContentWrapper"
    }
    {...props}
  >
    {props.children}
  </LayoutContentWrapper>
}

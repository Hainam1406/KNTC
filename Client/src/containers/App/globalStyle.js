import { createGlobalStyle } from 'styled-components'
import { palette } from 'styled-theme';
import { transition } from "../../settings/style-util";

export default createGlobalStyle`
  .nav-text {
          font-size: 14px;
          color: ${palette('primary', 18)} !important;
          ${transition()};
  }
  .ant-menu-item-selected {
        background: ${palette('primary', 16)} !important;
  }
  .ant-menu-submenu > .ant-menu {
    background-color: ${palette('primary', 14)};
    
    &:active {
      background-color: ${palette('primary', 15)};
    }
    
    .ant-menu-submenu {
    
      @media only screen and (max-width: 500px) {
        display: none;
      }
      
      .ant-menu-submenu-title {
        .isoMenuHolder {
          align-items: center;
          color: #FFF;

          i {
            font-size: 19px;
            color: inherit;
            margin: 0 15px 0 0;
            width: 18px;
            ${transition()};
          }
        }
      }
    }
    
    .ant-menu-item {
      @media only screen and (max-width: 500px) {
        display: none;
      }
      .isoMenuHolder {
        align-items: center;
        color: #FFF;

        i {
          font-size: 19px;
          color: inherit;
          margin: 0 15px 0 0;
          width: 18px;
          ${transition()};
        }
      }
    }
  }
  
  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background: ${palette('primary', 16)} !important;
     .nav-text {
      color: ${palette('text', 7)} !important; 
    }
  }
  .ant-menu-item-active {
    background: ${palette('primary', 16)} !important;
    box-shadow: 0px 12px 4px -8px rgb(69 69 69);
    .nav-text {
      color: ${palette('text', 7)} !important;
    }
  }
  
  .ant-menu-item-selected > a, .ant-menu-item-selected > a:hover {
    color: #FFF;
  }
  
  .ant-menu-item > a {
    color: #FFF;
    
    &:hover {
      color: #FFF;
      font-weight: bold;
    }
  }
  


  
  .ant-select-dropdown-menu {
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    &::-webkit-scrollbar-track {
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: #bfc4cd;
        border-radius: 4px;
    }
  }
  
  .ant-select-tree-dropdown .ant-select-dropdown-search {
    top: -5px;
  }
  
  .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
    background-color: #e6f7ff !important;
  }
  
  .ant-select-disabled {
    color: rgba(0, 0, 0, 0.65);
  }
  
  .kkts-tooltip {
    .ant-tooltip-content {
      .ant-tooltip-inner {
        color: #222;
        background-color: rgba(255, 255, 255, 0.9);
        width: 500px;
        border: solid 1px #999;
      }
    }
  }
  /* .ant-form-item-label {
    display: flex;
    align-items: center;
  } */
  /// table antd

`;
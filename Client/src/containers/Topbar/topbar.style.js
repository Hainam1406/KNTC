import styled from 'styled-components';
import { palette } from 'styled-theme';
import { transition, borderRadius, boxShadow } from '../../settings/style-util';
import WithDirection from '../../settings/withDirection';

const TopbarWrapper = styled.div`
  .popupSubMenuInline  {
    display: grid;
    grid-template-columns: auto auto auto;
  }

  .ant-menu-submenu-popup {
    background: red;
  }
  .ant-menu-submenu-title {
    display: flex;
    align-items: center;
    height: 100%;
    p {
      color : #fff;
    }
  }
  .ant-menu-item  {
    display: flex;
    align-items: center;
  }
  .ant-menu {
  }
  .isomorphicTopbar {
    height : 50px;
    display: flex;
    justify-content: space-between;
    background-color: ${palette('primary', 17)};
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    /* padding: 0 31px 0 15px; */
    padding: 0 0;
    z-index: 1000;
    ${transition()};
    position: fixed;
    width: 100%;
    border: none;

    @media only screen and (max-width: 767px) {
      padding: 0px 15px 0px 15px !important;
    }

    /* &.collapsed {
      padding: 0 31px 0 15px;
      @media only screen and (max-width: 767px) {
        padding: 0px 15px !important;
      }
    } */
    .siteName_topbar {
      display: flex;
      align-items: center;
      font-size: 17px;
      color: ${palette('text', 5)};
      text-transform: uppercase;
      @media only screen and (max-width: 991px) {
        display: none;
      }
    }

    .isoIconWrapper i{
      color: ${palette('primary', 16)} !important;
    }

    .isoLeft {
      display: flex;
      align-items: center;
      min-width: max-content;
      position: relative;
      /* padding: 0 10px; */
      
      &::after
      {
        top: 0;
        z-index: -1;
        position: absolute;
        content: '';
        width : 140%;
        height : 100%;
        background: ${palette('primary', 16)} !important;
        clip-path: polygon(0 0%, 95% 0%, 100% 100%, 0% 100%);
      } 
      &::before
      {
        top: 0;
        z-index: -1;
        position: absolute;
        content: '';
        left: 136%;
        width : 10%;
        height : 100%;
        background: ${palette('primary', 16)} !important;
        clip-path: polygon(0 0, 25% 0, 100% 100%, 70% 100%)
      } 
         
      .triggerHeader {
        /* color: ${palette('text', 5)}; */
        color: white;
        display: inline-block;
        font-size: 16px;
        
        @media only screen and (max-width: 500px) {
          display: none; 
        }
      }
      
      img {
        width: 30px;
        display: inline-block;
        margin-right: 10px;
      }

      .triggerBtn {
        width: 24px;
        height: 100%;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        color: white;
        border: 0;
        outline: 0;
        position: relative;
        cursor: pointer;
        /* padding-left: 17px;
        padding-right: 48px; */
        /* display: none; */
        margin-left: 5px;
        margin-right: 5px;

        &:before {
          content: '\f20e';
          font-family: 'Ionicons';
          font-size: 26px;
          color: inherit;
          line-height: 0;
          position: absolute;
        }
        
        @media only screen and (max-width: 500px) {
          display: block; 
        }
      }
    }

    .isoRight {
      display: flex;
      align-items: center;

      li {
        margin-left: ${props => (props['data-rtl'] === 'rtl' ? '35px' : '0')};
        margin-right: ${props => (props['data-rtl'] === 'rtl' ? '0' : '35px')};
        cursor: pointer;
        line-height: normal;
        position: relative;
        display: inline-block;

        @media only screen and (max-width: 360px) {
          margin-left: ${props => (props['data-rtl'] === 'rtl' ? '25px' : '0')};
          margin-right: ${props => props['data-rtl'] === 'rtl' ? '0' : '25px'};
        }

        &:last-child {
          margin: 0;
        }

        i {
          font-size: 24px;
          color: ${palette('text', 0)};
          line-height: 1;
        }

        .isoIconWrapper {
          position: relative;
          line-height: normal;

          span {
            font-size: 12px;
            color: #fff;
            background-color: ${palette('secondary', 1)};
            width: 20px;
            height: 20px;
            display: -webkit-inline-flex;
            display: -ms-inline-flex;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            line-height: 20px;
            position: absolute;
            top: -8px;
            left: ${props => props['data-rtl'] === 'rtl' ? 'inherit' : '10px'};
            right: ${props => props['data-rtl'] === 'rtl' ? '10px' : 'inherit'};
            ${borderRadius('50%')};
          }
        }

        &.isoNotify {
          .isoIconWrapper {
            span {
              background-color: ${palette('primary', 2)};
            }
          }
        }

        &.isoUser {
          .isoImgWrapper {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            background-color: ${palette('grayscale', 9)};
            ${borderRadius('50%')};

            img {
              height: 100%;
              object-fit: cover;
            }

            .userActivity {
              width: 10px;
              height: 10px;
              display: block;
              background-color: ${palette('color', 3)};
              position: absolute;
              bottom: 0;
              right: 3px;
              border: 1px solid #ffffff;
              ${borderRadius('50%')};
            }
          }
        }
      }
    }
    
    .isoDashboardMenu {
      background: transparent;

      border-bottom: none;
      margin-right: auto;
      margin-left: 10px;
      width: 100%;
      overflow: hidden;
      @media only screen and (max-width: 500px) {
        display: none;
      }

      a {
        text-decoration: none;
        font-weight: 400;
      }

      .isoMenuHolder {
        align-items: center;
        color: #FFF !important;

        i {
          font-size: 19px;
          color: inherit;
          margin: 0 15px 0 0;
          width: 18px;
          ${transition()};
        }
      }

      .ant-menu-overflowed-submenu {
        color: #FFF;
      }

      .nav-text {
        font-size: 14px;
        color: #fff ;
        ${transition()};
      }

      .ant-menu-item-selected {
        background-color: ${palette('primary', 15)} !important;
        .anticon {
          color: #fff;
        }

        i {
          color: #fff;
        }

        .nav-text {
          color: #fff ;
        }
      }

      .ant-menu-item:hover {
        border-radius: 6px;
      }
      .ant-menu-item a {
        color :#fff ;
      }

      > li {
        &:hover {
          i,
          .nav-text {
            color: #ffffff ;
          }
        }
      }
      
      .ant-menu-submenu-selected {
        background-color: ${palette('primary', 15)} !important;
      }
      
      .ant-menu-item-selected {
        background-color: ${palette('primary', 15)} !important;
        border-radius: 6px;
      }
    }
  }

  .isoUserDropdown {
    .ant-popover-inner {
      .ant-popover-inner-content {
        .isoUserDropdownContent {
          padding: 7px 0;
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 0;
          right: 0;
          background-color: #ffffff;
          width: 220px;
          min-width: 160px;
          flex-shrink: 0;
          ${borderRadius('5px')};
          ${boxShadow('0 2px 10px rgba(0,0,0,0.2)')};
          ${transition()};

          .isoDropdownLink {
            font-size: 13px;
            color: ${palette('text', 1)};
            line-height: 1.1;
            padding: 7px 15px;
            background-color: transparent;
            text-decoration: none;
            display: flex;
            justify-content: flex-start;
            ${transition()};

            &:hover {
              background-color: ${palette('secondary', 6)};
            }
          }
        }
      }
    }
  }

  // Dropdown
  .ant-popover {
    .ant-popover-inner {
      .ant-popover-inner-content {
        .isoDropdownContent {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 0;
          right: 0;
          background-color: #ffffff;
          width: 360px;
          min-width: 160px;
          flex-shrink: 0;
          ${borderRadius('5px')};
          ${boxShadow('0 2px 10px rgba(0,0,0,0.2)')};
          ${transition()};

          @media only screen and (max-width: 767px) {
            width: 310px;
          }

          .isoDropdownHeader {
            border-bottom: 1px solid #f1f1f1;
            margin-bottom: 0px;
            padding: 15px 30px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            h3 {
              font-size: 14px;
              font-weight: 500;
              color: ${palette('text', 0)};
              text-align: center;
              text-transform: uppercase;
              margin: 0;
            }
          }

          .isoDropdownBody {
            width: 100%;
            height: 300px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            margin-bottom: 10px;
            background-color: ${palette('grayscale', 6)};

            .isoDropdownListItem {
              padding: 15px 30px;
              flex-shrink: 0;
              text-decoration: none;
              display: flex;
              flex-direction: column;
              text-decoration: none;
              width: 100%;
              ${transition()};

              &:hover {
                background-color: ${palette('grayscale', 3)};
              }

              .isoListHead {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 5px;
              }

              h5 {
                font-size: 13px;
                font-weight: 500;
                color: ${palette('text', 0)};
                margin-top: 0;
              }

              p {
                font-size: 12px;
                font-weight: 400;
                color: ${palette('text', 2)};
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }

              .isoDate {
                font-size: 11px;
                color: ${palette('grayscale', 1)};
                flex-shrink: 0;
              }
            }
          }

          .isoViewAllBtn {
            font-size: 13px;
            font-weight: 500;
            color: ${palette('text', 2)};
            padding: 10px 15px 20px;
            display: flex;
            text-decoration: none;
            align-items: center;
            justify-content: center;
            text-align: center;
            ${transition()};

            &:hover {
              color: ${palette('primary', 0)};
            }
          }

          .isoDropdownFooterLinks {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 30px 20px;

            a {
              font-size: 13px;
              font-weight: 500;
              color: ${palette('text', 0)};
              text-decoration: none;
              padding: 10px 20px;
              line-height: 1;
              border: 1px solid ${palette('border', 1)};
              display: flex;
              align-items: center;
              justify-content: center;
              ${transition()};

              &:hover {
                background-color: ${palette('primary', 0)};
                border-color: ${palette('primary', 0)};
                color: #ffffff;
              }
            }

            h3 {
              font-size: 14px;
              font-weight: 500;
              color: ${palette('text', 0)};
              line-height: 1.3;
            }
          }

          &.withImg {
            .isoDropdownListItem {
              display: flex;
              flex-direction: row;

              .isoImgWrapper {
                width: 35px;
                height: 35px;
                overflow: hidden;
                margin-right: 15px;
                display: -webkit-inline-flex;
                display: -ms-inline-flex;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                background-color: ${palette('grayscale', 9)};
                ${borderRadius('50%')};

                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              }

              .isoListContent {
                width: 100%;
                display: flex;
                flex-direction: column;

                .isoListHead {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 10px;
                }

                h5 {
                  margin-bottom: 0;
                  padding-right: 15px;
                }

                .isoDate {
                  font-size: 11px;
                  color: ${palette('grayscale', 1)};
                  flex-shrink: 0;
                }

                p {
                  white-space: normal;
                  line-height: 1.5;
                }
              }
            }
          }
        }
      }
    }

    &.topbarMail {
      .ant-popover-inner {
        .ant-popover-inner-content {
          .isoDropdownContent {
            @media only screen and (max-width: 519px) {
              right: -170px;
            }
          }
        }
      }
    }

    &.topbarMessage {
      .ant-popover-inner {
        .ant-popover-inner-content {
          .isoDropdownContent {
            @media only screen and (max-width: 500px) {
              right: -69px;
            }
          }
        }
      }
    }

    &.topbarNotification {
      .ant-popover-inner {
        .ant-popover-inner-content {
          .isoDropdownContent {
            @media only screen and (max-width: 500px) {
              right: -120px;
            }
          }
        }
      }
    }

    &.topbarAddtoCart {
      .ant-popover-inner {
        .ant-popover-inner-content {
          .isoDropdownContent {
            @media only screen and (max-width: 465px) {
              right: -55px;
            }

            .isoDropdownHeader {
              margin-bottom: 0;
            }

            .isoDropdownBody {
              background-color: ${palette('grayscale', 6)};
            }
          }
        }
      }
    }
  }
`;

export default WithDirection(TopbarWrapper);

import styled from "styled-components";
import { palette } from "styled-theme";
import { transition, borderRadius } from "../../settings/style-util";

const widthCollaped = "50px";
const widthCollapedMobile = "0px";
const widthExpanded = "260px";

const SidebarWrapper = styled.div`
    background: #2878d7;
    .scrollbar-sidebar {
        height: 100% !important;
    }

    .isomorphicSidebar
        .ant-menu-inline-collapsed
        .ant-menu-submenu-vertical
        > .ant-menu-submenu-title
        .anticon {
        opacity: 0;
        visibility: hidden;
    }

    .isomorphicSidebar {
        z-index: 999;
        padding: 0 10px 0 0;
        /* padding : 0 10px; */
        background: ${palette("primary", 17)};
        min-height: 100%;
        /* background: ${palette("sidebar", 0)}; */
        color: ${palette("sidebar", 1)};
        width: ${widthExpanded} !important;
        flex: 0 0 ${widthExpanded} !important;
        max-width: ${widthExpanded} !important;
        min-width: ${widthExpanded} !important;
        user-select: none;

        .scrollarea {
            height: calc(100vh - 70px);
        }

        @media only screen and (max-width: 500px) {
            position: absolute;
            box-shadow: 12px 0 15px -4px rgba(0, 0, 0, 0.3);
            width: 100% !important;
            flex: 0 0 100% !important;
            max-width: 100% !important;
            min-width: 220px !important;
            min-height: 0 !important;
        }

        &.ant-layout-sider-collapsed {
            width: ${widthCollaped};
            min-width: ${widthCollaped} !important;
            max-width: ${widthCollaped} !important;
            flex: 0 0 ${widthCollaped} !important;

            @media only screen and (max-width: 500px) {
                width: ${widthCollapedMobile};
                min-width: ${widthCollapedMobile} !important;
                max-width: ${widthCollapedMobile} !important;
                flex: 0 0 ${widthCollapedMobile} !important;
                height: 0 !important;
            }
        }

        .isoLogoWrapper {
            height: 50px;
            margin: 70px 0 0 0;
            padding: 0 10px;
            text-align: center;
            overflow: hidden;
            ${borderRadius()};

            div {
                a {
                    font-size: 21px;
                    line-height: 70px;
                    text-transform: uppercase;
                    color: ${palette("sidebar", 1)};
                    display: block;
                    text-decoration: none;
                }
            }
        }

        &.ant-layout-sider-collapsed {
            .isoLogoWrapper {
                padding: 0;

                /* background-size: 40px; */
                /* background-repeat: no-repeat; */
                /* background-position: center; */

                h3 {
                    a {
                        font-size: 27px;
                        font-weight: 500;
                        letter-spacing: 0;
                    }
                }
            }
        }

        .isoDashboardMenu {
            /* padding-top: 15px; */
            padding-bottom: 35px;
            /* background: transparent; */
            margin-top: 50px;
            border-right: 0;
            /* background: #2878D7; */
            background: ${palette("primary", 17)};
            a {
                text-decoration: none;
                font-weight: 400;
            }

            .ant-menu-submenu-title:hover {
                background: ${palette("primary", 16)};
                box-shadow: 0px 12px 4px -8px rgb(69 69 69);
                .nav-text {
                    color: ${palette("text", 7)} !important;
                }
                .ant-menu-submenu-arrow,
                .anticon {
                    color: ${palette("text", 7)} !important;
                }
                /* &::after {
          position: absolute;
          content:  '';
          bottom : 0;
          height : 5px;
          width : 100%;
          background: rgb(69,69,69);
          filter: blur(1px);

        } */
            }
            .ant-menu-submenu {
                padding: 0;
                border-radius: 0%;
                border-bottom: 1px solid #bfbdbd;
            }

            .ant-menu-item {
                width: 100%;
                display: -ms-flexbox;
                display: flex;
                -ms-flex-align: center;
                align-items: center;
                padding: 0 !important;
                margin: 0;

                &::after {
                    border-right: 0;
                }
                .parent {
                    color: ${palette("primary", 18)} !important;
                }
            }

            .isoMenuHolder {
                display: flex;
                align-items: center;
                /* color: ${palette("secondary", 1)}; */

                i {
                    font-size: 19px;
                    color: ${palette("text", 6)};
                    /* color: inherit; */
                    margin: 0 30px 0 0;
                    width: 18px;
                    ${transition()};
                }

                ion-icon {
                    color: ${palette("sidebar", 1)};
                    margin: 0 15px 0 10px;
                    width: 24px;
                    height: 24px;
                    ${transition()};
                }

                &.current {
                    ion-icon {
                        color: ${palette("sidebar", 1)};
                    }
                }
            }

            .anticon {
                font-size: 18px;
                margin-right: 30px;
                color: inherit;
                ${transition()};
            }
            /*       
      .ant-menu-title-content {
        background-color: red !important;
      } */

            .nav-text {
                font-size: 14px;
                color: ${palette("primary", 18)} !important;
                ${transition()};
            }

            .ant-menu-item-selected {
                /* background-color: ${palette("sidebar", 2)} !important; */
                i {
                    color: ${palette("sidebar", 1)};
                }

                ion-icon {
                    color: ${palette("sidebar", 1)};
                }

                .nav-text {
                    color: ${palette("sidebar", 1)};
                }

                &::after {
                    border-right: 0;
                }
            }

            .ant-menu-submenu-selected {
                .ant-menu-submenu-title {
                    /* //background-color: ${palette(
                        "primary",
                        0
                    )} !important; */
                    ion-icon {
                        //color: ${palette("sidebar", 0)};
                    }

                    .nav-text {
                        //color: ${palette("sidebar", 0)};
                    }
                }
            }
        }

        .ant-menu-dark .ant-menu-inline.ant-menu-sub {
            background: #2878d7;
        }

        .ant-menu-submenu-inline,
        .ant-menu-submenu-vertical {
            > .ant-menu-submenu-title {
                position: relative;
                width: 100%;
                display: flex;
                align-items: center;
                border-radius: 0%;
                padding: 0 0 !important;
                margin: 0 !important;

                > span {
                    display: flex;
                    align-items: center;
                }

                .ant-menu-submenu-arrow,
                .anticon {
                    opacity: 1;
                    left: calc(100% - 15px);
                    right: 25px;

                    &:before,
                    &:after {
                        /* background: #999; */
                        width: 8px;
                        ${transition()};
                    }

                    &:before {
                        transform: rotate(-45deg) translateX(3px);
                    }

                    &:after {
                        transform: rotate(45deg) translateX(-3px);
                    }
                }
            }

            .ant-menu-inline,
            .ant-menu-submenu-vertical {
                > li:not(.ant-menu-item-group) {
                    padding-left: 60px !important;
                    padding-right: 0px !important;
                    font-size: 13px;
                    font-weight: 400;
                    margin: 0;
                    ${transition()};
                    /* color: inherit; */

                    &:hover {
                        a {
                            /* color: #ffffff !important; */
                        }
                    }
                }

                .ant-menu-item-group {
                    padding-left: 0;

                    .ant-menu-item-group-title {
                        padding-left: 100px !important;
                    }
                    .ant-menu-item-group-list {
                        .ant-menu-item {
                            padding-left: 125px !important;
                        }
                    }
                }
            }

            .ant-menu-sub {
                box-shadow: none;
                /* background-color: transparent !important; */
            }

            &:hover {
                color: black;
            }
        }

        &.ant-layout-sider-collapsed {
            .nav-text {
                display: none;
            }

            .ant-menu-submenu-inline > {
                .ant-menu-submenu-title:after {
                    display: none;
                }
            }

            .ant-menu-submenu-vertical {
                > .ant-menu-submenu-title:after {
                    display: none;
                }

                .ant-menu-sub {
                    /* background-color: transparent !important; */

                    .ant-menu-item {
                        height: 35px;
                    }
                }

                .ant-menu-submenu-title {
                    .ant-menu-submenu-arrow {
                        display: none;
                    }
                }
            }
        }
    }
`;

export default SidebarWrapper;

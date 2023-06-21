import styled from "styled-components";
import { palette } from "styled-theme";

const collapseWrapper = (ComponentName) => styled(ComponentName)`
    background-color: ${palette("primary", 17)};
    border: none;
    padding: 10px 0px;

    & .ant-collapse-item {
        margin-bottom: 24px;
        border-radius: 8px;
        overflow: hidden;
        border: unset;
        box-shadow: 0 0 10px 5px ${palette("boxshadow", 0)};

        &:last-child {
            border-radius: 8px;
        }

        & .ant-collapse-header {
            color: ${palette("color", 14)};
        }

        & .ant-collapse-header-text {
            font-weight: bold;
        }

        & .ant-collapse-expand-icon {
            & span {
                font-size: 16px !important;
            }
        }

        &.ant-collapse-item-active {
            border-radius: 8px;

            & .ant-collapse-expand-icon svg {
                transform: rotate(180deg) !important;
            }
        }

        &.collapse-item-reverse {
            background-color: ${palette("secondary", 11)};

            & .ant-collapse-content-box {
                background-color: ${palette("secondary", 11)};
            }
        }
    }

    & .ant-collapse-content {
        border-top: unset;
        position: relative;

        &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            height: 2px;
            width: 25%;
            background-color: ${palette("color", 14)};
        }
    }
`;

export default collapseWrapper;

import { palette } from "styled-theme";
import { Button } from "../../../../components/uielements/exportComponent";
import styled from "styled-components";

const Wrapper = styled.div`
    .main-boxFilter {
        display: flex;
        align-items: center;
        .main-boxFilter__item {
            display: flex;
            align-items: center;
            p {
                margin-right: 5px;
            }
            input {
                flex-basis: content;
                /* flex-grow: 1;
                flex-shrink: 1;
                flex-basis: auto; */
            }
            .ant-checkbox-wrapper {
                display: flex;
                align-items: center;
            }
        }
        .main-boxFilter__item + .main-boxFilter__item {
            margin-left: 20px;
        }
    }
    & .ant-collapse-item.panel--extra > .ant-collapse-header {
        align-items: center;
    }
`;

export const FooterPageAction = styled.div`
    background-color: #fa8c16;
    padding: 10px;
    text-align: center;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
`;

export const PanelBoxWrapper = styled.div``;

export const PanelBoxHeader = styled.div`
    & .panel-box-header__text {
        margin-right: 50px;
    }
    & .panel-box-header__radio-group {
        & .panel-box-header__radio {
        }
    }
`;

export const PanelBoxBody = styled.div`
    & .form-item__action {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;

        & .form-item__btn {
            height: 35px;
            padding: 0 10px;
            // margin-right: 10px;
        }
    }
`;

export const PanelBoxLabel = styled.span`
    display: inline-block;
    margin: 15px 0;
`;

export const PanelBoxSectionWrapper = styled.div`
    position: relative;
    padding-top: 10px;
    margin-top: 10px;

    ${({ border }) =>
        !border &&
        `&::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        height: 1px;
        background: #d01e1e;
        box-shadow: 5px 5px 10px 2px #dedede;
    }`}
`;

export const ModalBodyWrapper = styled.div`
    background-color: ${palette("grayscale", 3)};
`;

export const ModalForm = styled.div`
    background-color: ${palette("primary", 17)};
    padding-bottom: 24px;

    & .align-center {
        text-align: center;
    }
`;

export const ModalTable = styled.div`
    margin-top: 24px;
    background-color: ${palette("primary", 17)};
`;

export const ModalTableHeader = styled.div`
    color: ${palette("primary", 14)};
    font-weight: 600;
    padding: 10px 0;
    position: relative;

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        width: 35%;
        background-color: ${palette("primary", 14)};
    }
`;

export const ModalTableBody = styled.div`
    padding-top: 16px;
`;

export const HoSoTaiLieuFormWrapper = styled.div`
    border-radius: 6px;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.25);
    margin: 0 0 20px;
    padding: 10px;
    position: relative;

    & .action-btn {
        position: absolute;
        top: 10px;
        right: 10px;
    }
`;

export const ConfirmText = styled.div``;

const BtnStyled = styled(Button)`
    font-family: inherit;
`;

export const ButtonResponsive = styled(BtnStyled)`
    // // Extra large devices (large desktops, 1200px and up)
    // @media (min-width: 1200px) {
    //     &.ant-btn {
    //         font-size: 14px;
    //     }
    // }

    // Large devices (desktops, less than 1200px)
    @media (max-width: 1199.98px) {
        &.ant-btn {
            font-size: 12px;
        }
    }

    // Medium devices (tablets, less than 992px)
    @media (max-width: 991.98px) {
        &.ant-btn {
            font-size: 11px;
        }
    }

    // Small devices (landscape phones, less than 768px)
    @media (max-width: 767.98px) {
        &.ant-btn {
            font-size: 14px;
        }
    }

    @media (max-width: 575.98px) {
        &.ant-btn {
            font-size: 14px;
        }
    }
`;

export const ButtonSave = styled(BtnStyled)`
    min-width: 100px;
    position: relative;

    // &::after {
    //     content: "Ctrl + S";
    //     position: absolute;
    //     top: 2px;
    //     right: 2px;
    //     font-size: 10px;
    //     background: ${(props) => props.bgcolor || "#fa8c16"};
    //     color: ${(props) => props.color || "#fff"};
    //     padding: 1px 3px;
    //     border-radius: 4px;
    // }

    &::after {
        content: "Ctrl + S";
        position: absolute;
        top: 0;
        left: 0;
        transform: rotate(270deg) translate(4%, -250%);
        transform-origin: 100% 0;
        font-size: 56%;
        background: ${(props) => props.bgcolor || "#fa8c16"};
        color: ${(props) => props.color || "#fff"};
        padding: 1px 4px;
        border-radius: 4px;
    }
`;

export const ButtonCancelPrimary = styled(BtnStyled)`
    background-color: #fa8c16 !important;
    border: none !important;
    padding-left: 30px !important;
    padding-right: 30px !important;

    // &::after {
    //     content: "Ctrl + H";
    //     position: absolute;
    //     top: 2px;
    //     right: 2px;
    //     font-size: 10px;
    //     background: #2878d7;
    //     color: #fff;
    //     padding: 1px 3px;
    //     border-radius: 4px;
    // }

    &::after {
        content: "Ctrl + H";
        position: absolute;
        top: 0;
        left: 0;
        transform: rotate(270deg) translate(0%, -235%);
        transform-origin: 100% 0;
        font-size: 56%;
        background: ${(props) => props.bgcolor || "#2878d7"};
        color: ${(props) => props.color || "#fff"};
        padding: 1px 3px;
        border-radius: 4px;
    }
`;

export const ButtonCancel = styled(ButtonCancelPrimary)`
    background-color: #ffffff !important;
    color: #fa8c16 !important;
`;

export default Wrapper;

import { Button } from "../../../../components/uielements/exportComponent";
import styled from "styled-components";
import list from "./img/list.png";
import { Modal } from "antd";

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

export const ButtonList = styled(Button)`
  min-width: 100px;
  position: relative;
  justify-content: space-between;
  display: flex;
  background-color: rgba(40, 120, 215, 1) !important;
  border: none !important;
`;

export const ButtonPrint = styled(Button)`
  min-width: 100px;
  position: relative;
  background-color: rgba(40, 120, 215, 1) !important;
  border: none !important;
`;

export const ButtonCancelPrimary = styled(Button)`
  background-color: #fa8c16 !important;
  border: none !important;
  padding-left: 30px;
  padding-right: 30px;
`;
export const ButtonCancelForm = styled(Button)`
  border: none !important;
  background-color: ${(props) => props.bgcolor || "#cf1322"} !important;
  color: ${(props) => props.color || "#fff"};
`;

export const ButtonCancel = styled(ButtonCancelPrimary)`
  background-color: #ffffff !important;
  color: #fa8c16 !important;
  padding: 4px 15px;
`;
export const BgrColorTabs = styled.div`
  .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab-active,
  .ant-tabs-card > div > .ant-tabs-nav .ant-tabs-tab-active {
    background: #ff0000;
    border: #ff0000 solid 1px;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #fff !important;
  }
  .ant-tabs {
    color: red;
  }
  .ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab + .ant-tabs-tab,
  .ant-tabs-card.ant-tabs-bottom > .ant-tabs-nav .ant-tabs-tab + .ant-tabs-tab,
  .ant-tabs-card.ant-tabs-top
    > div
    > .ant-tabs-nav
    .ant-tabs-tab
    + .ant-tabs-tab,
  .ant-tabs-card.ant-tabs-bottom
    > div
    > .ant-tabs-nav
    .ant-tabs-tab
    + .ant-tabs-tab {
    border: red solid 1px;
    margin: 0px 5px;
  }
  .ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab,
  .ant-tabs-card.ant-tabs-top > div > .ant-tabs-nav .ant-tabs-tab {
    border: red solid 1px;
  }
  .css-dev-only-do-not-override-1n7nwfa.ant-tabs .ant-tabs-tab:hover {
    color: #ff0000;
  }
  .ant-tabs .ant-tabs-tab-btn:active{
    color: #ff0000;
  }
`;
export const TitleModal = styled(Modal)`
  .ant-modal-title {
    background: #ff0000 !important;
    color: #fff !important;
    font-size: 22px !important;
    margin-left: 20px;
  }
  .ant-modal-header {
    background: #ff0000 !important;
  }
  .anticon {
    display: none;
  }
  .css-dev-only-do-not-override-1n7nwfa.ant-btn-default:not(:disabled):hover {
    border-color: #ff0000;
  }
`;

export const BgrFilterModal = styled.div`
  background: #eeeeee;
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
export const NoneBorder = styled.div`
  .ant-input {
    border: none !important;
  }
  .ant-form-item-label {
    font-weight: 600 !important;
  }
  .detail_header {
    font-style: italic;
    font-size: 17px;
  }
`;
export const PaddingCardChiTietDonThu = styled.div`
.ant-card .ant-card-body{
  padding: 0px !important;
}
.marginTop{
  margin: 10px 0 ;
}
.ant-input{
  height: 32px !important;
}
`

export default Wrapper;

import styled from "styled-components";
import { Modal } from "antd";

const Wrapper = styled.div`
    .main-boxFilter {
        display: flex;
        align-items: center;
        .main-boxFilter__item {
            display : flex;
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
                display : flex;
                align-items: center;
            }
        }
        .main-boxFilter__item + .main-boxFilter__item {
            margin-left: 20px;
        }
    }
`

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
  .text-title{
    padding: 10px;  
    /* justify-content: center;  
    align-items: center; */
    margin-left: 250px;
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



export default Wrapper
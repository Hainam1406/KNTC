import { Button, Row } from "antd";
import styled from "styled-components";
export const RowCustom = styled(Row)`
  .ant-form-item {
    margin-bottom: 0;
  }
  hr {
    border: 1px solid #cf1322;
  }
  .ant-btn {
    border-radius: 3px;
  }
  .ant-btn:hover {
    color: #fff;
  }
  .ant-picker {
    width: 100%;
  }
  .router2 {
    width: 100%;
  }
`;

export const RowRouter2 = styled(Row)`
  .ant-row {
    margin-left: auto !important;
    margin-right: auto !important;
  }
`;
export const RowCustom3 = styled(Row)`
  .ant-row {
    margin-left: 12px;
    margin-right: 12px;
  }
`;
export const ButtonCustom = styled(Button)`
  border: none;
  background: ${(props) => props.bgcolor || "#fa8c16"};
  color: ${(props) => props.color || "#fff"};
  border-radius: 3px;
`;

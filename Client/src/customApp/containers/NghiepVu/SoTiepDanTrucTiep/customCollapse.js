import React from "react";
import { Collapse } from "antd";
// import {
//   DatePicker,
//   Option,
//   Select,
//   Input,
//   Collapse,
// } from "../../../../components/uielements/exportComponent";
import styled from "styled-components";

const CustomCollapseStyled = styled(Collapse)`
  .ant-collapse-expand-icon {
    position: absolute;
    right: 0;
    top: 0px;
    color: #cf1322;
    svg {
      color: #cf1322;
      font-size: 25px;
      margin-top: 15px;
    }
  }
  :where(.css-dev-only-do-not-override-1n7nwfa).ant-collapse
    > .ant-collapse-item:last-child,
  :where(.css-dev-only-do-not-override-1n7nwfa).ant-collapse
    > .ant-collapse-item:last-child
    > .ant-collapse-header {
    margin-bottom: 15px;
  }
  .ant-collapse-content {
    background-clip: content-box;
    /* border-top: 3px solid #cf1322;
    border-image: linear-gradient(
      to right,
      #cf1322 25%,
      rgba(0, 0, 0, 0) 25% */
    /* ); to top - at 50% transparent */
    border-image-slice: 1;
    background-color: rgb(240, 240, 240);
  }
  .ant-collapse-header-text {
    font-size: 18px;
    color: #cf1322;
    /* font-weight: 500; */
  }
`;

const ThongTinHoSoTiepDan = ({
  defaultActiveKey,
  onChange,
  header,
  children,
}) => {
  const { Panel } = Collapse;

  return (
    <CustomCollapseStyled
      defaultActiveKey={defaultActiveKey || 0}
      onChange={onChange}
    >
      <Panel key={1}>{children}</Panel>
    </CustomCollapseStyled>
  );
};

export default ThongTinHoSoTiepDan;

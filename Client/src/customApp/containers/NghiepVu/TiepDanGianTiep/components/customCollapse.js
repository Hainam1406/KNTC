import React from "react";
import { Collapse, Row, theme } from "antd";
import styled from "styled-components";
import { CaretRightOutlined } from "@ant-design/icons";

const CustomCollapseStyled = styled(Collapse)`
    &.ant-collapse {
        background-color: unset;

        & .ant-collapse-header {
            flex-direction: row-reverse;
            color: #d01e1e;

            & .ant-collapse-expand-icon svg {
                width: 2em;
                height: 2em;
                transform: rotate(-90deg);
            }
        }
    }
`;

const { Panel } = Collapse;

export const CustomPanel = styled(Panel)``;

const CustomCollapse = ({ defaultActiveKey = [], onChange, children }) => {
    const { token } = theme.useToken();

    return (
        <Collapse
            bordered={false}
            defaultActiveKey={defaultActiveKey}
            expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            style={{
                background: token.colorBgContainer,
            }}
            onChange={onChange}
        >
            {children}
        </Collapse>
    );
};

export default CustomCollapse;

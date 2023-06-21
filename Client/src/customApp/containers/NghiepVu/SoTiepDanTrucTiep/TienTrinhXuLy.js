import { Col, Row, Steps } from "antd";
import React, { useEffect, useState } from "react";
import { CustomValueSteps } from "./styled";
export default function TienTrinhXuLy({ data, ...props }) {
  const [tienTrinhXuLy, setTienTrinhXuLy] = useState();
  useEffect(() => {
    if (data) {
      setTienTrinhXuLy(data?.TienTrinhXuLy);
    }
  }, [data]);
  return (
    <Steps
      direction="vertical"
      items={tienTrinhXuLy?.map((item, index) => ({
        title: <strong>{item.BuocThucHien}</strong>,
        status: "process",
        description: (
          <CustomValueSteps>
            <Row gutter={16}>
              <Col span={6}>
                <p className="margin">Thời gian thực hiện</p>
                <p className="color-time">{item.ThoiGianThucHien}</p>
              </Col>
              <Col span={6}>
                <p className="margin">Người cập nhập</p>
                <p className="color-user">{item.CanBoThucHien}</p>
              </Col>
              <Col span={6}>
                <p className="margin">Thao tác</p>
                <p className="color-time">{item.ThaoTac}</p>
              </Col>
              <Col span={6}>
                <p className="margin">Ý kiến của cán bộ thực hiện</p>
                <p className="color-user">{item.YKienCanBo}</p>
              </Col>
            </Row>
          </CustomValueSteps>
        ),
      }))}
    ></Steps>
  );
}

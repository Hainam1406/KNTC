import React, { useEffect, useState } from "react";
import { Form, Row, Col, Radio } from "antd";
import {
  Button,
  Input,
  Selectv4,
  Textarea,
  TreeSelect,
} from "../../../../../components/uielements/exportComponent";
import PanelBox, {
  PanelBoxSection,
} from "../../TiepDanGianTiep/components/PanelBox";
import { PanelBoxHeader } from "../../TiepDanGianTiep/styled";
import { REQUIRED } from "../../../../../settings/constants";
import { RadioGroup } from "../../../../../components/uielements/radio";
import { useSelector } from "react-redux";
const NoiDungKetQua = ({ form, chiTietDonTrung, ...props }) => {
  const [isDisable, setDisable] = useState(false);
  const action = useSelector((state) => state.ReducerTiepDan.actionTiepDan);

  useEffect(() => {
    if (chiTietDonTrung && action) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  });
  useEffect(() => {
    form.setFieldsValue({
      ...chiTietDonTrung,
    });
  }, [chiTietDonTrung]);
  return (
    <Form form={form} layout="vertical" disabled={isDisable}>
      <PanelBox isShowHeader={false}>
        <PanelBoxSection title={"Nội dung tiếp"} border={"none"}>
          <Row gutter={16}>
            <Col className="gutter-row" span={24}>
              <Form.Item
                label="Nội dung phản ánh khiếu nại, tố cáo"
                name="NoiDungTiep"
              >
                <Textarea
                  autoSize={{
                    minRows: 3,
                    maxRows: 3,
                  }}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={24}>
              <Form.Item
                label="Yêu cầu người được tiếp"
                name="YeuCauNguoiDuocTiep"
              >
                <Textarea
                  autoSize={{
                    minRows: 3,
                    maxRows: 3,
                  }}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={24}>
              <Form.Item
                label="Thông tin, tài liệu, bằng chứng do công dân cung cấp"
                name="ThongTinTaiTieu"
              >
                <Textarea
                  autoSize={{
                    minRows: 3,
                    maxRows: 3,
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </PanelBoxSection>
        <PanelBoxSection title={"Kết quả tiếp"}>
          <Row gutter={16}>
            <Col className="gutter-row" span={24}>
              <Form.Item
                label="Ý kiến các thành viên tham gia cùng tiếp"
                name="YKienThanhVienThamGia"
              >
                <Textarea
                  autoSize={{
                    minRows: 3,
                    maxRows: 3,
                  }}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={24}>
              <Form.Item
                label="Kết luận của người chủ trì (hoặc cán bộ tiếp)"
                name="KetQuaNguoiChuTri"
              >
                <Textarea
                  autoSize={{
                    minRows: 3,
                    maxRows: 3,
                  }}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={24}>
              <Form.Item
                label="Ý kiến của người được tiếp (nếu có)"
                name="NguoiDuocTiepPhatBieu"
              >
                <Textarea
                  autoSize={{
                    minRows: 3,
                    maxRows: 3,
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </PanelBoxSection>
        <PanelBoxSection>
          <Form.Item label={<span>Kết quả tiếp dân:</span>} name={"KQTiepDan"}>
            <RadioGroup>
              <Radio value={1}>Chưa giải quyết</Radio>
              <Radio value={2}>Đã có QD giải quyết</Radio>
              <Radio value={3}>Chưa có QD giải quyết</Radio>
              <Radio value={4}>Đã có bản án của tòa án</Radio>
            </RadioGroup>
          </Form.Item>
        </PanelBoxSection>
      </PanelBox>
    </Form>
  );
};

export default NoiDungKetQua;

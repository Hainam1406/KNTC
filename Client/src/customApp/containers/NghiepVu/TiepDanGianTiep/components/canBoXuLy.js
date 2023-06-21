import { Col, Row, message, Select } from "antd";
import PanelBox, { PanelBoxSection } from "./PanelBox";
import Form from "../../../../../components/uielements/form";
import {
    Input,
    // Select,
} from "../../../../../components/uielements/exportComponent";
import { REQUIRED } from "../../../../../settings/constants";
import api from "../config";
import { useEffect, useState } from "react";

function CanBoXuLy({ form, chiTietDonTrung, isUpdate, ...props }) {
    const [danhSachCanBo, setDanhSachCanBo] = useState([]);
    const [isDisableForm, setIsDisableForm] = useState(false);

    useEffect(() => {
        form &&
            chiTietDonTrung &&
            form.setFieldsValue({
                CanBoXuLy: chiTietDonTrung?.CanBoXuLyID || undefined,
            });
        setIsDisableForm(!isUpdate && !!chiTietDonTrung);
    }, [chiTietDonTrung]);

    const getListCanBo = async () => {
        try {
            let res = await api.DanhSachCanBo();

            let { Status, Data, Message } = res.data;

            if (Status === 1) {
                let listCanBo = Data.map((item) => ({
                    value: item.CanBoID,
                    label: item.TenCanBo,
                }));
                setDanhSachCanBo(listCanBo);
            } else {
                message.error(Message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    useEffect(() => {
        getListCanBo();
    }, []);

    return (
        <Form
            form={form}
            name="CanBoXuLyForm"
            layout="vertical"
            disabled={isDisableForm}
        >
            <PanelBox isShowHeader={false}>
                <PanelBoxSection border={"none"}>
                    <Row gutter={16}>
                        <Col
                            className="gutter-row"
                            xs={24}
                            sm={24}
                            md={12}
                            lg={8}
                            xl={8}
                            xxl={8}
                        >
                            <Form.Item label="Cán bộ xử lý" name="CanBoXuLy">
                                <Select options={danhSachCanBo} />
                            </Form.Item>
                        </Col>
                    </Row>
                </PanelBoxSection>
            </PanelBox>
        </Form>
    );
}

export default CanBoXuLy;

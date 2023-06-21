import { Col, Row, message } from "antd";
import PanelBox, { PanelBoxSection } from "./PanelBox";
import Form from "../../../../../components/uielements/form";
import {
    Input,
    Selectv4,
    Textarea,
} from "../../../../../components/uielements/exportComponent";
import { REQUIRED } from "../../../../../settings/constants";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DiaGioi from "./diaGioi";

function ThongTinDonThu({ form, chiTietDonTrung, isUpdate, ...props }) {
    const [danhSachLoaiKhieuTo, setDanhSachLoaiKhieuTo] = useState([]);
    const [danhSachLoaiDon, setDanhSachLoaiDon] = useState([]);
    const [danhSachKhieuTo, setDanhSachKhieuTo] = useState([]);
    const [danhSachChiTietKhieuTo, setDanhSachChiTietKhieuTo] = useState([]);
    const [isDisableForm, setIsDisableForm] = useState(false);
    const [diaGioiID, setDiaGioiID] = useState({
        TinhID: undefined,
        HuyenID: undefined,
        XaID: undefined,
    });

    const DanhSachLoaiKhieuTo = useSelector(
        (state) => state.DanhMucLoaiKhieuTo.DanhSachCoQuan
    );

    const isExistsLoaiKhieuTo = (khieuToID, listKhieuTo) => {
        let result =
            listKhieuTo && listKhieuTo.find((item) => item.value === khieuToID);

        return result ? khieuToID : undefined;
    };

    useEffect(() => {
        setIsDisableForm(!isUpdate && !!chiTietDonTrung);

        if (chiTietDonTrung) {
            let { TinhID, HuyenID, XaID, LoaiKhieuTo1ID, LoaiKhieuTo2ID } =
                chiTietDonTrung;

            handleChangeKhieuTo(LoaiKhieuTo1ID, 1);
            handleChangeKhieuTo(LoaiKhieuTo2ID, 2);

            form.setFieldsValue({
                LoaiKhieuTo1ID: chiTietDonTrung?.LoaiKhieuTo1ID || undefined,

                LoaiKhieuTo2ID: isExistsLoaiKhieuTo(
                    chiTietDonTrung?.LoaiKhieuTo2ID,
                    danhSachLoaiKhieuTo
                ),
                LoaiKhieuTo3ID: isExistsLoaiKhieuTo(
                    chiTietDonTrung?.LoaiKhieuTo3ID,
                    danhSachLoaiKhieuTo
                ),
                SoNha: chiTietDonTrung?.DiaChiPhatSinh,
                TinhID: chiTietDonTrung?.TinhID || undefined,
                HuyenID: chiTietDonTrung?.HuyenID || undefined,
                XaID: chiTietDonTrung?.XaID || undefined,
                NoiDungDon: chiTietDonTrung?.NoiDungDon,
                CoQuanGiaiQuyet: chiTietDonTrung?.TenCoQuanGQ,
            });

            setDiaGioiID({
                TinhID,
                HuyenID,
                XaID,
            });
        } else {
            setDanhSachKhieuTo([]);
            setDanhSachChiTietKhieuTo([]);
            setDiaGioiID({
                TinhID: undefined,
                HuyenID: undefined,
                XaID: undefined,
            });
        }
    }, [chiTietDonTrung]);

    function handleChangeKhieuTo(id, cap) {
        if (cap === 1) {
            let listKhieuTo = danhSachLoaiKhieuTo.filter(
                (item) => item.parentID === id
            );
            form.setFieldsValue({
                LoaiKhieuTo2ID: undefined,
                LoaiKhieuTo3ID: undefined,
            });
            setDanhSachKhieuTo(listKhieuTo);
            setDanhSachChiTietKhieuTo([]);
        } else if (cap === 2) {
            let listChiTietKhieuTo = danhSachLoaiKhieuTo.filter(
                (item) => item.parentID === id
            );
            form.setFieldsValue({
                LoaiKhieuTo3ID: undefined,
            });
            setDanhSachChiTietKhieuTo(listChiTietKhieuTo);
        } else {
        }
    }

    function handleTreeList(list) {
        let result = [];

        list.forEach((item) => {
            if (item.DanhMucLoaiKhieuToCon.length > 0) {
                result.push({
                    value: item.LoaiKhieuToID,
                    label: item.TenLoaiKhieuTo,
                    parentID: item.LoaiKhieuToCha,
                    level: item.Cap,
                });
                let res = handleTreeList(item.DanhMucLoaiKhieuToCon);
                result = result.concat(res);
            } else {
                result.push({
                    value: item.LoaiKhieuToID,
                    label: item.TenLoaiKhieuTo,
                    parentID: item.LoaiKhieuToCha,
                    level: item.Cap,
                });
            }
        });

        return result;
    }

    const handleResetLoaiKhieuTo = () => {
        setDanhSachKhieuTo([]);
        setDanhSachChiTietKhieuTo([]);
    };

    useEffect(() => {
        let newListLoaiKhieuTo = handleTreeList(DanhSachLoaiKhieuTo);

        let listLoaiDon = newListLoaiKhieuTo.filter((item) => item.level === 1);

        setDanhSachLoaiDon(listLoaiDon);
        setDanhSachLoaiKhieuTo(newListLoaiKhieuTo);
    }, [DanhSachLoaiKhieuTo]);

    return (
        <Form
            form={form}
            name="ThongTinDonThuForm"
            layout="vertical"
            disabled={isDisableForm}
            scrollToFirstError={true}
        >
            <PanelBox isShowHeader={false}>
                <PanelBoxSection border={"none"}>
                    <Row gutter={[16, 0]}>
                        <Col
                            className="gutter-row"
                            xs={24}
                            sm={24}
                            md={8}
                            lg={8}
                            xl={8}
                            xxl={4}
                        >
                            <Form.Item
                                label="Loại đơn"
                                name="LoaiKhieuTo1ID"
                                rules={[REQUIRED]}
                                onReset={handleResetLoaiKhieuTo}
                            >
                                <Selectv4
                                    onChange={(value) =>
                                        handleChangeKhieuTo(value, 1)
                                    }
                                    options={danhSachLoaiDon}
                                />
                            </Form.Item>
                        </Col>
                        <Col
                            className="gutter-row"
                            xs={24}
                            sm={24}
                            md={8}
                            lg={4}
                            xl={8}
                            xxl={4}
                        >
                            <Form.Item
                                label="Loại khiếu nại, tố cáo"
                                name="LoaiKhieuTo2ID"
                                rules={[REQUIRED]}
                            >
                                <Selectv4
                                    disabled={
                                        danhSachKhieuTo.length === 0 ||
                                        (!!chiTietDonTrung && !isUpdate)
                                    }
                                    onChange={(value) =>
                                        handleChangeKhieuTo(value, 2)
                                    }
                                    options={danhSachKhieuTo}
                                />
                            </Form.Item>
                        </Col>
                        {danhSachChiTietKhieuTo.length > 0 && (
                            <Col
                                className="gutter-row"
                                xs={24}
                                sm={24}
                                md={8}
                                lg={8}
                                xl={8}
                                xxl={4}
                            >
                                <Form.Item
                                    label="Chi tiết loại khiếu nại, tố cáo"
                                    name="LoaiKhieuTo3ID"
                                    rules={[REQUIRED]}
                                >
                                    <Selectv4
                                        options={danhSachChiTietKhieuTo}
                                    />
                                </Form.Item>
                            </Col>
                        )}
                    </Row>
                </PanelBoxSection>
                <PanelBoxSection title="Nơi phát sinh vụ việc">
                    <Row gutter={16}>
                        <Col
                            className="gutter-row"
                            xs={24}
                            sm={24}
                            md={24}
                            lg={12}
                            xl={12}
                            xxl={12}
                        >
                            <Form.Item
                                label="Số nhà, tổ/thôn xóm/khu phố"
                                name="SoNha"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col
                            className="gutter-row"
                            xs={24}
                            sm={24}
                            md={24}
                            lg={12}
                            xl={12}
                            xxl={12}
                        >
                            <DiaGioi
                                form={form}
                                label={{
                                    tinh: "Chọn tỉnh",
                                    huyen: "Chọn huyện",
                                    xa: "Chọn xã",
                                }}
                                diaGioiID={diaGioiID}
                            />
                        </Col>
                    </Row>
                </PanelBoxSection>
                <PanelBoxSection>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={24}>
                            <Form.Item
                                label="Nội dung đơn"
                                name="NoiDungDon"
                                rules={[REQUIRED]}
                            >
                                <Textarea
                                    autoSize={{
                                        minRows: 6,
                                        maxRows: 6,
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </PanelBoxSection>
                <PanelBoxSection>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={24}>
                            <Form.Item
                                label="Cơ quan giải quyết"
                                name="CoQuanGiaiQuyet"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                </PanelBoxSection>
            </PanelBox>
        </Form>
    );
}

export default ThongTinDonThu;

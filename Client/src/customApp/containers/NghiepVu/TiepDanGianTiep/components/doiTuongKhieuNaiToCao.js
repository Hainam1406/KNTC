import { Col, Row, message } from "antd";
import PanelBox, { PanelBoxSection } from "./PanelBox";
import Form from "../../../../../components/uielements/form";
import {
    Input,
    Selectv4,
} from "../../../../../components/uielements/exportComponent";
import { REQUIRED } from "../../../../../settings/constants";
import { useEffect, useLayoutEffect, useState } from "react";
import NguoiDaiDienForm from "./NguoiDaiDienForm";
import api from "../config";

function DoiTuongKhieuNaiToCao({ form, chiTietDonTrung, isUpdate, ...props }) {
    /*
        Loại đối tượng:
            1 - Cá nhân
            2 - Cơ quan, tổ chức
            3 - Tập thể
    */
    const [danhSachLoaiDoiTuongKN, setDanhSachLoaiDoiTuongKN] = useState([]);
    const [loaiDoiTuong, setLoaiDoiTuong] = useState({
        name: null,
        value: null,
    });
    const [nguoiDaiDien, setNguoiDaiDien] = useState({
        soNguoi: 0,
        options: [],
        disabled: true,
    });
    const [isDisableForm, setIsDisableForm] = useState(false);
    const [diaGioiID, setDiaGioiID] = useState();

    useLayoutEffect(() => {
        if (loaiDoiTuong.value === 3) {
            setNguoiDaiDien({
                soNguoi: 0,
                options: [],
                disabled: true,
            });
            renderListNguoiDaiDien(0);
        }

        form.setFieldValue("LoaiDoiTuongKNID", loaiDoiTuong.ID);
    }, [loaiDoiTuong]);

    useEffect(() => {
        form.setFieldsValue({
            ...chiTietDonTrung,
            DanTocID: chiTietDonTrung?.DanTocID || undefined,
            SoNha: chiTietDonTrung?.DiaChiCT,
        });
        setIsDisableForm(!isUpdate && !!chiTietDonTrung);

        if (chiTietDonTrung) {
            let { TinhID, HuyenID, XaID } = chiTietDonTrung;
            setDiaGioiID({
                TinhID,
                HuyenID,
                XaID,
            });
        }
    }, [chiTietDonTrung]);

    const handleChangePanel = (value) => {
        setLoaiDoiTuong(value);
        form.resetFields();
    };

    const handleListNguoiDaiDien = (number) => {
        let listNguoiDaiDien = [];
        for (let i = 1; i <= number; i++) {
            listNguoiDaiDien.push({
                value: i,
                label: `${i} người`,
            });
        }
        return listNguoiDaiDien;
    };

    const handleChangeSoNguoi = (e) => {
        form.setFieldsValue({
            SoNguoiDaiDien: undefined,
        });

        const { value } = e.target;
        let totalNumberOfPeople = isNaN(Number(value)) ? 2 : Number(value);

        console.log(totalNumberOfPeople, "number");
        if (totalNumberOfPeople >= 5 && totalNumberOfPeople <= 10) {
            setNguoiDaiDien({
                options: handleListNguoiDaiDien(2),
                disabled: false,
            });
        } else if (totalNumberOfPeople > 10) {
            setNguoiDaiDien({
                options: handleListNguoiDaiDien(5),
                disabled: false,
            });
        } else {
            if (totalNumberOfPeople >= 2 && totalNumberOfPeople <= 4) {
                setNguoiDaiDien({
                    options: handleListNguoiDaiDien(totalNumberOfPeople),
                    disabled: false,
                });
            } else {
                setNguoiDaiDien({
                    soNguoi: 0,
                    options: [],
                    disabled: true,
                });
            }
        }
    };

    const handleChangeSoNguoiDaiDien = (value) => {
        setNguoiDaiDien((pre) => ({
            ...pre,
            soNguoi: value,
        }));
    };

    useEffect(() => {
        form.setFieldValue(
            "NguoiDaiDien",
            renderListNguoiDaiDien(nguoiDaiDien.soNguoi)
        );
    }, [nguoiDaiDien.soNguoi]);

    const renderListNguoiDaiDien = (number) => {
        let list = [];

        for (let i = 0; i < number; i++) {
            list.push({});
        }

        return list;
    };

    const getListLoaiDoiTuongKN = async () => {
        try {
            let res = await api.DanhSachLoaiDoiTuongKN();

            let { Status, Data, Message } = res.data;

            if (Status === 1) {
                let newData = Data.map((item, index) => ({
                    ID: item.LoaiDoiTuongKNID,
                    value: index + 1,
                    label: item.TenLoaiDoiTuongKN,
                }));

                setDanhSachLoaiDoiTuongKN(newData);
            } else {
                message.error(Message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    useEffect(() => {
        getListLoaiDoiTuongKN();
    }, []);

    useEffect(() => {
        form.setFieldValue("LoaiDoiTuongKNID", danhSachLoaiDoiTuongKN[0]?.ID);
    }, [danhSachLoaiDoiTuongKN]);

    return (
        <PanelBox
            headerText="Loại đối tượng"
            radioData={danhSachLoaiDoiTuongKN}
            radioGroupName="DoiTuongKhieuNaiToCao"
            onChangeRadio={handleChangePanel}
            disabled={isDisableForm}
        >
            <Form
                form={form}
                name="DoiTuongKhieuNaiToCaoForm"
                layout="vertical"
                disabled={isDisableForm}
                scrollToFirstError={true}
            >
                <Form.Item
                    name="LoaiDoiTuongKNID"
                    style={{ display: "none" }}
                ></Form.Item>
                {loaiDoiTuong.value === 2 ? (
                    <>
                        <PanelBoxSection title={"Thông tin cơ quan, tổ chức"}>
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
                                    <Form.Item
                                        label="Tên cơ quan, tổ chức"
                                        name="TenCQ"
                                        rules={[REQUIRED]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col
                                    className="gutter-row"
                                    xs={24}
                                    sm={24}
                                    md={12}
                                    lg={16}
                                    xl={16}
                                    xxl={16}
                                >
                                    <Form.Item
                                        label="Địa chỉ cơ quan, tổ chức"
                                        name="DiaChiCQ"
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </PanelBoxSection>
                        <NguoiDaiDienForm
                            diaGioiID={diaGioiID}
                            title="Người đại diện"
                            form={form}
                            isDisableForm={isDisableForm}
                            isFormList={false}
                        />
                    </>
                ) : loaiDoiTuong.value === 3 ? (
                    <>
                        <PanelBoxSection title={"Thông tin tập thể"}>
                            <Row gutter={16}>
                                <Col
                                    className="gutter-row"
                                    xs={12}
                                    sm={12}
                                    md={8}
                                    lg={4}
                                    xl={4}
                                    xxl={4}
                                >
                                    <Form.Item
                                        label="Số người"
                                        name="SoLuong"
                                        rules={[REQUIRED]}
                                        onChange={handleChangeSoNguoi}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col
                                    className="gutter-row"
                                    xs={12}
                                    sm={12}
                                    md={8}
                                    lg={4}
                                    xl={4}
                                    xxl={4}
                                >
                                    <Form.Item
                                        label="Số người đại diện"
                                        name="SoNguoiDaiDien"
                                    >
                                        <Selectv4
                                            disabled={
                                                nguoiDaiDien.disabled ||
                                                !!chiTietDonTrung
                                            }
                                            options={nguoiDaiDien.options}
                                            onChange={
                                                handleChangeSoNguoiDaiDien
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </PanelBoxSection>
                        <Form.List name="NguoiDaiDien">
                            {(fields) => (
                                <>
                                    {fields.map(
                                        ({ key, name, ...resetFields }) => (
                                            <NguoiDaiDienForm
                                                diaGioiID={diaGioiID}
                                                key={key}
                                                title="Người đại diện"
                                                nameField={name}
                                                resetFields={resetFields}
                                                form={form}
                                                isDisableForm={isDisableForm}
                                                isFormList={true}
                                            />
                                        )
                                    )}
                                </>
                            )}
                        </Form.List>
                    </>
                ) : (
                    <NguoiDaiDienForm
                        diaGioiID={diaGioiID}
                        title="Người đại diện"
                        form={form}
                        isDisableForm={isDisableForm}
                        isFormList={false}
                    />
                )}
            </Form>
        </PanelBox>
    );
}

export default DoiTuongKhieuNaiToCao;

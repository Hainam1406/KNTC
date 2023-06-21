import { Col, Row, message } from "antd";
import Form from "../../../../../components/uielements/form";
import { Selectv4 } from "../../../../../components/uielements/exportComponent";
import apiDiaGioi from "../../../DanhMuc/DMDiaGioi/config";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function DiaGioi({
    isFormList,
    nameField,
    form,
    label = {
        tinh: (
            <span>
                Địa chỉ &#40;
                <i
                    style={{
                        color: "red",
                    }}
                >
                    Chọn tỉnh, huyện, xã
                </i>
                &#41;
            </span>
        ),
        huyen: " ",
        xa: " ",
    },
    onChange,
    diaGioiID,
    ...props
}) {
    const [danhSachTinh, setDanhSachTinh] = useState([]);
    const [danhSachHuyen, setDanhSachHuyen] = useState([]);
    const [danhSachXa, setDanhSachXa] = useState([]);
    const [diaGioi, setDiaGioi] = useState("");

    const DanhSachTinh = useSelector(
        (state) => state.DanhMucDiaGioi.DanhSachTinh
    );

    const DonThuID = useSelector((state) => state.TiepDanGianTiep.DonThuID);

    const getListDiaGioi = async (ID = 1, Cap = 0) => {
        try {
            let res = await apiDiaGioi.danhSachDiaGioi({
                ID,
                Cap,
            });

            let { Data } = res.data;

            let list = Data.map((item) => ({
                value: item.ID,
                label: item.Ten,
            }));

            if (Cap === 2) {
                setDanhSachHuyen(list);
            } else if (Cap === 3) {
                setDanhSachXa(list);
            } else {
                setDanhSachTinh(list);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    useEffect(() => {
        let newDanhSachTinh = DanhSachTinh.map((item) => ({
            value: item.ID,
            label: item.Ten,
        }));
        setDanhSachTinh(newDanhSachTinh);
    }, [DanhSachTinh]);

    const onChangeTinhHuyenXa = (Cap, value) => {
        let nguoiDaiDienFields = form.getFieldValue("NguoiDaiDien");
        new Promise((resolve, reject) => {
            if (Cap === 0) {
                setDanhSachHuyen([]);
                setDanhSachXa([]);
                if (nguoiDaiDienFields && nameField !== undefined) {
                    nguoiDaiDienFields[nameField] = {
                        ...nguoiDaiDienFields[nameField],
                        HuyenID: undefined,
                        XaID: undefined,
                    };
                    form.setFieldValue("NguoiDaiDien", nguoiDaiDienFields);
                } else {
                    form.setFieldsValue({
                        HuyenID: undefined,
                        XaID: undefined,
                    });
                }
            } else if (Cap === 2) {
                setDanhSachXa([]);
                if (nguoiDaiDienFields && nameField !== undefined) {
                    nguoiDaiDienFields[nameField] = {
                        ...nguoiDaiDienFields[nameField],
                        XaID: undefined,
                    };
                    form.setFieldValue("NguoiDaiDien", nguoiDaiDienFields);
                } else {
                    form.setFieldsValue({
                        XaID: undefined,
                    });
                }
            }
            resolve();
        }).then(() => {
            switch (Cap) {
                case 2: {
                    if (value) getListDiaGioi(value, 3);
                    setDiaGioi((pre) => ({
                        ...pre,
                        Huyen: danhSachHuyen.find(
                            (item) => item.value === value
                        )?.label,
                        Xa: undefined,
                    }));
                    break;
                }
                case 3:
                    setDiaGioi((pre) => ({
                        ...pre,
                        Xa: danhSachXa.find((item) => item.value === value)
                            ?.label,
                    }));
                    break;

                default: {
                    if (value) getListDiaGioi(value, 2);
                    setDiaGioi((pre) => ({
                        ...pre,
                        Tinh: danhSachTinh.find((item) => item.value === value)
                            ?.label,
                        Huyen: undefined,
                        Xa: undefined,
                    }));
                    break;
                }
            }
        });
    };

    useEffect(() => {
        onChange && onChange(diaGioi);
    }, [diaGioi]);

    useEffect(() => {
        let nguoiDaiDienFields = form.getFieldValue("NguoiDaiDien");
        if (DonThuID && diaGioiID) {
            let TinhID = diaGioiID.TinhID;
            let HuyenID = diaGioiID.HuyenID;
            let XaID = diaGioiID.XaID;

            if (TinhID) {
                getListDiaGioi(TinhID, 2);
            } else {
                if (nguoiDaiDienFields && nameField !== undefined) {
                    nguoiDaiDienFields[nameField] = {
                        TinhID: undefined,
                        HuyenID: undefined,
                        XaID: undefined,
                    };
                    form.setFieldValue("NguoiDaiDien", nguoiDaiDienFields);
                } else {
                    form.setFieldsValue({
                        TinhID: undefined,
                        HuyenID: undefined,
                        XaID: undefined,
                    });
                }
                return;
            }

            if (HuyenID) {
                getListDiaGioi(HuyenID, 3);
            } else {
                if (nguoiDaiDienFields && nameField !== undefined) {
                    nguoiDaiDienFields[nameField] = {
                        ...nguoiDaiDienFields[nameField],
                        HuyenID: undefined,
                        XaID: undefined,
                    };
                    form.setFieldValue("NguoiDaiDien", nguoiDaiDienFields);
                } else {
                    form.setFieldsValue({
                        HuyenID: undefined,
                        XaID: undefined,
                    });
                }
                return;
            }

            if (!XaID) {
                if (nguoiDaiDienFields && nameField !== undefined) {
                    nguoiDaiDienFields[nameField] = {
                        ...nguoiDaiDienFields[nameField],
                        XaID: undefined,
                    };
                    form.setFieldValue("NguoiDaiDien", nguoiDaiDienFields);
                } else {
                    form.setFieldsValue({
                        XaID: undefined,
                    });
                }
            }
        } else {
            if (nguoiDaiDienFields && nameField !== undefined) {
                nguoiDaiDienFields[nameField] = {
                    TinhID: undefined,
                    HuyenID: undefined,
                    XaID: undefined,
                };
                form.setFieldValue(nameField, nguoiDaiDienFields);
            } else {
                form.setFieldsValue({
                    TinhID: undefined,
                    HuyenID: undefined,
                    XaID: undefined,
                });
            }
        }
    }, [DonThuID, diaGioiID]);

    return (
        <Row gutter={16}>
            <Col
                className="gutter-row"
                xs={24}
                sm={24}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
            >
                <Form.Item
                    label={label.tinh}
                    name={isFormList ? [nameField, "TinhID"] : "TinhID"}
                >
                    <Selectv4
                        onChange={(value) => onChangeTinhHuyenXa(0, value)}
                        options={danhSachTinh}
                        placeholder="Chọn tỉnh"
                        allowClear
                    />
                </Form.Item>
            </Col>
            <Col
                className="gutter-row"
                xs={24}
                sm={24}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
            >
                <Form.Item
                    label={label.huyen}
                    name={isFormList ? [nameField, "HuyenID"] : "HuyenID"}
                >
                    <Selectv4
                        onChange={(value) => onChangeTinhHuyenXa(2, value)}
                        options={danhSachHuyen}
                        placeholder="Chọn huyện"
                        allowClear
                    />
                </Form.Item>
            </Col>
            <Col
                className="gutter-row"
                xs={24}
                sm={24}
                md={8}
                lg={8}
                xl={8}
                xxl={8}
            >
                <Form.Item
                    label={label.xa}
                    name={isFormList ? [nameField, "XaID"] : "XaID"}
                >
                    <Selectv4
                        onChange={(value) => onChangeTinhHuyenXa(3, value)}
                        options={danhSachXa}
                        placeholder="Chọn xã"
                        allowClear
                    />
                </Form.Item>
            </Col>
        </Row>
    );
}

export default DiaGioi;

import { Col, Row, message } from "antd";
import PanelBox, { PanelBoxSection } from "./PanelBox";
import Form from "../../../../../components/uielements/form";
import {
    Button,
    Input,
    Selectv4,
    Textarea,
} from "../../../../../components/uielements/exportComponent";
import { REQUIRED } from "../../../../../settings/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actionsHuongGiaiQuyet from "../../../../redux/DanhMuc/DanhMucHuongGiaiQuyet/action";
import TableFile from "./TableFile";
import api from "../config";
import ModalThemFileDinhKem from "./modalThemFileDinhKem";

function HuongXuLy({ form, chiTietDonTrung, isUpdate, ...props }) {
    const [dataSource, setDataSource] = useState([]);
    const [isModalOpenThemFileDinhKem, setIsModalOpenThemFileDinhKem] = useState(false);
    const [isDisableForm, setIsDisableForm] = useState(false);
    const [danhSachHuongXuLy, setDanhSachHuongXuLy] = useState([])
    const [danhSachCanBo, setDanhSachCanBo] = useState([])

    const dispatch = useDispatch()
    const DanhSachHuongGiaiQuyet = useSelector(state => state.DanhMucHGQ.DanhSachHuongGiaiQuyet)

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

    const handleThemTaiLieu = () => {
        openModalThemFileDinhKem();
    };

    const openModalThemFileDinhKem = () => {
        setIsModalOpenThemFileDinhKem(true);
    };

    const closeModalThemFileDinhKem = () => {
        setIsModalOpenThemFileDinhKem(false);
    };

    const sumbitModalThemFileDinhKem = async (values) => {
        try {
            const formData = new FormData();

            let [files, data] = values;

            files.forEach((file) => {
                formData.append("files", file);
            });

            let res = await api.ThemFileHoSo(formData);

            let { Status, Data, Message } = res.data;

            if (Status === 1) {
                let newData = data.map((item, index) => ({
                    ID: dataSource.length + index + 1,
                    ...item,
                    FileUrl: Data[index].FileUrl,
                }));
                
                setDataSource((pre) => {
                    return [...pre, ...newData];
                });
                message.success(Message);
            } else {
                // let newData = data.map((item, index) => ({
                //     ID: dataSource.length + index + 1,
                //     ...item,
                // }));
                // setDataSource((pre) => {
                //     return [...pre, ...newData];
                // });
                message.error(Message);
            }
        } catch (error) {
            message.error(error.message);
        }
        closeModalThemFileDinhKem();
    };

    useEffect(() => {
        form.setFieldValue("themMoiFileHoSo", dataSource)
    }, [dataSource])

    useEffect(() => {
        setIsDisableForm(!isUpdate && !!chiTietDonTrung);

        if (chiTietDonTrung) {
            form.setFieldsValue({
                ...chiTietDonTrung,
            });
        } else {
        }
    }, [chiTietDonTrung]);

    useEffect(() => {
        getListCanBo()
        dispatch(actionsHuongGiaiQuyet.getList({
            PageSize: 1000,
            PageNumber: 1,
        }))
    }, []);

    useEffect(() => {
        let danhSachHuongGiaiQuyet = DanhSachHuongGiaiQuyet.map(item => ({
            label: item.TenHuongGiaiQuyet,
            value: item.HuongGiaiQuyetID
        }))
        setDanhSachHuongXuLy(danhSachHuongGiaiQuyet)
    }, [DanhSachHuongGiaiQuyet])

    return (
        <Form
            form={form}
            name="HuongXuLyForm"
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
                            xxl={6}
                        >
                            <Form.Item
                                label="Hướng xử lý"
                                name="HuongGiaiQuyetID"
                                rules={[REQUIRED]}
                            >
                                <Selectv4 options={danhSachHuongXuLy} />
                            </Form.Item>
                        </Col>
                        <Col
                            className="gutter-row"
                            xs={24}
                            sm={24}
                            md={8}
                            lg={4}
                            xl={8}
                            xxl={6}
                        >
                            <Form.Item
                                label="Lãnh đạo ký"
                                name="CanBoKyID"
                                rules={[REQUIRED]}
                            >
                                <Selectv4 options={danhSachCanBo} />
                            </Form.Item>
                        </Col>
                    </Row>
                </PanelBoxSection>
                <PanelBoxSection>
                    <Row gutter={16}>
                        <Col
                            className="gutter-row"
                            xs={24}
                            sm={24}
                            md={24}
                            lg={24}
                            xl={24}
                            xxl={24}
                        >
                            <Form.Item label="Ý kiến xử lý" name="NoiDungHuongDan">
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
                                label="File đính kèm"
                                name="themMoiFileHoSo"
                            >
                                <Button style={{marginBottom: 20}} type="primary" onClick={handleThemTaiLieu}>Chọn file</Button>
                                <TableFile data={dataSource} />
                            </Form.Item>
                        </Col>
                    </Row>
                </PanelBoxSection>
                <ModalThemFileDinhKem
                    isModalOpen={isModalOpenThemFileDinhKem}
                    onCancel={closeModalThemFileDinhKem}
                    onOk={sumbitModalThemFileDinhKem}
                />
            </PanelBox>
        </Form>
    );
}

export default HuongXuLy;

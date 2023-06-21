import { Col, Popconfirm, Row, Tooltip, message } from "antd";
import PanelBox, { PanelBoxSection } from "./PanelBox";
import Form from "../../../../../components/uielements/form";
import {
    Input,
    Selectv4,
    Textarea,
} from "../../../../../components/uielements/exportComponent";
import { REQUIRED } from "../../../../../settings/constants";
import BoxTable from "../../../../../components/utility/boxTable";
import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import ModalThemFileDinhKem from "./modalThemFileDinhKem";
import { useEffect, useState } from "react";
import api, { apiUrl } from "../config";
import { handleDate } from "../../../../../helpers/utility";
import TableFile from "./TableFile";
// import dayjs from "dayjs";

function HoSoTaiLieuDinhKem({
    form,
    isModalOpen,
    onOk,
    onCancel,
    chiTietDonTrung,
    isUpdate,
    ...props
}) {
    const [dataSource, setDataSource] = useState([]);
    const [isDisableForm, setIsDisableForm] = useState(false);

    useEffect(() => {
        if (chiTietDonTrung) {
            let listFileHoSo = chiTietDonTrung.map((item) => ({
                ...item,
                NgayUp: item.NgayCapNhat
                    ? handleDate(item.NgayCapNhat)?.format("DD/MM/YYYY")
                    : handleDate(item.NgayUps)?.format("DD/MM/YYYY"),
            }));
            setDataSource(listFileHoSo);
        }
        setIsDisableForm(!isUpdate && !!chiTietDonTrung);
    }, [chiTietDonTrung]);

    const handleSubmit = async (values) => {
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
                let newData = data.map((item, index) => ({
                    ID: dataSource.length + index + 1,
                    ...item,
                }));
                setDataSource((pre) => {
                    return [...pre, ...newData];
                });
                message.error(Message);
            }
        } catch (error) {
            message.error(error.message);
        } finally {
            onOk();
        }
    };

    useEffect(() => {
        form.setFieldsValue({ themMoiFileHoSo: dataSource });
    }, [dataSource]);

    const handleResetForm = () => {
        setDataSource([]);
    };

    return (
        <Form
            form={form}
            name="HoSoTaiLieuDinhKemForm"
            layout="vertical"
            // disabled={isDisableForm}
        >
            <PanelBox isShowHeader={false}>
                <PanelBoxSection border={"none"}>
                    <Row gutter={16}>
                        <Col
                            className="gutter-row"
                            xs={{ span: 24, offset: 0 }}
                            sm={{ span: 24, offset: 0 }}
                            md={{ span: 24, offset: 0 }}
                            lg={{ span: 24, offset: 0 }}
                            xl={{ span: 24, offset: 0 }}
                            xxl={{ span: 16, offset: 4 }}
                        >
                            <Form.Item
                                name="themMoiFileHoSo"
                                onReset={handleResetForm}
                            >
                                <TableFile data={dataSource} />
                            </Form.Item>
                        </Col>
                    </Row>
                </PanelBoxSection>
            </PanelBox>
            <ModalThemFileDinhKem
                isModalOpen={isModalOpen}
                onCancel={onCancel}
                onOk={handleSubmit}
            />
        </Form>
    );
}

export default HoSoTaiLieuDinhKem;

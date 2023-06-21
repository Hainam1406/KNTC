import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import BoxTable from "../../../../components/utility/boxTable";
import actions from "../../../redux/NghiepVu/SoTiepNhanGianTiep/action";
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import PageAction from "../../../../components/utility/pageAction";
import Box from "../../../../components/utility/box";
import {
    changeUrlFilter,
    getDefaultPageSize,
    getFilterData,
    getRoleByKey,
} from "../../../../helpers/utility";
import queryString from "query-string";
import ThongTinHoSoTiepDan from "../SoTiepDanTrucTiep/customCollapse";
import FormSearchData from "./formSearchData";
import Wrapper, { ButtonList, BgrColorTabs } from "../SoTiepDanTrucTiep/styled";
import print from "./img/printer.svg";
import { Tabs, Tooltip, Modal, message } from "antd";
import ModalPrintBook from "./modalPrintBook";
import api from "./config";
import moment from "moment";
import {
    DeleteOutlined,
    EditOutlined,
    PrinterOutlined,
} from "@ant-design/icons";
import ModalChiTiet from "../SoTiepDanTrucTiep/modalChiTiet";
// import ModalEditDanKhongDen from "./ModalEditDanKhongDen";
import ModalPrintSlip from "./modalPrintSlip";
import ModalPreviewSlip from "./modalPreviewSlip";
import actionsTiepdanGianTiep from "../../../redux/NghiepVu/TiepDanGianTiep/action";
const PrintIcon = (image) => {
    return (
        <img
            src={image}
            alt=""
            style={{ width: "20px", height: "auto", margin: "0px 5px 3px 0px" }}
        />
    );
};
const QLNamHoc = (props) => {
    document.title = "Sổ Tiếp Dân Gián Tiếp";
    const { SoTiepDanGianTiep, TotalRow, role } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenBook, setIsModalOpenBook] = useState(false);
    const [isModalOpenPrintSlip, setIsModalOpenPrintSlip] = useState(false);
    const [isModalOpenPreviewSlip, setIsModalOpenPreviewSlip] = useState(false);
    const [danhSachKhieuTo, setDanhSachKhieuTo] = useState();
    const [selectedRowsKey, setSelectedRowsKey] = useState([]);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [valueRadio, setValueRadio] = useState();
    const [dataEdit, setDataEdit] = useState([]);
    const [filterData, setFilterData] = useState(
        queryString.parse(props.location.search)
    );
    const dispatch = useDispatch();
    useEffect(() => {
        props.getData(filterData);
    }, [filterData]);

    const onFilter = (value, property) => {
        let oldFilterData = filterData;
        let onFilter = { value, property };
        let newfilterData = getFilterData(oldFilterData, onFilter, null);
        //get filter data
        setFilterData(newfilterData);
        setSelectedRowsKey([]);
    };

    const onSearch = (value, property) => {
        let onFilter = { value, property };
        let newFilterData = getFilterData(filterData, onFilter, null);
        setFilterData(newFilterData);
    };

    const onTableChange = (pagination, filters, sorter) => {
        let oldFilterData = filterData;
        let onOrder = { pagination, filters, sorter };
        let newFilterData = getFilterData(oldFilterData, null, onOrder);

        setFilterData(newFilterData);
        setSelectedRowsKey([]);
    };

    // handle modal
    const handleOk = () => {
        setIsModalOpen(false);
        setIsModalOpenBook(false);
        setIsModalOpenPrintSlip(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setIsModalOpenBook(false);
        setIsModalOpenPrintSlip(false);
    };
    const handOkPreview = () => {
        setIsModalOpenPreviewSlip(false);
    };
    const handleCancelPreview = () => {
        setIsModalOpenPreviewSlip(false);
    };

    // show modal
    const showModalPreview = () => {
        setIsModalOpenPreviewSlip(true);
    };
    const ShowModalPrintSlip = (record) => {
        setIsModalOpenPrintSlip(true);
    };
    const showModalPrintBook = () => {
        setIsModalOpenBook(true);
    };
    const showModalChiTiet = (record) => {
        setIsModalOpen(true);
        setDataEdit(record);
    };
    const XoaDonThu = (record) => {
        Modal.confirm({
            title: "Xóa Dữ Liệu",
            content: "Bạn có muốn xóa đơn thư này không?",
            cancelText: "Không",
            okText: "Có",
            onOk: () => {
                setConfirmLoading(true);
                api.XoaDonThu({
                    XuLyDonID: record.XuLyDonID,
                    DonThuID: record.DonThuID,
                })
                    .then((res) => {
                        if (res.data.Status > 0) {
                            setConfirmLoading(false);
                            props.getData({
                                ...filterData,
                                PageNumber:
                                    Math.ceil(
                                        (TotalRow - 1) / filterData.PageSize
                                    ) < filterData.PageNumber
                                        ? Math.ceil(
                                              (TotalRow - 1) /
                                                  filterData.PageSize
                                          )
                                        : filterData.PageNumber,
                            });
                            message.destroy();
                            message.success(res.data.Message);
                            setFilterData({
                                ...filterData,
                                PageNumber:
                                    Math.ceil(
                                        (TotalRow - 1) / filterData.PageSize
                                    ) < filterData.PageNumber
                                        ? Math.ceil(
                                              (TotalRow - 1) /
                                                  filterData.PageSize
                                          )
                                        : filterData.PageNumber,
                            });
                        } else {
                            message.destroy();
                            message.error(res.data.Message);
                        }
                    })
                    .catch((error) => {
                        message.destroy();
                        message.error(error.toString());
                    });
            },
        });
    };
    const SuaDonThu = (record) => {
        // dispatch(actionsTiepdanGianTiep.setDonThuID(id, false));
        props.history.push(
            `tiep-dan-gian-tiep?DonThuID=${record.DonThuID}&XuLyDonID=${record.XuLyDonID}`
        );
    };

    const renderThaoTacSoTiep = (record) => {
        return (
            <div className={"action-btn"}>
                <Tooltip title={"Xử lý đơn"}>
                    <EditOutlined
                        style={{ color: "black", marginRight: "4px" }}
                        onClick={(e) => {
                            e.stopPropagation();
                            SuaDonThu(record);
                        }}
                    />
                </Tooltip>
                <Tooltip title={"Xóa"}>
                    <DeleteOutlined
                        onClick={(e) => {
                            e.stopPropagation();
                            XoaDonThu(record);
                        }}
                    />
                </Tooltip>
                {/* : ""} */}
            </div>
        );
    };
    const PageNumber = filterData.PageNumber
        ? parseInt(filterData.PageNumber)
        : 1;
    const PageSize = filterData.PageSize
        ? parseInt(filterData.PageSize)
        : getDefaultPageSize();

    const columnSoTiepCongDan = [
        {
            title: "STT",
            width: "5%",
            align: "center",
            render: (text, record, index) => (
                <span>{(PageNumber - 1) * PageSize + (index + 1)}</span>
            ),
        },
        {
            title: "Số đơn",
            dataIndex: "SoDonThu",
            align: "center",
            width: "10%",
        },
        {
            title: "Nguồn đơn đến",
            dataIndex: "NguonDonDen",
            align: "left",
            width: "10%",
        },

        {
            title: "Sổ công văn",
            dataIndex: "SoCongVan",
            align: "left",
            width: "10%",
        },

        {
            title: "Ngày tiếp nhận",
            dataIndex: "NgayNhapDon",
            align: "center",
            width: "10%",
            render: (_, record) => {
                const formattedDate = moment(record.NgayNhapDon).format(
                    "DD-MM-YYYY"
                );
                return <p>{formattedDate}</p>;
            },
        },
        {
            title: "Thông tin chủ đơn",
            width: "20%",
            align: "left",
            render: (_, record) => {
                return (
                    <span>
                        {record.HoTen} {record.DiaChiCT}
                    </span>
                );
            },
        },
        {
            title: "Nội dung công việc",
            dataIndex: "NoiDungDon",
            width: "25%",
            align: "left",
        },

        {
            title: "Loại đơn",
            dataIndex: "TenLoaiKhieuTo",
            width: "10%",
            align: "left",
        },
        {
            title: "Trạng thái",
            dataIndex: "TrangThai",
            width: "10%",
            align: "left",
        },
        {
            title: "Kết quả",
            dataIndex: "KetQua",
            width: "10%",
            align: "left",
        },
        {
            title: "Thao tác",
            width: "10%",
            align: "center",
            render: (text, record) => renderThaoTacSoTiep(record),
        },
    ];

    return (
        <Wrapper>
            <LayoutWrapper>
                <PageHeader>Sổ tiếp dân gián tiếp</PageHeader>
                <PageAction>
                    <ButtonList
                        type="primary"
                        icon={PrintIcon(print)}
                        onClick={showModalPrintBook}
                    >
                        <span>In Sổ</span>
                    </ButtonList>

                    <ButtonList
                        type="primary"
                        onClick={ShowModalPrintSlip}
                        icon={PrintIcon(print)}
                    >
                        In phiếu
                    </ButtonList>
                </PageAction>
                <Box>
                    {/* Content */}
                    <BgrColorTabs className="test">
                        <ThongTinHoSoTiepDan defaultActiveKey={1}>
                            <FormSearchData
                                setFilterData={setFilterData}
                                setDanhSachKhieuTo={setDanhSachKhieuTo}
                                onFilter={onFilter}
                                onSearch={onSearch}
                                filterData={filterData}
                                SoTiepDanGianTiepSearchData={SoTiepDanGianTiep}
                            />
                        </ThongTinHoSoTiepDan>
                        <BoxTable
                            columns={columnSoTiepCongDan}
                            dataSource={SoTiepDanGianTiep}
                            onChange={onTableChange}
                            onRow={(record, rowIndex) => {
                                return {
                                    onClick: () => showModalChiTiet(record),
                                };
                            }}
                            pagination={{
                                showSizeChanger: true,
                                showTotal: (total, range) =>
                                    `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
                                total: TotalRow,
                                current: PageNumber,
                                pageSize: PageSize,
                            }}
                        />
                    </BgrColorTabs>
                </Box>
            </LayoutWrapper>
            <ModalPrintBook
                open={isModalOpenBook}
                onOk={handleOk}
                onCancel={handleCancel}
                setFilterData={setFilterData}
                SoTiepDanGianTiep={SoTiepDanGianTiep}
            />

            <ModalChiTiet
                title="Chi tiết đơn thư"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                dataEdit={dataEdit}
                danhSachKhieuTo={danhSachKhieuTo}
                SuaDonThu={SuaDonThu}
                setIsModalOpenChiTiet={setIsModalOpen}
                XoaDonThu={XoaDonThu}
            />

            <ModalPrintSlip
                open={isModalOpenPrintSlip}
                onOk={handleOk}
                onCancel={handleCancel}
                showModalPreview={showModalPreview}
                dataRadio={setValueRadio}
            />
            <ModalPreviewSlip
                open={isModalOpenPreviewSlip}
                onCancel={handleCancelPreview}
                onOK={handOkPreview}
                data={valueRadio}
            />
        </Wrapper>
    );
};

function mapStateToProps(state) {
    return {
        ...state.SoTiepNhanGianTiep,
        role: getRoleByKey(state.Auth.role, "quan-ly-nam-hoc"),
    };
}

export default connect(mapStateToProps, actions)(QLNamHoc);

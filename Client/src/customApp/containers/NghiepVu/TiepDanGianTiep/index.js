import { Modal, Table, Tooltip, message, Row, Col } from "antd";
import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import PageAction from "../../../../components/utility/pageAction";
import Box from "../../../../components/utility/box";
import BoxFilter from "../../../../components/utility/boxFilter";
import BoxTable from "../../../../components/utility/boxTable";
import Checkbox from "../../../../components/uielements/checkbox";
import Collapse from "../../../../components/uielements/collapse";
import {
    Button,
    DatePicker,
    InputSearch,
    Input,
    Selectv4,
} from "../../../../components/uielements/exportComponent";
import {
    changeUrlFilter,
    getDefaultPageSize,
    getFilterData,
    getRoleByKey,
    handleDate,
} from "../../../../helpers/utility";
import { useKey } from "../../../CustomHook/useKey";
import queryString from "query-string";
import api from "./config";
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    DownOutlined,
} from "@ant-design/icons";
import { CheckboxGroup } from "../../../../components/uielements/checkbox";
import Wrapper, {
    FooterPageAction,
    ButtonSave,
    ButtonCancel,
    ButtonCancelPrimary,
    PanelBoxLabel,
} from "./styled";
import PanelBox, { PanelBoxSection } from "./components/PanelBox";
import Form from "../../../../components/uielements/form";
import { REQUIRED } from "../../../../settings/constants";
import ThongTinTiepNhanDonThu from "./components/thongTinTiepNhanDonThu";
import DoiTuongKhieuNaiToCao from "./components/doiTuongKhieuNaiToCao";
import ThongTinDonThu from "./components/ThongTinDonThu";
import ThongTinDoiTuongKhieuNaiBiToCao from "./components/thongTinDoiTuongBiKhieuNaiToCao";
import CanBoXuLy from "./components/canBoXuLy";
import HoSoTaiLieuDinhKem from "./components/HoSoTaiLieuDinhKem";
import actionsDanToc from "../../../redux/DanhMuc/DanhMucDanToc/action";
import actionsNguonDonDen from "../../../redux/DanhMuc/DanhMucNguonDonDen/actions";
import actionsCoQuanDonVi from "../../../redux/DanhMuc/DMCoQuan/actions";
import actionsDiaGioi from "../../../redux/DanhMuc/DMDiaGioi/actions";
import actionsLoaiKhieuTo from "../../../redux/DanhMuc/DMLoaiKhieuTo/actions";
import actionsChucVu from "../../../redux/DanhMuc/DMChucVu/actions";
import actionsQuocTich from "../../../redux/DanhMuc/DanhMucQuocTich/actions";
import actions from "../../../redux/NghiepVu/TiepDanGianTiep/action";
import ModalConfirm from "./components/modalConfirm";
import dayjs from "dayjs";
import HuongXuLy from "./components/HuongXuLy";

const { Panel } = Collapse;
const QLNamHoc = (props) => {
    document.title = "Tiếp Nhận Đơn Thư";
    const [filterData, setFilterData] = useState(
        queryString.parse(props.location.search)
    );
    const [action, setAction] = useState("");
    const [modalKey, inceaseModalKey] = useKey();
    const [selectedRowsKey, setSelectedRowsKey] = useState([]);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    const [ThongTinTiepNhanDonThuForm] = Form.useForm();
    const [DoiTuongKhieuNaiToCaoForm] = Form.useForm();
    const [ThongTinDonThuForm] = Form.useForm();
    const [ThongTinDoiTuongKhieuNaiBiToCaoForm] = Form.useForm();
    const [HoSoTaiLieuDinhKemForm] = Form.useForm();
    const [CanBoXuLyForm] = Form.useForm();
    const [isModalOpenThemFileDinhKem, setIsModalOpenThemFileDinhKem] =
        useState(false);
    const [isModalOpenConfirm, setIsModalOpenConfirm] = useState(false);
    const [isLoadingModalConfirm, setIsLoadingModalConfirm] = useState(false);
    const [chiTietDonTrung, setChiTietDonTrung] = useState();
    const [ThongTinDTKNBiToCaoChecked, setThongTinDTKNBiToCao] =
        useState(false);

    const dispatch = useDispatch();
    const donThuID = useSelector((state) => state.TiepDanGianTiep.DonThuID);
    const xuLyDonID = useSelector((state) => state.TiepDanGianTiep.XuLyDonID);

    console.log(chiTietDonTrung, "chiTietDonTrung");
    useEffect(() => {
        setChiTietDonTrung(null);
        if (filterData?.DonThuID && filterData?.XuLyDonID) {
            setIsUpdate(true);
            dispatch(
                actions.setDonThuID({
                    DonThuID: filterData?.DonThuID,
                    XuLyDonID: filterData?.XuLyDonID,
                })
            );
        } else {
            dispatch(
                actions.setDonThuID({
                    DonThuID: 0,
                    XuLyDonID: 0,
                })
            );
            setIsUpdate(false);
        }
        // changeUrlFilter(filterData);
        // props.getData(filterData);
    }, [filterData]);

    useEffect(() => {
        setIsUpdate(!!window.location.search);
    }, [window.location.search]);

    useEffect(() => {
        setChiTietDonTrung(null);
        // props.getData(filterData);
        props.getListDanToc({
            PageNumber: 0,
            PageSize: 0,
        });
        props.getListNguonDonDen({
            PageNumber: 0,
            PageSize: 0,
        });
        props.getListCoQuanDonVi();
        props.getListTinh();
        props.getListLoaiKhieuTo();
        props.getListChucVu({
            PageNumber: 0,
            PageSize: 0,
        });

        props.getListQuocTich({
            PageNumber: 0,
            PageSize: 0,
        });

        getSoDonThu();

        if (filterData?.DonThuID && filterData?.XuLyDonID) {
            setIsUpdate(true);
            dispatch(
                actions.setDonThuID({
                    DonThuID: filterData.DonThuID,
                    XuLyDonID: filterData.XuLyDonID,
                })
            );
        } else {
            dispatch(
                actions.setDonThuID({
                    DonThuID: 0,
                    XuLyDonID: 0,
                })
            );
            setIsUpdate(false);
        }

        return () => {
            dispatch(
                actions.setDonThuID({
                    DonThuID: 0,
                    XuLyDonID: 0,
                })
            );
        };
    }, []);

    useEffect(() => {
        function handleSave(e) {
            if (e.ctrlKey && (e.key === "s" || e.key === "S")) {
                // Prevent the Save dialog to open
                e.preventDefault();
                // Place your code here
                console.log("CTRL + S");
                onSubmit();
            } else if (e.ctrlKey && (e.key === "h" || e.key === "H")) {
                // Prevent the Save dialog to open
                e.preventDefault();
                // Place your code here
                console.log("CTRL + H");
                openModalConfirm();
            }
        }

        document.addEventListener("keydown", handleSave);

        return () => {
            document.removeEventListener("keydown", handleSave);
        };
    }, [chiTietDonTrung]);

    async function getSoDonThu() {
        try {
            let res = await api.SoDonThu();

            ThongTinTiepNhanDonThuForm.setFieldValue("SoDonThu", res.data);
        } catch (error) {
            message.error(error.message);
        }
    }

    useEffect(() => {
        console.log(
            {
                donThuID,
                xuLyDonID,
            },
            "get don trung"
        );
        if (donThuID && xuLyDonID) {
            getDetailDonTrung(donThuID, xuLyDonID);
        } else {
            setChiTietDonTrung(null);
        }
    }, [donThuID, xuLyDonID]);

    const getDetailDonTrung = async (DonThuID, XuLyDonID) => {
        try {
            let res = await api.ChiTietDonThu({ DonThuID, XuLyDonID });

            let { Status, Data, Message } = res.data;

            if (Status === 1) {
                setChiTietDonTrung(Data);
            } else {
                message.error(Message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    const onTableChange = (pagination, filters, sorter) => {
        let oldFilterData = filterData;
        let onOrder = { pagination, filters, sorter };
        let newFilterData = getFilterData(oldFilterData, null, onOrder);

        setFilterData(newFilterData);
        setSelectedRowsKey([]);
    };

    const onFilter = (value, property) => {
        let oldFilterData = filterData;
        let onFilter = { value, property };
        let newfilterData = getFilterData(oldFilterData, onFilter, null);
        //get filter data
        setFilterData(newfilterData);
        setSelectedRowsKey([]);
    };

    const handleThemTaiLieu = (e) => {
        e.stopPropagation();
        openModalThemFileDinhKem();
    };

    const openModalThemFileDinhKem = () => {
        setIsModalOpenThemFileDinhKem(true);
    };

    const closeModalThemFileDinhKem = () => {
        setIsModalOpenThemFileDinhKem(false);
    };

    const sumbitModalThemFileDinhKem = () => {
        closeModalThemFileDinhKem();
    };

    const openModalConfirm = () => {
        setIsModalOpenConfirm(true);
    };

    const closeModalConfirm = () => {
        setIsModalOpenConfirm(false);
    };

    const sumbitModalConfirm = (values) => {
        handleResetForm();
        closeModalConfirm();
    };

    const handleResetForm = () => {
        setIsLoadingModalConfirm(true);
        Promise.all([
            ThongTinTiepNhanDonThuForm.resetFields(),
            DoiTuongKhieuNaiToCaoForm.resetFields(),
            ThongTinDonThuForm.resetFields(),
            ThongTinDoiTuongKhieuNaiBiToCaoForm.resetFields(),
            HoSoTaiLieuDinhKemForm.resetFields(),
            CanBoXuLyForm.resetFields(),
        ])
            .then(() => {
                dispatch(actions.setDonThuID({ DonThuID: 0, XuLyDonID: 0 }));
                setChiTietDonTrung();
                setFilterData();
                changeUrlFilter();
                getSoDonThu();
            })
            .then(() => setIsLoadingModalConfirm(false))
            .catch((err) => console.log(err, "error"));
    };

    const genExtra = () => (
        <>
            <Button
                icon={<PlusOutlined />}
                onClick={(e) => handleThemTaiLieu(e)}
                type="primary"
                disabled={!isUpdate && !!chiTietDonTrung}
            >
                Thêm tài liệu
            </Button>
        </>
    );

    const handleShowPanel = (e) => {
        const { checked } = e.target;

        setThongTinDTKNBiToCao(checked);
    };

    const handleThemMoiTiepDan = async (data) => {
        try {
            let res = await api.ThemMoiTiepDan(JSON.stringify(data));

            let { Status, Data, Message } = res.data;

            if (Status === 1) {
                message.success(Message);
                await handleResetForm();
                props.history.push("so-tiep-nhan-gian-tiep");
            } else {
                message.error(Message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    const handleCapNhatTiepDan = async (data) => {
        try {
            let res = await api.CapNhatTiepDan(JSON.stringify(data));

            let { Status, Data, Message } = res.data;

            if (Status === 1) {
                message.success(Message);
                await handleResetForm();
                if (filterData?.HuongXuLy)
                    props.history.push("tiep-nhan-don-thu");
                else props.history.push("so-tiep-nhan-gian-tiep");
            } else {
                message.error(Message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    const onSubmit = async () => {
        Promise.all([
            ThongTinTiepNhanDonThuForm.validateFields(),
            DoiTuongKhieuNaiToCaoForm.validateFields(),
            ThongTinDonThuForm.validateFields(),
            ThongTinDoiTuongKhieuNaiBiToCaoForm.validateFields(),
            HoSoTaiLieuDinhKemForm.validateFields(),
            CanBoXuLyForm.validateFields(),
        ])
            .then((result) => {
                let TiepNhanDT = [
                    {
                        ...result[0],
                        NgayNhapDon: dayjs(result[0].NgayNhapDon).format(
                            "YYYY-MM-DD"
                        ),
                        NgayChuyenDon: dayjs(result[0].NgayChuyenDon).format(
                            "YYYY-MM-DD"
                        ),
                        CanBoXuLyID: result[5].CanBoXuLy,
                        XuLyDonID:
                            (isUpdate && chiTietDonTrung?.DonThu?.XuLyDonID) ||
                            0,
                        DonThuID:
                            (isUpdate && chiTietDonTrung?.DonThu?.DonThuID) ||
                            0,
                        SoLan: 0,
                        CQDaGiaiQuyetID: "",
                    },
                ];

                let DoiTuongKN = [];
                let NhomKN = [];
                let { SoNha, ...donThuData } = result[2];
                let DonThu = [
                    {
                        ...donThuData,
                        DiaChiPhatSinh: result[2].SoNha,
                        DonThuID: chiTietDonTrung?.DonThu?.DonThuID || 0,
                        NhomKNID: chiTietDonTrung?.DonThu?.NhomKNID || 0,
                        DoiTuongBiKNID:
                            chiTietDonTrung?.DonThu?.DoiTuongBiKNID || 0,
                        LoaiKhieuToID:
                            chiTietDonTrung?.DonThu?.LoaiKhieuToID || 0,
                        TrungDon: chiTietDonTrung?.DonThu?.TrungDon || true,
                        LeTanChuyen: true,
                        NgayVietDon: dayjs().format("YYYY-MM-DD"),
                    },
                ];

                let DoiTuongBiKN = [];
                let CaNhanBiKN = [];

                let { themMoiFileHoSo } = result[4];

                if (themMoiFileHoSo.length === 0)
                    themMoiFileHoSo = [{ CheckFile: false }];
                else {
                    themMoiFileHoSo = themMoiFileHoSo.map((item, index) => ({
                        ...item,
                        NgayUp:
                            handleDate(item.NgayUp)?.format("YYYY-MM-DD") || "",
                        NgayUp_str:
                            handleDate(item.NgayUp_str)?.format("YYYY-MM-DD") ||
                            "",
                        NgayUps:
                            handleDate(item.NgayUps)?.format("YYYY-MM-DD") ||
                            "",
                        DonThuID:
                            chiTietDonTrung?.FileHoSo[index]?.DonThuID || 0,
                        XuLyDonID:
                            chiTietDonTrung?.FileHoSo[index]?.XuLyDonID || 0,
                        FileID: chiTietDonTrung?.FileHoSo[index]?.FileID || 0,
                        CheckFile: true,
                    }));
                }

                let { LoaiDoiTuongKNID, ...doiTuongKN } = result[1];

                if (result[1].NguoiDaiDien) {
                    let { NguoiDaiDien, ...rest } = result[1];
                    DoiTuongKN = NguoiDaiDien.map((item) => ({
                        ...item,
                        DoiTuongKNID:
                            chiTietDonTrung?.DonThu?.DoiTuongKNID || 0,
                        NgayCap: dayjs().format("YYYY-MM-DD"),
                        NoiCap: "",
                        SoDienThoai: "",
                        NgheNghiep: "",
                        NhomKNID: chiTietDonTrung?.DonThu?.NhomKNID || 0,
                        TenTinh: "",
                        TenHuyen: "",
                        TenXa: "",
                        TenQuocTich: "",
                        TenDanToc: "",
                    }));

                    NhomKN = [
                        {
                            ...rest,
                            NhomKNID: chiTietDonTrung
                                ? chiTietDonTrung?.DonThu?.NhomKNID
                                : rest.NhomKNID,
                            SoLuong: Number(rest.SoLuong),
                            DaiDienPhapLy: true,
                            DuocUyQuyen: true,
                            DiaChiCQ: "",
                            TenCQ: "",
                        },
                    ];
                } else {
                    if (result[1].TenCQ) {
                        let { TenCQ, DiaChiCQ, ...rest } = doiTuongKN;
                        NhomKN = [
                            {
                                NhomKNID:
                                    chiTietDonTrung?.DonThu?.NhomKNID || 0,
                                SoLuong: 0,
                                LoaiDoiTuongKNID,
                                TenCQ,
                                DiaChiCQ,
                                DaiDienPhapLy: true,
                                DuocUyQuyen: true,
                            },
                        ];
                        DoiTuongKN = [
                            {
                                ...rest,
                                DoiTuongKNID:
                                    chiTietDonTrung?.DonThu?.DoiTuongKNID || 0,
                                NgayCap: dayjs().format("YYYY-MM-DD"),
                                NoiCap: "",
                                SoDienThoai: "",
                                NgheNghiep: "",
                                NhomKNID:
                                    chiTietDonTrung?.DonThu?.NhomKNID || 0,
                                TenTinh: "",
                                TenHuyen: "",
                                TenXa: "",
                                TenQuocTich: "",
                                TenDanToc: "",
                            },
                        ];
                    } else {
                        NhomKN = [
                            {
                                NhomKNID:
                                    chiTietDonTrung?.DonThu?.NhomKNID || 0,
                                SoLuong: 0,
                                TenCQ: "",
                                DiaChiCQ: "",
                                LoaiDoiTuongKNID,
                                DaiDienPhapLy: true,
                                DuocUyQuyen: true,
                            },
                        ];

                        DoiTuongKN = [
                            {
                                ...doiTuongKN,
                                DoiTuongKNID:
                                    chiTietDonTrung?.DonThu?.DoiTuongKNID || 0,
                                NgayCap: dayjs().format("YYYY-MM-DD"),
                                NoiCap: "",
                                SoDienThoai: "",
                                NgheNghiep: "",
                                NhomKNID:
                                    chiTietDonTrung?.DonThu?.NhomKNID || 0,
                                TenTinh: "",
                                TenHuyen: "",
                                TenXa: "",
                                TenQuocTich: "",
                                TenDanToc: "",
                            },
                        ];
                    }
                }

                if (Object.keys(result[3]).length === 0) {
                    DoiTuongBiKN = [{ CheckAdd: false }];
                } else {
                    if (result[3].TenCoQuanToChuc) {
                        DoiTuongBiKN = [
                            {
                                ...result[3],
                                TenDoiTuongBiKN: result[3].TenCoQuanToChuc,
                                DoiTuongBiKNID:
                                    chiTietDonTrung?.DonThu?.DoiTuongBiKNID ||
                                    0,
                                CheckAdd: true,
                            },
                        ];
                        CaNhanBiKN = [
                            {
                                CaNhanBiKNID:
                                    chiTietDonTrung?.DonThu?.CaNhanBiKNID || 0,
                                NgheNghiep: "",
                                NoiCongTac: "",
                                ChucVuID:
                                    chiTietDonTrung?.DonThu?.ChucVuID || 0,
                                QuocTichID:
                                    chiTietDonTrung?.DonThu?.QuocTichID || 0,
                                DanTocID:
                                    chiTietDonTrung?.DonThu?.DanTocID || 0,
                                DoiTuongBiKNID:
                                    chiTietDonTrung?.DonThu?.DoiTuongBiKNID ||
                                    0,
                            },
                        ];
                    } else {
                        let {
                            LoaiDoiTuongBiKNID,
                            TenDoiTuongBiKN,
                            TinhID,
                            HuyenID,
                            XaID,
                            DiaChiCT,
                            ...rest
                        } = result[3];
                        DoiTuongBiKN = [
                            {
                                LoaiDoiTuongBiKNID,
                                TenDoiTuongBiKN,
                                TinhID,
                                HuyenID,
                                XaID,
                                DiaChiCT,
                                DoiTuongBiKNID:
                                    (isUpdate &&
                                        chiTietDonTrung?.DonThu
                                            ?.DoiTuongBiKNID) ||
                                    0,
                                CheckAdd: true,
                            },
                        ];
                        CaNhanBiKN = [
                            {
                                ...rest,
                                CaNhanBiKNID:
                                    (isUpdate &&
                                        chiTietDonTrung?.DonThu
                                            ?.CaNhanBiKNID) ||
                                    0,
                                DoiTuongBiKNID:
                                    (isUpdate &&
                                        chiTietDonTrung?.DonThu
                                            ?.DoiTuongBiKNID) ||
                                    0,
                            },
                        ];
                    }
                }

                let dataTiepDan = {
                    TiepNhanDT,
                    DoiTuongKN,
                    NhomKN,
                    DonThu,
                    DoiTuongBiKN,
                    CaNhanBiKN,
                    themMoiFileHoSo,
                };

                if (filterData?.DonThuID && filterData?.XuLyDonID) {
                    handleCapNhatTiepDan(dataTiepDan);
                } else {
                    handleThemMoiTiepDan(dataTiepDan);
                }
            })
            .catch((err) => {
                console.log(err, "error");
            });
    };

    const panels = [
        <Panel header={"Thông tin tiếp nhận đơn thư"} key={"1"}>
            <ThongTinTiepNhanDonThu
                form={ThongTinTiepNhanDonThuForm}
                chiTietDonTrung={chiTietDonTrung?.DonThu}
                isUpdate={isUpdate}
            />
        </Panel>,

        <Panel
            // className="collapse-item-reverse"
            header={"Đối tượng khiếu nại, tố cáo"}
            key={"2"}
        >
            <DoiTuongKhieuNaiToCao
                form={DoiTuongKhieuNaiToCaoForm}
                chiTietDonTrung={chiTietDonTrung?.DoiTuongKN}
                isUpdate={isUpdate}
            />
        </Panel>,

        <Panel header={"Thông tin đơn thư"} key={"3"}>
            <ThongTinDonThu
                form={ThongTinDonThuForm}
                chiTietDonTrung={chiTietDonTrung?.DonThu}
                isUpdate={isUpdate}
            />
        </Panel>,

        <Panel
            // className="collapse-item-reverse"
            header={
                <div>
                    <Checkbox
                        style={{
                            display: "inline-flex",
                            alignItems: "flex-end",
                            marginRight: "10px",
                        }}
                        onChange={handleShowPanel}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <span>Nhập thông tin đối tượng bị khiếu nại, tố cáo</span>
                </div>
            }
            key={"4"}
        >
            {ThongTinDTKNBiToCaoChecked ? (
                <ThongTinDoiTuongKhieuNaiBiToCao
                    isShowPanel={true}
                    form={ThongTinDoiTuongKhieuNaiBiToCaoForm}
                    chiTietDonTrung={chiTietDonTrung}
                    isUpdate={isUpdate}
                />
            ) : (
                <p style={{ textAlign: "center" }}>Không có thông tin</p>
            )}
        </Panel>,

        <Panel
            header={"Hồ sơ/tài liệu đính kèm"}
            key={"5"}
            extra={genExtra()}
            className="panel--extra"
        >
            <HoSoTaiLieuDinhKem
                form={HoSoTaiLieuDinhKemForm}
                isModalOpen={isModalOpenThemFileDinhKem}
                onOk={sumbitModalThemFileDinhKem}
                onCancel={closeModalThemFileDinhKem}
                chiTietDonTrung={chiTietDonTrung?.FileHoSo}
                isUpdate={isUpdate}
            />
        </Panel>,

        <Panel className="collapse-item" header={"Cán bộ xử lý"} key={"6"}>
            <CanBoXuLy
                form={CanBoXuLyForm}
                chiTietDonTrung={chiTietDonTrung?.DonThu}
                isUpdate={isUpdate}
            />
        </Panel>,
    ];

    const renderPanel = (panels) => {
        return panels.map((item, index) => {
            let newItem = { ...item };
            let className = index % 2 !== 0 ? "collapse-item-reverse" : null;
            newItem.props = {
                ...item.props,
                className: item.props.className
                    ? `${item.props.className} ${className}`
                    : className,
            };
            return <React.Fragment key={index}>{newItem}</React.Fragment>;
        });
    };

    return (
        <Wrapper>
            <LayoutWrapper>
                <PageHeader>Tiếp nhận đơn thư</PageHeader>
                <PageAction>
                    {/* {role ? role.add ?  */}
                    <ButtonSave type="primary" onClick={onSubmit}>
                        Lưu
                    </ButtonSave>
                    {/* //  : '' : ''} */}
                    <ButtonCancelPrimary
                        type="primary"
                        onClick={openModalConfirm}
                    >
                        Hủy, nhập đơn mới
                    </ButtonCancelPrimary>
                </PageAction>
                <Box>
                    <Collapse
                        defaultActiveKey={["1", "2", "3", "4", "5", "6", "7"]}
                        expandIcon={({ isActive }) => (
                            <DownOutlined rotate={isActive ? 90 : 0} />
                        )}
                        expandIconPosition="end"
                    >
                        {renderPanel(panels)}
                    </Collapse>
                </Box>
                <FooterPageAction>
                    {/* {role ? role.add ?  */}
                    <ButtonSave
                        type="primary"
                        bgcolor="#fff"
                        color="#fa8c16"
                        onClick={onSubmit}
                    >
                        Lưu
                    </ButtonSave>
                    {/* //  : '' : ''} */}
                    <ButtonCancel type="primary" onClick={openModalConfirm}>
                        Hủy, nhập đơn mới
                    </ButtonCancel>
                </FooterPageAction>
            </LayoutWrapper>
            <ModalConfirm
                title={"Xác nhận"}
                content={
                    <>
                        <p>Dữ liệu đang nhập sẽ không được lưu lại.</p>
                        <p>Bạn có muốn thực hiện thao tác?</p>
                    </>
                }
                open={isModalOpenConfirm}
                onOk={sumbitModalConfirm}
                onCancel={closeModalConfirm}
                isLoading={isLoadingModalConfirm}
                width={350}
            />
        </Wrapper>
    );
};

function mapStateToProps(state) {
    return {
        ...state.ReducerDanToc,
        role: getRoleByKey(state.Auth.role, "quan-ly-nam-hoc"),
    };
}

export default connect(mapStateToProps, {
    ...actions,
    getListDanToc: actionsDanToc.getData,
    getListNguonDonDen: actionsNguonDonDen.getList,
    getListCoQuanDonVi: actionsCoQuanDonVi.getList,
    getListTinh: actionsDiaGioi.getListTinh,
    getListLoaiKhieuTo: actionsLoaiKhieuTo.getList,
    getListChucVu: actionsChucVu.getList,
    getListQuocTich: actionsQuocTich.getList,
})(QLNamHoc);

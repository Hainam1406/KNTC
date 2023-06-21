import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import BoxTable from "../../../../components/utility/boxTable";
import actions from "../../../redux/PhanGiaiQuyet/PheDuyetKetQua/action";
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import PageAction from "../../../../components/utility/pageAction";
import Box from "../../../../components/utility/box";
import {
    changeUrlFilter,
    getFilterData,
    getRoleByKey,
    getDefaultPageSize,
} from "../../../../helpers/utility";
import { useKey } from "../../../CustomHook/useKey";
import queryString from "query-string";
import FormSearchData from "../../NghiepVu/components/FormSearch.js/FormSearch";

import Wrapper, {
    FooterPageAction,
    ButtonList,
    ButtonCancel,
    ButtonCancelPrimary,
    ButtonPrint,
    ButtonCancelForm,
} from "../../NghiepVu/SoTiepDanTrucTiep/styled";
import api from "./config";
import list from "../../NghiepVu/SoTiepDanTrucTiep/img/list.svg";
import print from "../../NghiepVu/SoTiepDanTrucTiep/img/printer.svg";
import work from "../../NghiepVu/SoTiepDanTrucTiep/img/working-with-laptop.svg";
import { Tabs, Tooltip, Modal, message } from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    PrinterOutlined,
} from "@ant-design/icons";

import { BgrColorTabs } from "../../NghiepVu/SoTiepDanTrucTiep/styled";
// import ModalList from "./modalAddEdit";
import { Link } from "react-router-dom";
// import { Modal, ModalCustom } from "../../../../components/uielements/exportComponent";
import ModalChiTiet from "../../NghiepVu/SoTiepDanTrucTiep/modalChiTiet";
import Collapse from "../../../../components/uielements/collapse";
import {
    Button,
    DatePicker,
    Input,
    Select,
} from "../../../../components/uielements/exportComponent";
import dayjs from "dayjs";
import BoxFilter from "../../../../components/utility/boxFilter";
import Checkbox from "../../../../components/uielements/checkbox";

const ListIcon = (image) => {
    return (
        <img
            src={image}
            alt=""
            style={{ width: "20px", height: "auto", margin: "0px 5px 3px 0px" }}
        />
    );
};
const PrintIcon = (image) => {
    return (
        <img
            src={image}
            alt=""
            style={{ width: "20px", height: "auto", margin: "0px 5px 3px 0px" }}
        />
    );
};

const WorkIcon = (image) => {
    return (
        <img
            src={image}
            alt=""
            style={{ width: "20px", height: "auto", margin: "0px 5px 3px 0px" }}
        />
    );
};
const { Panel } = Collapse;

const QLNamHoc = (props) => {
    const { DanhSachCanPheDuyet, TotalRow, role } = props;

    document.title = "Phê duyệt kết quả";
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenLanhDao, setIsModalOpenLanhDao] = useState(false);
    const dispatch = useDispatch();
    const [filterData, setFilterData] = useState(
        queryString.parse(props.location.search)
    );
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [dataEdit, setDataEdit] = useState([]);
    const [checkButtonEdit, setCheckButtonEdit] = useState(false);
    const [checkDisable, setCheckDisable] = useState(false);
    const data = useSelector(
        (state) => state.KetQuaCanPheDuyet.DanhSachCanPheDuyet
    );
    useEffect(() => {
        props.getData(filterData);
    }, [filterData]);

    const PageNumber = filterData.PageNumber
        ? parseInt(filterData.PageNumber)
        : 1;
    const PageSize = filterData.PageSize
        ? parseInt(filterData.PageSize)
        : getDefaultPageSize();

    const columns = [
        {
            title: "",
            align: "center",
            render: (_, record) => <Checkbox />,
            width: "5%",
        },
        {
            title: "Số đơn",
            dataIndex: "SoDon",
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
            title: "Tên chủ đơn",
            dataIndex: "TenChuDon",
            align: "left",
            width: "15%",
        },
        {
            title: "Nội dung đơn",
            dataIndex: "NoiDungDon",
            align: "left",
            width: "30%",
        },
        {
            title: "Loại đơn",
            dataIndex: "LoaiDon",
            align: "left",
            width: "10%",
        },
        {
            title: "Hạn giải quyết",
            dataIndex: "HanGiaiQuyet",
            align: "center",
            width: "10%",
        },
        {
            title: "Cơ quan giải quyết",
            dataIndex: "CoQuanGiaiQuyet",
            align: "left",
            width: "10%",
        },
        {
            title: "Cán bộ giải quyết",
            dataIndex: "CanBoGiaiQuyet",
            align: "left",
            width: "10%",
        },
        {
            title: "Trạng thái",
            dataIndex: "TrangThai",
            align: "center",
            width: "10%",
        },
    ];

    const dataSource = [
        {
            SoDon: "TTT806",
            NguonDonDen: "Bưu chính",
            TenChuDon: "File Tên 009 (Bà Rịa - Vũng Tàu)",
            NoiDungDon: "",
            LoaiDon: "Khiếu nại",
            HanGiaiQuyet: "03/09/2020",
            CoQuanGiaiQuyet: "Thanh tra tỉnh",
            CanBoGiaiQuyet: "Vũ Thị Chi",
            TrangThai: "Chưa ban hành",
        },
        {
            SoDon: "TTT793",
            NguonDonDen: "Trực tiếp",
            TenChuDon: "Nguyễn Lan Hương (Bà Rịa - Vũng Tàu)",
            NoiDungDon:
                "Khiếu nại về việc bồi thường đất không đúng theo quy định",
            LoaiDon: "Khiếu nại",
            HanGiaiQuyet: "27/07/2020",
            CoQuanGiaiQuyet: "Thanh tra tỉnh",
            CanBoGiaiQuyet: "Vũ Thị Chi",
            TrangThai: "Đang thi hành",
        },
        {
            SoDon: "TTT821",
            NguonDonDen: "Trực tiếp",
            TenChuDon: "Hoàng Sơn (Bà Rịa - Vũng Tàu)",
            NoiDungDon: "",
            LoaiDon: "Khiếu nại",
            HanGiaiQuyet: "29/10/2022",
            CoQuanGiaiQuyet: "Thanh tra tỉnh",
            CanBoGiaiQuyet: "Dương Thị Thùy Trang",
            TrangThai: "Đã thi hành",
        },
    ];
    return (
        <Wrapper>
            <LayoutWrapper>
                <PageHeader>
                    Danh sách các đơn thư đã duyệt kết quả giải quyết
                </PageHeader>
                <PageAction></PageAction>
                <Box>
                    <BoxFilter>
                        <Select
                            style={{ minWidth: "200px" }}
                            placeholder="Chọn loại đơn"
                            allowClear
                        />
                        <Select
                            style={{ minWidth: "200px" }}
                            placeholder="Chọn trạng thái"
                            allowClear
                        />
                        <DatePicker
                            allowClear
                            placeholder={"Từ ngày"}
                            style={{ width: 200 }}
                        />

                        <DatePicker
                            allowClear
                            placeholder={"Đến ngày"}
                            style={{ width: 200 }}
                        />
                        <Input
                            allowClear
                            placeholder={"Nhập tên chủ đơn hoặc nội dung đơn"}
                            style={{ width: 300 }}
                        />
                        <Button type="primary" style={{ marginLeft: 10 }}>
                            Tìm kiếm
                        </Button>
                    </BoxFilter>
                    <BoxTable columns={columns} dataSource={dataSource} />
                </Box>
            </LayoutWrapper>
        </Wrapper>
    );
};

function mapStateToProps(state) {
    return {
        ...state.KetQuaCanPheDuyet,
        role: getRoleByKey(state.Auth.role, "quan-ly-nam-hoc"),
    };
}

export default connect(mapStateToProps, actions)(QLNamHoc);

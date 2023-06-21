import {Modal, Tooltip , message, DatePicker} from 'antd'
import actions from '../../../redux/HeThong/XoaDonThuLoi/actions';
import React,{useState,useEffect, useLayoutEffect} from 'react';
import {connect} from "react-redux";
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import Box from "../../../../components/utility/box";
import BoxFilter from "../../../../components/utility/boxFilter";
import BoxTable from "../../../../components/utility/boxTable";
import Select, {Option} from "../../../../components/uielements/select";
import TreeSelect from "../../../../components/uielements/treeSelect";
import {Button, InputSearch} from "../../../../components/uielements/exportComponent";
import {changeUrlFilter, getDefaultPageSize, getFilterData, getRoleByKey} from "../../../../helpers/utility";
import {useKey} from '../../../CustomHook/useKey';
import queryString from "query-string";
import api from './config'
import apiCoQuan from '../../DanhMuc/DMCoQuan/config'
import {DeleteOutlined, QuestionCircleOutlined} from '@ant-design/icons'
import { DateRangepicker } from '../../../../components/uielements/datePicker'
import moment from "moment"
import locale from 'antd/es/date-picker/locale/vi_VN';
import Constants from '../../../../settings/constants'

moment.locale("vi")

const index = ({
    TotalRow,
    location
}) => {
    const [filterData,setFilterData] = useState(queryString.parse(location.search))
    const [selectedRowsKey,setSelectedRowsKey] = useState([])
    const [danhSachLoaiDon, setDanhSachLoaiDon] = useState([])
    const [coQuanID, setCoQuanID] = useState(null)
    const [tenCoQuan, setTenCoQuan] = useState(null)
    const [danhSachCoQuan, setDanhSachCoQuan] = useState([])
    const dateFormats = [
        "DD/MM/YYYY",
        "YYYY-MM-DD"
    ]

    const PageNumber = filterData.PageNumber ? parseInt(filterData.PageNumber) : 1;
    const PageSize = filterData.PageSize ? parseInt(filterData.PageSize) : getDefaultPageSize()

    useEffect(() => {
        changeUrlFilter(filterData)
        apiCoQuan.danhSachCoQuan(filterData)
            .then(res => {
                const {Status, Data, Message} = res.data
                
                if(Status === 1) {
                    setDanhSachCoQuan(handleConvertDanhSachCoQuanToSelectTree(Data))
                    filterData.CoQuanID && apiCoQuan.chiTietCoQuan({ID: filterData.CoQuanID})
                        .then(res => {
                            setTenCoQuan(res.data.Data.TenCoQuan)
                        })
                }else {
                    message.destroy()
                    message.error(Message)
                }
            })
            .catch(err => {
                message.destroy()
                message.error(Constants.API_ERROR)
            })
    },[filterData])

    useLayoutEffect(() => {
        document.title = "Xóa Đơn Thư Lỗi";

        apiCoQuan.danhSachCoQuan(filterData)
            .then(res => {
                const {Status, Data, Message} = res.data
                
                if(Status === 1) {
                    setDanhSachCoQuan(handleConvertDanhSachCoQuanToSelectTree(Data))
                    filterData.CoQuanID && apiCoQuan.chiTietCoQuan({ID: filterData.CoQuanID})
                        .then(res => {
                            setTenCoQuan(res.data.Data.TenCoQuan)
                        })
                    
                }else {
                    message.destroy()
                    message.error(Message)
                }
            })
            .catch(err => {
                message.destroy()
                message.error(Constants.API_ERROR)
            })

        api.DanhSachLoaiKhieuToCha(filterData)
            .then(res => {
                const {Data, Status, Message} = res.data
                if(Status === 1) {
                    setDanhSachLoaiDon(Data)
                }else {
                    message.destroy()
                    message.error(Message)
                }
            })
            .catch(err => {
                message.destroy()
                message.error(Constants.API_ERROR)
            })

    }, [])

    const handleConvertDanhSachCoQuanToSelectTree = data => {
        let treeData = []

        data?.forEach(item => {
            if(item.Children.length > 0) {
                treeData.push({
                    id: item.ID,
                    pId: item.ParentID,
                    title: item.Ten,
                    value: item.Ten,
                    children: handleConvertDanhSachCoQuanToSelectTree(item.Children),
                    isLeaf: false
                })
            } else {
                treeData.push({
                    id: item.ID,
                    pId: item.ParentID,
                    title: item.Ten,
                    value: item.Ten,
                    isLeaf: true
                })
            }
        });

        return treeData
    }

    const onFilter = (value,property) => {
        let oldFilterData = filterData;
        let onFilter = {value, property};
        let newfilterData = getFilterData(oldFilterData, onFilter, null);
        //get filter data
        setFilterData(newfilterData);
        setSelectedRowsKey([]);
    }

    const onTableChange = (pagination,filters,sorter) => {
        let oldFilterData = filterData;
        let onOrder = {pagination, filters, sorter};
        let newFilterData = getFilterData(oldFilterData, null, onOrder);
    
        setFilterData(newFilterData);
        setSelectedRowsKey([])
    }

    const deleteModalAddEdit = (DonThuID) => {
        Modal.confirm({
            icon: <QuestionCircleOutlined />,
            title: 'Xóa Dữ Liệu',
            content : 'Bạn có muốn xóa đơn thư này không?',
            cancelText: 'Không',
            okText:'Có',
            onOk: () => {
                setConfirmLoading(true)
                api.XoaDonThuLoi({DonThuID}).then(res => {
                    if(res.data.Status > 0){
                        setConfirmLoading(false)
                        props.getList({
                            ...filterData,
                            PageNumber: Math.ceil((TotalRow ? TotalRow-1 : TotalRow) / filterData.PageSize) < filterData.PageNumber ? Math.ceil((TotalRow ? TotalRow-1 : TotalRow) / filterData.PageSize) : filterData.PageNumber
                        })
                        message.destroy()
                        message.success(res.data.Message)
                        setFilterData({
                            ...filterData,
                            PageNumber: Math.ceil((TotalRow ? TotalRow-1 : TotalRow) / filterData.PageSize) < filterData.PageNumber ? Math.ceil((TotalRow ? TotalRow-1 : TotalRow) / filterData.PageSize) : filterData.PageNumber
                        })
                    }else {
                        message.destroy()
                        message.error(res.data.Message)
                    }
                }).catch(error => {
                    message.destroy()
                    message.error(error.toString())
                })
            }
        })
    }

    const renderThaoTac = (record) => {
        return <div className={'action-btn'}>
            {/* {role.delete ? */}
                <Tooltip title={'Xóa'}><DeleteOutlined   onClick={() => deleteModalAddEdit(record.DonThuID)}/></Tooltip>
            {/* : ""} */}
        </div>
    };

    const columns = [
        {
            title: "STT",
            width: "5%",
            align: "center",
            key: "stt",
            render: (text, record, index) => (
                <span>{(PageNumber - 1) * PageSize + (index + 1)}</span>
            )
        },
        {
            title: "Số đơn thư",
            dataIndex: "SoDonThu",
            width: "15%",
            align: "left",
        },
        {
            title: "Tên chủ đơn",
            dataIndex: "TenChuDon",
            width: "25%",
            align: "left",
        },
        {
            title: "Nội dung vụ việc",
            dataIndex: "NoiDungVuViec",
            width: "45%",
            align: "left",
        },
        {
            title: "Loại đơn",
            dataIndex: "LoaiDon",
            width: "15%",
            align: "left",
        },
        {
            title: "Thao tác",
            width: "10%",
            align: "center",
            render: (text, record) => renderThaoTac(record)
        }
    ]

    const onChangeTuNgay = (date, dateString) => {
        date ?
            onFilter(dateString, 'TuNgay')
        :
            onFilter(null, 'TuNgay')
        
        filterData.DenNgay && moment(filterData.DenNgay, dateFormats[0]) < moment(dateString, dateFormats[0]) && onFilter(null, 'DenNgay')
    };

    const onChangeDenNgay = (date, dateString) => {
        date ?
            onFilter(dateString, 'DenNgay')
        :
            onFilter(null, 'DenNgay')
    };

    const onTreeSelectChange = (tenCoQuan) => {
        console.log(tenCoQuan)
        !tenCoQuan && onFilter(null, "CoQuanID")
        setTenCoQuan(tenCoQuan);
    };

    const onTreeSelect = (value, node, extra) => {
        onFilter(node.id, "CoQuanID")
    }

    const onTreeSelectSearch = (value) => {
        setDanhSachCoQuan(handleFilterOnSearch(value))
    }

    const fakeData = (length) => {
        let data = []
        for(let i = 0; i <= length; i++) {
            data.push({
                SoDonThu: `chuc-vu-${i}`,
                TenChuDon: `Nguyen Van A ${i}`,
                NoiDungVuViec: `Kiếu nại về việc thả chó gây mất vệ sinh của hộ ông Bẩn`,
                LoaiDon: 'Kiếu nại'
            })
        }
        return data
    }

    const disabledDate = (current) => {
        // Can not select days before today and today
        if(filterData.TuNgay)
            return current && current < moment(filterData.TuNgay, dateFormats[0]);
        else
            return false;
    };

    return (
        <LayoutWrapper>
            <PageHeader>Xóa Đơn Thư Lỗi</PageHeader>
            <Box>
                <BoxFilter>
                    <Select
                        value={danhSachLoaiDon?.find(item => item.LoaiKhieuToID.toString() == filterData.LoaiKhieuToID)?.LoaiKhieuToID}
                        style = {{width : 200}}
                        placeholder="Chọn loại đơn thư"
                        allowClear
                        onChange = {value => onFilter(value,'LoaiKhieuToID') }
                    >
                        {
                            danhSachLoaiDon?.map(item => (
                                <Option value={item.LoaiKhieuToID}>{item.TenLoaiKhieuTo}</Option>
                            ))
                        }
                    </Select>

                    <TreeSelect
                        showSearch
                        style={{
                            width: 300,
                        }}
                        value={tenCoQuan}
                        dropdownStyle={{
                            maxHeight: 400,
                            overflow: 'auto',
                        }}
                        placeholder="Chọn cơ quan"
                        allowClear
                        // treeDefaultExpandAll
                        onSearch={onTreeSelectSearch}
                        onChange={onTreeSelectChange}
                        onSelect={onTreeSelect}
                        treeData={danhSachCoQuan}
                    />

                    <DatePicker
                        style = {{width : 200}}
                        defaultValue={filterData.TuNgay && moment(filterData.TuNgay, dateFormats[0])}
                        onChange={onChangeTuNgay}
                        format={dateFormats[0]}
                        locale={locale}
                        placeholder={"Từ ngày"}
                    />

                    <DatePicker
                        style = {{width : 200}}
                        defaultValue={filterData.DenNgay && moment(filterData.DenNgay, dateFormats[0])}
                        value={filterData.DenNgay && moment(filterData.DenNgay, dateFormats[0])}
                        disabledDate={disabledDate}
                        onChange={onChangeDenNgay}
                        format={dateFormats[0]}
                        locale={locale}
                        placeholder={"Đến ngày"}
                    />

                    <InputSearch
                        allowClear
                        defaultValue = {filterData.keyword}
                        placeholder = {'Tìm kiếm theo tên chủ đơn hoặc nội dung đơn'}
                        style = {{width : 400}}
                        onSearch = {value => onFilter(value,'keyword') }
                    />
                </BoxFilter>
                <BoxTable
                    rowKey = "index"
                    columns = {columns}
                    dataSource = {fakeData(100)}
                    onChange = {onTableChange}
                    pagination = {{
                    showSizeChanger : true,
                    showTotal : (total,range) =>
                    `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
                    total : TotalRow,
                    current : PageNumber,
                    pageSize : PageSize
                    }}
                />
            </Box>
        </LayoutWrapper>
    )
}

const mapStateToProps = state => {
    return {
        ...state.XoaDonThuLoi,
        role: getRoleByKey(state.Auth.role, 'xoa-don-thu-loi')
    }
}

export default connect(
    mapStateToProps,
    actions
)(index);
import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import {Modal, Tooltip , message, Table} from 'antd';
import {PageWrapper, PageTitle} from "./layout";
import Box from "../../../../components/utility/box";
import BoxTable from "../../../../components/utility/boxTable";
import PageAction from "../../../../components/utility/pageAction";
import {Button} from "../../../../components/uielements/exportComponent";
import {DeleteOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined} from '@ant-design/icons';
import api from './fileConfig'
import Checkbox from "../../../../components/uielements/checkbox";
import {changeUrlFilter, getDefaultPageSize, getFilterData, getRoleByKey} from "../../../../helpers/utility";
import ModalFile from './modalFile';
import {useKey} from '../../../CustomHook/useKey';

function FileComponent({
    filterData,
    setFilterData,
    DanhMucNhomFile,
    danhSachChucNang,
    setSelectedRowsKey,
    tableHeight
}) {
    const PageNumber = filterData.PageNumber ? parseInt(filterData.PageNumber) : 1;
    const PageSize = filterData.PageSize ? parseInt(filterData.PageSize) : getDefaultPageSize()
    const [confirmLoading,setConfirmLoading] = useState(false)
    const [visibleModalAddEdit,setVisibleModalAddEdit] = useState(false)
    const [modalKey,inceaseModalKey] = useKey()
    const [dataModalAddEdit,setDataModalAddEdit] = useState({})
    const [action,setAction] = useState('')
    const [danhSachFile, setDanhSachFile] = useState([])
    const [totalRow, setTotalRow] = useState(0)

    const getList = (filterData) => {
        api.DanhSachFile(filterData).then(res => {
            if(res.data.Status === 1){
                setDanhSachFile(res.data.Data)
                setTotalRow(res.data.TotalRow)
            }else {
                message.destroy()
                message.success(res.data.Message)
            }
        }).catch(error => {
            message.destroy()
            message.error(error.toString())
        })
    }

    useEffect(() => {
        getList({
            ...filterData,
            NhomFileID: filterData.NhomFileID || -1
        })
    }, [filterData])

    const showModalAdd = () => {
        setAction('add')
        setDataModalAddEdit({})
        inceaseModalKey()
        setVisibleModalAddEdit(true)
    }
    
    const deleteModalAddEdit = (fileID) => {
        Modal.confirm({
        icon: <QuestionCircleOutlined />,
        title: 'Xóa Dữ Liệu',
        content : 'Bạn có muốn xóa file này không?',
        cancelText: 'Không',
        okText:'Có',
        onOk: () => {
            setConfirmLoading(true)
            api.XoaFile({fileID}).then(res => {
            if(res.data.Status > 0){
                setConfirmLoading(false)
                getList({
                    ...filterData,
                    PageNumber: Math.ceil((totalRow ? totalRow-1 : totalRow) / filterData.PageSize) < filterData.PageNumber ? Math.ceil((totalRow ? totalRow-1 : totalRow) / filterData.PageSize) : filterData.PageNumber,
                })
                setFilterData({
                    ...filterData,
                    PageNumber: Math.ceil((totalRow ? totalRow-1 : totalRow) / filterData.PageSize) < filterData.PageNumber ? Math.ceil((totalRow ? totalRow-1 : totalRow) / filterData.PageSize) : filterData.PageNumber,
                })
                message.destroy()
                message.success(res.data.Message)
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
    
    const showModalEdit = (id) => {
        const fileID = id
        setAction('edit')
        api.ChiTietFile({fileID}).then(res => {
        if(res.data.Status > 0){
            setDataModalAddEdit(res.data.Data)
            inceaseModalKey()
            setVisibleModalAddEdit(true)
        }
        else {
            message.destroy()
            message.error(res.data.Message)
        }
        }).catch(error => {
        message.destroy()
        message.error(error.toString())
        })
    }
      
    const hideModalAddEdit = () => {
        setAction('')
        setSelectedRowsKey([])
        setDataModalAddEdit({})
        setVisibleModalAddEdit(false)
    }
      
    const submitModalAddEdit = data => {
        setConfirmLoading(true)
        if(action === 'add'){
        api.ThemFile(data)
            .then(res => {
            setConfirmLoading(false)
            if(res.data.Status > 0) {
                message.destroy()
                message.success(res.data.Message)
                hideModalAddEdit()
                filterData.NhomFileID &&
                getList({
                    ...filterData,
                    PageNumber: Math.ceil((totalRow ? totalRow-1 : totalRow) / filterData.PageSize) < filterData.PageNumber ? Math.ceil((totalRow ? totalRow-1 : totalRow) / filterData.PageSize) : filterData.PageNumber,
                })
                setFilterData({
                    ...filterData,
                    PageNumber: Math.ceil((totalRow ? totalRow-1 : totalRow) / filterData.PageSize) < filterData.PageNumber ? Math.ceil((totalRow ? totalRow-1 : totalRow) / filterData.PageSize) : filterData.PageNumber,
                })
            }
            else {
                setConfirmLoading(false)
                message.destroy()
                message.error(res.data.Message)
            }
            }).catch(error => {
            setConfirmLoading(false)
            message.destroy()
            message.error(error.toString())
        })
        }
        if(action === 'edit'){
        api.CapNhatFile(data)
            .then(res => {
            if(res.data.Status > 0){
                setConfirmLoading(false)
                message.destroy()
                message.success(res.data.Message)
                hideModalAddEdit()
                getList(filterData)
            }
            else {
                setConfirmLoading(false)
                message.destroy()
                message.error(res.data.Message)
            }
            }).catch(error => {
            setConfirmLoading(false)
            message.destroy()
            message.error(error.toString())
        })
        }
    }
  
    const onTableChange = (pagination,filters,sorter) => {
        let oldFilterData = filterData;
        let onOrder = {pagination, filters, sorter};
        let newFilterData = getFilterData(oldFilterData, null, onOrder);
    
        setFilterData(newFilterData);
        setSelectedRowsKey([])
    }
  
    const renderThaoTac = (record) => {
        return <div className={'action-btn'}>
            {/* {role.edit ? */}
                <Tooltip title={'Sửa'}><EditOutlined  onClick={() => showModalEdit(record.FileID)}/></Tooltip> 
                {/* : ""} */}
            {/* {role.delete ? */}
                <Tooltip title={'Xóa'}><DeleteOutlined   onClick={() => deleteModalAddEdit(record.FileID)}/></Tooltip>
                {/* : ""} */}
            </div>
    };
      
    const renderTrangThai = record => {
        return <Checkbox checked={record.TrangThaiSuDung}/>
    }

    const renderChucNang = record => {
        let ListChucNang = record.TenChucNang.split(",")

        return (
            <ul>
                {
                    ListChucNang.map((item, index) => (
                        <li key={index}>- {item.trim()}</li>
                    ))
                }
            </ul>
        )
    }
  
    const columns = [
        {
            title: "STT",
            width: "10%",
            align: "center",
            key: "stt",
            render: (text, record, index) => (
                <span>{(PageNumber - 1) * PageSize + (index + 1)}</span>
            )
        },
        {
            title: "Tên file đính kèm",
            dataIndex: "TenFile",
            align: "left",
            width: "20%",
        },
        {
            title: "Chức năng áp dụng",
            dataIndex: "TenChucNang",
            align: "left",
            width: "40%",
            render: (_, record) => renderChucNang(record)
        },
        {
            title: "Đang sử dụng",
            dataIndex: "TrangThaiSuDung",
            align: "center",
            width: "15%",
            render: (_, record) => renderTrangThai(record)
        },
        {
            title: "Thao tác",
            width: "15%",
            align: "center",
            render: (text, record) => renderThaoTac(record)
        }
    ];

    return (
        <PageWrapper>  
            <PageTitle>Danh sách file đính kèm</PageTitle>
            <PageAction>
                <Button type="primary" onClick = {showModalAdd} disabled={filterData.NhomFileID ? false : true}><PlusOutlined/>Thêm mới</Button>
            </PageAction>
            <Box style={{marginTop: "20px"}}>
                <BoxTable
                    className="tableCustomHeight"
                    rowKey = "FileID"
                    columns = {columns}
                    dataSource = {danhSachFile}
                    onChange = {onTableChange}
                    pagination = {{
                        showSizeChanger : true,
                        showTotal : (total,range) =>
                        `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
                        total : totalRow,
                        current : PageNumber,
                        pageSize : PageSize
                    }}
                    scroll={{
                        y: tableHeight,
                        x: 720
                    }}
                    />
            </Box>
            <ModalFile
                visible={visibleModalAddEdit}
                dataEdit = {dataModalAddEdit}
                action = {action}
                loading = {confirmLoading}
                key={modalKey}
                onCreate = {submitModalAddEdit}
                onCancel = {hideModalAddEdit}
                DanhSachNhomFile = {DanhMucNhomFile.DanhSachNhomFile}
                DanhSachFile = {danhSachFile}
                DanhSachChucNangFile = {danhSachChucNang}
                NhomFileID = {filterData.NhomFileID}
            />
        </PageWrapper>
    );
}
function mapStateToProps(state) {
    return {
        DanhMucNhomFile: {...state.DanhMucNhomFile},
        role: getRoleByKey(state.Auth.role, 'quan-ly-danh-muc-nhom-file')
    }
}

export default connect(
    mapStateToProps
)(FileComponent);
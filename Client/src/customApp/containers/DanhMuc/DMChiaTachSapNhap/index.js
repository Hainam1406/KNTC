import { Modal, Table, Tooltip, message, Checkbox } from 'antd';
import actions from '../../../redux/DanhMuc/DMChiaTachSapNhap/actions';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import { Button, InputSearch } from '../../../../components/uielements/exportComponent';
import { changeUrlFilter, exportExcel, getDefaultPageSize, getFilterData, getRoleByKey } from '../../../../helpers/utility';
import { useKey } from '../../../CustomHook/useKey';
import queryString from 'query-string';
import api from './config';
import moment from 'moment';
import ModalAddEdit from './modalAddEdit';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
const DMChiaTachSapNhap = (props) => {
    const [filterData, setFilterData] = useState(queryString.parse(props.location.search));
    const [dataModalAddEdit, setDataModalAddEdit] = useState({});
    const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
    const [action, setAction] = useState('');
    const [modalKey, inceaseModalKey] = useKey();
    const [selectedRowsKey, setSelectedRowsKey] = useState([]);
    const [confirmLoading, setConfirmLoading] = useState(false);

    useEffect(() => {
        changeUrlFilter(filterData);
        props.getList(filterData);
    }, [filterData]);

    useEffect(() => {
        props.getList(filterData);
    }, []);

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

    const showModalAdd = () => {
        setAction('add');
        setDataModalAddEdit({});
        inceaseModalKey();
        setVisibleModalAddEdit(true);
    };

    const deleteModalAddEdit = (ChiaTachSapNhapID) => {
        Modal.confirm({
            title: 'Xóa Dữ Liệu',
            content: 'Bạn có muốn xóa chức vụ này không?',
            cancelText: 'Không',
            okText: 'Có',
            onOk: () => {
                setConfirmLoading(true);
                api.XoaChiaTachSapNhap(ChiaTachSapNhapID)
                    .then((res) => {
                        if (res.data.Status > 0) {
                            setConfirmLoading(false);
                            props.getList(filterData);
                            message.destroy();
                            message.success(res.data.Message);
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

    const showModalEdit = (id) => {
        const ChiaTachSapNhapID = id;
        setAction('edit');
        api.ChiTietChiaTachSapNhap({ ChiaTachSapNhapID })
            .then((res) => {
                if (res.data.Status > 0) {
                    setDataModalAddEdit(res.data.Data);
                    inceaseModalKey();
                    setVisibleModalAddEdit(true);
                } else {
                    message.destroy();
                    message.error(res.data.Message);
                }
            })
            .catch((error) => {
                message.destroy();
                message.error(error.toString());
            });
    };

    const hideModalAddEdit = () => {
        setAction('');
        setSelectedRowsKey([]);
        setDataModalAddEdit({});
        setVisibleModalAddEdit(false);
    };

    const submitModalAddEdit = (data) => {
        setConfirmLoading(true);
        if (action === 'add') {
            api.ThemChiaTachSapNhap(data)
                .then((res) => {
                    setConfirmLoading(false);
                    if (res.data.Status > 0) {
                        message.destroy();
                        message.success(res.data.Message);
                        hideModalAddEdit();
                        props.getList(filterData);
                    } else {
                        setConfirmLoading(false);
                        message.destroy();
                        message.error(response.data.Message);
                    }
                })
                .catch((error) => {
                    setConfirmLoading(false);
                    message.destroy();
                    message.error(error.toString());
                });
        }
        if (action === 'edit') {
            api.CapNhatChiaTachSapNhap(data)
                .then((res) => {
                    if (res.data.Status > 0) {
                        setConfirmLoading(false);
                        message.destroy();
                        message.success(res.data.Message);
                        hideModalAddEdit();
                        props.getList(filterData);
                    } else {
                        setConfirmLoading(false);
                        message.destroy();
                        message.error(res.data.Message);
                    }
                })
                .catch((error) => {
                    setConfirmLoading(false);
                    message.destroy();
                    message.error(error.toString());
                });
        }
    };

    const renderThaoTac = (record) => {
        return (
            <div className={'action-btn'}>
                {/* {role.edit ? */}
                <Tooltip title={'Sửa'}>
                    <EditOutlined onClick={() => showModalEdit(record.ChiaTachSapNhapID)} />
                </Tooltip>
                {/* : ""} */}
                {/* {role.delete ? */}
                <Tooltip title={'Xóa'}>
                    <DeleteOutlined onClick={() => deleteModalAddEdit(record.ChiaTachSapNhapID)} />
                </Tooltip>
                {/* : ""} */}
            </div>
        );
    };

    const renderCheckBox = (record) => {
        return <Checkbox checked={record.TrangThai} disabled />;
    };

    const { DanhSachChiaTachSapNhap, TotalRow, role } = props;
    const PageNumber = filterData.PageNumber ? parseInt(filterData.PageNumber) : 1;
    const PageSize = filterData.PageSize ? parseInt(filterData.PageSize) : getDefaultPageSize();

    const columns = [
        {
            title: 'STT',
            width: '5%',
            align: 'center',
            render: (text, record, index) => <span>{(PageNumber - 1) * PageSize + (index + 1)}</span>,
        },
        {
            title: 'Tên cơ quan mới',
            dataIndex: 'MaChiaTachSapNhap',
            align: 'left',
            width: 30,
        },
        {
            title: 'Tên cơ quan cũ',
            dataIndex: 'TenChiaTachSapNhap',
            align: 'left',
            width: 30,
        },

        {
            title: 'Ghi Chú',
            dataIndex: 'GhiChu',
            align: 'left',
            width: 30,
        },
        {
            title: 'Đang sử dụng',
            align: 'center',
            width: 30,
            render: (text, record) => renderCheckBox(record),
        },
        {
            title: 'Thao tác',
            width: '15%',
            align: 'center',
            render: (text, record) => renderThaoTac(record),
        },
    ];

    return (
        <LayoutWrapper>
            <PageHeader>Danh Mục chia tách, sáp nhập cơ quan</PageHeader>
            <PageAction>
                {/* {role ? role.add ?  */}
                <Button type="primary" onClick={showModalAdd}>
                    <PlusOutlined />
                    Thêm thông tin
                </Button>
                {/* //  : '' : ''} */}
            </PageAction>
            <Box>
                <BoxFilter>
                    <InputSearch
                        defaultValue={filterData.Keyword}
                        placeholder={'Nhập tên chức vụ'}
                        style={{ width: 300 }}
                        onSearch={(value) => onFilter(value, 'keyword')}
                    />
                </BoxFilter>
                <BoxTable
                    columns={columns}
                    dataSource={DanhSachChiaTachSapNhap}
                    onChange={onTableChange}
                    pagination={{
                        showSizeChanger: true,
                        showTotal: (total, range) => `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
                        total: TotalRow,
                        current: PageNumber,
                        pageSize: PageSize,
                    }}
                    rowKey={(record) => record.ChiaTachSapNhapID}
                />
            </Box>
            <ModalAddEdit
                visible={visibleModalAddEdit}
                dataEdit={dataModalAddEdit}
                action={action}
                loading={confirmLoading}
                key={modalKey}
                onCreate={submitModalAddEdit}
                onCancel={hideModalAddEdit}
                DanhSachChiaTachSapNhap={DanhSachChiaTachSapNhap}
            />
        </LayoutWrapper>
    );
};

function mapStateToProps(state) {
    return {
        ...state.DanhMucChiaTachSapNhap,
        role: getRoleByKey(state.Auth.role, 'quan-ly-nam-hoc'),
    };
}

export default connect(mapStateToProps, actions)(DMChiaTachSapNhap);

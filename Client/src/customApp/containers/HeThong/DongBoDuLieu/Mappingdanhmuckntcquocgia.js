import { Modal, Table, Tooltip, message,Row,Col,Form,Input,Radio   } from "antd";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import actions from "../../../redux/DanhMuc/DanhMucDanToc/action";
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import PageAction from "../../../../components/utility/pageAction";
import Box from "../../../../components/utility/box";
import BoxFilter from "../../../../components/utility/boxFilter";
import BoxTable from "../../../../components/utility/boxTable";
import Checkbox from "../../../../components/uielements/checkbox";
import {
  Button,
  InputSearch,
  Option,
  Select,
} from "../../../../components/uielements/exportComponent";
import {
  changeUrlFilter,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
} from "../../../../helpers/utility";
import { useKey } from "../../../CustomHook/useKey";
import queryString from "query-string";
import api from "./config";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { CheckboxGroup } from "../../../../components/uielements/checkbox";
import { useForm } from "antd/lib/form/Form";
import { ITEM_LAYOUT } from "../../../../settings/constants";
import Wrapper from './Mappingdanhmuckntcquocgia.styled'
const { Item } = Form;
const LichSuDongBo = (props) => {
  document.title = "Danh Mục Dân Tộc";
  const {form} = useForm()
  const {filterData,setFilterData} = props
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [action, setAction] = useState("");
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loaiDongBo,setLoaiDongBo] = useState(1)

  useEffect(() => {
    changeUrlFilter(filterData);
    props.getData(filterData);
  }, [filterData]);

  useEffect(() => {
    props.getData(filterData);
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
    setAction("add");
    setDataModalAddEdit({});
    inceaseModalKey();
    setVisibleModalAddEdit(true);
  };

  const deleteModalAddEdit = (DanTocID) => {
    Modal.confirm({
      title: "Xóa Dữ Liệu",
      content: "Bạn có muốn xóa dân tộc này không?",
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        setConfirmLoading(true);
        api
          .XoaDanToc(DanTocID)
          .then((res) => {
            if (res.data.Status > 0) {
              setConfirmLoading(false);
              props.getData(filterData);
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
    const DanTocID = id;
    setAction("edit");
    api
      .ChiTietDanToc({ DanTocID })
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
    setAction("");
    setSelectedRowsKey([]);
    setDataModalAddEdit({});
    setVisibleModalAddEdit(false);
  };

  const submitModalAddEdit = (data) => {
    console.log("true");
    setConfirmLoading(true);
    if (action === "add") {
      api
        .ThemDanToc(data)
        .then((res) => {
          setConfirmLoading(false);
          if (res.data.Status > 0) {
            message.destroy();
            message.success(res.data.Message);
            hideModalAddEdit();
            props.getData(filterData);
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
    if (action === "edit") {
      api
        .SuaDanToc(data)
        .then((res) => {
          if (res.data.Status > 0) {
            setConfirmLoading(false);
            message.destroy();
            message.success(res.data.Message);
            hideModalAddEdit();
            props.getData(filterData);
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
      <div className={"action-btn"}>
        {/* {role.edit ? */}
        <Tooltip title={"Sửa"}>
          <EditOutlined onClick={() => showModalEdit(record.DanTocID)} />
        </Tooltip>
        {/* : ""} */}
        {/* {role.delete ? */}
        <Tooltip title={"Xóa"}>
          <DeleteOutlined onClick={() => deleteModalAddEdit(record.DanTocID)} />
        </Tooltip>
        {/* : ""} */}
      </div>
    );
  };

  const { DanhSachDanToc, TotalRow, role } = props;
  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;
  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();

  const columns = [
    {
      title: "STT",
    //   width: 5,
      align: "center",
      render: (text, record, index) => (
        <span>{(PageNumber - 1) * PageSize + (index + 1)}</span>
      ),
    },
    {
      title: "Mã trên KNTC",
      dataIndex: "MaKNTC",
      align: "left",
    //   width: 20,
    },
    {
      title: "Tên trên KNTC",
      dataIndex: "TenKNTC",
      align: "left",
    //   width: 35,
    },
    {
      title: "Mã mapping",
      dataIndex: "MaMapping",
      align: "left",
    //   width: 40,
    },
  ];

  const onChangeNgay = value => {
    console.log(value,'value')
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys} selectedRowKeys`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
        disabled: record.name === '123122001', // Column configuration not to be checked
        name: record.name,
    }),
  };


  const columnsTest = [
    {
        title: "STT",
        // width: 30,
        align: "center",
        render: (text, record, index) => (
          <span>{(PageNumber - 1) * PageSize + (index + 1)}</span>
        ),
      },
    {
      title: 'Mã trên API',
      dataIndex: 'MaAPI',
    },
    {
      title: 'Tên trên API',
      dataIndex: 'TenAPI',
    },

  ];
  
  const dataTest = [
    {

      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {

      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {

      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
        key : '123',
        name: 'Disabled User 12312312312 123 1231 13 212 123 000000000000000000',
        age: 99,
        address: 'Sidney No. 1 Lake Park',
    },
    {

      name: 'Disabled User',
      age: 99,
      address: 'Sidney No. 1 Lake Park',
    },
    {

        name: 'Disabled User 12312312312 123 1231 13 212 123 ',
        age: 99,
        address: 'Sidney No. 1 Lake Park',
    },
  ];



  return (
    <Wrapper>

        <LayoutWrapper>
        <Box>
           
            <Row>
                <Col xs = {24} md={16}>
                    <BoxFilter>
                      <div className="filter-item">
                        <p className="label">Loại danh mục ánh xạ : </p>
                        <Select style = {{width : '300px'}}>
                          <Option>123</Option>
                          <Option>123</Option>
                          <Option>123</Option>
                        </Select>
                      </div>
                    </BoxFilter>
                    <BoxTable
                    columns={columns}
                    dataSource={dataTest}
                    onChange={onTableChange}
                    pagination={{
                        showSizeChanger: true,
                        showTotal: (total, range) =>
                        `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
                        total: TotalRow,
                        current: PageNumber,
                        pageSize: PageSize,
                    }}
                    />
                </Col>
                <Col xs = {24} md={8}>
                    <BoxFilter>
                      <Button>Tất cả dữ liệu & call api</Button>
                      <Button style = {{marginLeft : '10px'}}>Cập nhật dữ liệu mapping</Button>
                    </BoxFilter>
                    <BoxTable
                    columns={columnsTest}
                    dataSource={dataTest}
                    onChange={onTableChange}
                    scroll = {{
                      x : 400
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
                </Col>
                
            </Row>
        </Box>

        </LayoutWrapper>
    </Wrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.ReducerDanToc,
    role: getRoleByKey(state.Auth.role, "quan-ly-nam-hoc"),
  };
}

export default connect(mapStateToProps, actions)(LichSuDongBo);

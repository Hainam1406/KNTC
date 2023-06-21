import { Modal, Table, Tooltip, message,Tabs,Input  } from "antd";
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
  DatePicker,
  InputSearch,
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
import DanhSachDonThu from "./danhsachdonthu";
import LichSuDongBo from './lichsudongbo';
import MappingDanhMucKNTCQuocGia from "./Mappingdanhmuckntcquocgia";
const QLNamHoc = (props) => {
  document.title = "Đồng bộ dữ liệu";
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [action, setAction] = useState("");
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [activeKey,setActiveKey] = useState("1")

  useEffect(() => {
    changeUrlFilter(filterData);
    props.getData(filterData);
    if(filterData.key){
      setActiveKey(filterData.key)
    }else {
      setFilterData({...filterData,key : activeKey})
    }
  }, [filterData]);

  useEffect(() => {
    props.getData(filterData);
  }, []);

  const onTableChange = (pagination, filters, sorter) => {
    let oldFilterData = filterData;
    let onOrder = { pagination, filters, sorter };
    let newFilterData = getFilterData(oldFilterData, null, onOrder);

    setFilterData(newFilterData);

  };

  const onFilter = (value, property) => {
    let oldFilterData = filterData;
    let onFilter = { value, property };
    let newfilterData = getFilterData(oldFilterData, onFilter, null);
    //get filter data
    setFilterData(newfilterData);
    

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
      width: 5,
      align: "center",
      render: (text, record, index) => (
        <span>{(PageNumber - 1) * PageSize + (index + 1)}</span>
      ),
    },
    {
      title: "Mã dân tộc",
      dataIndex: "MaDanToc",
      align: "left",
      width: 20,
    },
    {
      title: "Tên dân tộc",
      dataIndex: "TenDanToc",
      align: "left",
      width: 35,
    },
    {
      title: "Ghi chú",
      dataIndex: "GhiChu",
      align: "left",
      width: 40,
    },
    {
      title: "Đang sử dụng",
      dataIndex: "TrangThai",
      align: "center",
      width: 30,
      render: (text, record) => {
        return <Checkbox checked={record.TrangThai}></Checkbox>;
      },
    },
    {
      title: "Thao tác",
      width: "15%",
      align: "center",
      margin: "15px",
      render: (text, record) => renderThaoTac(record),
    },
  ];

  const handleChangeTabs = activeKey => {
    console.log(activeKey,'activeKey')
  }

  return (
    <LayoutWrapper>
      <PageHeader>Chọn dữ liệu đồng bộ</PageHeader>
      <PageAction>
        {/* {role ? role.add ?  */}
        <Button type="primary" onClick={showModalAdd}>
          <PlusOutlined />
          Thêm mới
        </Button>
        {/* //  : '' : ''} */}
      </PageAction>
      <Box>
        <BoxFilter>
          <div>
            <p>
              Từ ngày
            </p>
            <div>
              <DatePicker/>
            </div>
          </div>
          <div>
            <p>Đến ngày : </p>
            <div>
              <DatePicker/>
            </div>
          </div>
        </BoxFilter>
        <Tabs activeKey = {activeKey} onChange={activeKey => onFilter(activeKey,'key')}>
          <Tabs.TabPane tab="Danh sách đơn thu" key="1">
            <DanhSachDonThu filterData = {filterData} setFilterData = {setFilterData}/>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Lịch sử đồng bộ" key="2">
            <LichSuDongBo filterData = {filterData} setFilterData = {setFilterData}/>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Mapping danh mục KNTC Quốc gia" key="3">
            <MappingDanhMucKNTCQuocGia filterData = {filterData} setFilterData = {setFilterData}/>
          </Tabs.TabPane>
        </Tabs>
      </Box>

    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.ReducerDanToc,
    role: getRoleByKey(state.Auth.role, "quan-ly-nam-hoc"),
  };
}

export default connect(mapStateToProps, actions)(QLNamHoc);

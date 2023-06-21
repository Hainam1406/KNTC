import React, {useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import queryString from 'query-string';
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import BoxTable from '../../../../components/utility/boxTable';
import PageHeader from "../../../../components/utility/pageHeader";
import PageAction from "../../../../components/utility/pageAction";
import Box from "../../../../components/utility/box";
import BoxFilter from "../../../../components/utility/boxFilter";
import {DatePicker, message, Modal, Tooltip} from 'antd';
import {Button, InputSearch,Select,Option} from '../../../../components/uielements/exportComponent';
import {Table} from './table'
import {
  changeUrlFilter,
  getFilterData,
  getDefaultPageSize,
  getRoleByKey, getConfigLocal
} from "../../../../helpers/utility";
import {
  UserAddOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  UsergroupAddOutlined
} from "@ant-design/icons";
import {useVisible} from "../../../CustomHook/useVisible";
import {useKey} from "../../../CustomHook/useKey";

const Report = ({
  title = "Báo cáo something",data,danhSachDonVi = [],location,tableHeader = [],tableLoading,setThongTinBaoCaoChiTiet,
  ThongTinBaoCao,ChiTietDonThu,ThongTinBaoCaoChiTiet,GetChiTietDonThu,loadingDetailsReport,Step,setStep,onRollBack,
  DetailsReportPayload
}) => {
  // document.title = 'Quản lý học sinh';
  const [filterData, setFilterData] = useState({});
  const [DetailsDataReport,setDetailsDataReport] = useState([])


  useEffect(() => {

  }, [ThongTinBaoCaoChiTiet]);

  const mapsToProps = {
    tableHeader : Step === 1 ? ThongTinBaoCao?.DataTable?.TableHeader : Step === 2 ? ThongTinBaoCaoChiTiet?.DataTable?.TableHeader : {},
    tableData :  Step === 1 ? ThongTinBaoCao?.DataTable?.TableData : Step === 2 ? ThongTinBaoCaoChiTiet?.DataTable?.TableData : [],
    setThongTinBaoCaoChiTiet,
    loadingDetailsReport,
    DetailsReportPayload,
    GetChiTietDonThu,
    tableLoading,
    ChiTietDonThu,
    setStep,
    Step,
    onRollBack
  }

  
  return <>
      <Table {...mapsToProps} />
  </>
  
}

export default Report
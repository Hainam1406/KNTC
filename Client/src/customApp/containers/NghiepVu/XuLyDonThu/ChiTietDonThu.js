// import { Modal, Table, Tooltip, message } from "antd";
// import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import actions from "../../../redux/DanhMuc/DanhMucDanToc/action";
// import LayoutWrapper from "../../../../components/utility/layoutWrapper";
// import PageHeader from "../../../../components/utility/pageHeader";
// import PageAction from "../../../../components/utility/pageAction";
// import Box from "../../../../components/utility/box";
// import BoxFilter from "../../../../components/utility/boxFilter";
// import BoxTable from "../../../../components/utility/boxTable";
// import Checkbox from "../../../../components/uielements/checkbox";
// import {
//   Button,
//   DatePicker,
//   InputSearch,
//   Select,
// } from "../../../../components/uielements/exportComponent";
// import {
//   changeUrlFilter,
//   getDefaultPageSize,
//   getFilterData,
//   getRoleByKey,
// } from "../../../../helpers/utility";
// import { useKey } from "../../../CustomHook/useKey";
// import queryString from "query-string";
// import api from "./config";
// import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
// import { CheckboxGroup } from "../../../../components/uielements/checkbox";
// import Wrapper,{WrapperBottom} from './ChiTietDonThu.styled'
// const ChiTietDonThu = ({setStep}) => {

//     return <Box>
//         <PageHeader>thông tin đơn thư</PageHeader>
//         <Wrapper>
//             <p>Thông tin đơn thư</p>
//         </Wrapper>
//         <PageHeader>hồ sơ đơn thư</PageHeader>
//         <Wrapper>
//             <p>Hồ sơ đơn thư</p>
//         </Wrapper>
//         <PageHeader>Tiến trình xử lý</PageHeader>
//         <WrapperBottom>
//             {/* <Button>Phân xử lý</Button> */}
//             <Button onClick = {() => setStep(1)}>Trở về</Button>
//         </WrapperBottom>
//     </Box>
// }


// export default ChiTietDonThu
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import PageAction from "../../../../components/utility/pageAction";
import Box from "../../../../components/utility/box";
import BoxFilter from "../../../../components/utility/boxFilter";
import BoxTable from "../../../../components/utility/boxTable";
import Checkbox from "../../../../components/uielements/checkbox";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import Select from "../../../../components/uielements/select";
import { Button } from "../../../../components/uielements/exportComponent";
const DanhMucLoaiDoiTuongKT = () => {
  const columns = [
    {
      title: "STT",
      align: "center",
      width: "5%",
      render: (_, record, index) => {
        return index + 1;
      },
    },

    {
      title: "Tên loại đối tượng khiếu nại",
      dataIndex: "TenLoaiDoiTuongKN",
      align: "left",
      width: "50%",
    },
    {
      title: "Trạng thái",
      align: "center",
      width: "15%",
      render: () => {
        return <Checkbox checked={true}></Checkbox>;
      },
    },
    {
      title: "Thao tác",
      align: "center",
      width: "15%",
      render: (text, record) => renderThaoTac(record),
    },
  ];
  const data = [
    {
      TenLoaiDoiTuongKN: "Cá Nhân",
    },
    {
      TenLoaiDoiTuongKN: "Tổ chức",
    },
    {
      TenLoaiDoiTuongKN: "Cơ quan",
    },
  ];
  const renderThaoTac = (record) => {
    return (
      <div className={"action-btn"}>
        {/* {role.edit ? */}
        <Tooltip title={"Sửa"}>
          <EditOutlined />
        </Tooltip>
        {/* : ""} */}
        {/* {role.delete ? */}
        <Tooltip title={"Xóa"}>
          <DeleteOutlined />
        </Tooltip>
        {/* : ""} */}
      </div>
    );
  };
  return (
    <LayoutWrapper>
      <PageHeader>Danh Mục Loại Đối Tượng Khiếu Tố</PageHeader>
      <PageAction>
        {/* {role ? role.add ?  */}
        <Button type="primary">
          <PlusOutlined />
          Thêm mới
        </Button>
        {/* //  : '' : ''} */}
      </PageAction>
      <Box>
        <BoxFilter></BoxFilter>
        <BoxTable columns={columns} dataSource={data} />
      </Box>
    </LayoutWrapper>
  );
};
export default DanhMucLoaiDoiTuongKT;

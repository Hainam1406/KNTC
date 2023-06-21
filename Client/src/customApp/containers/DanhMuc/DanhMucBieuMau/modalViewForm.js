import React, { useEffect, useState } from "react";
import { ITEM_LAYOUT, REQUIRED } from "../../../../settings/constants";
// import { ResponsiveEmbed } from "react-responsive-embed";
import { Form, Space, Table, Tag } from "antd";
import api from "./config";
import {
  Button,
  Modal,
  Input,
  Select,
  Option,
} from "../../../../components/uielements/exportComponent";
import { FundViewOutlined } from "@ant-design/icons";
const { Item, useForm } = Form;

const ModalViewForm = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // console.log(props);
  return (
    <>
      <p onClick={showModal}>
        <FundViewOutlined />
      </p>
      <Modal
        title={props.data.TenBieuMau}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"60%"}
        height={600}
        footer={[<Button onClick={handleCancel}>Đóng</Button>]}
      >
        <iframe
          src={props.data.UrlView}
          width="100%"
          height="600px"
          style={{ border: "none" }}
        ></iframe>
      </Modal>
    </>
  );
};
export default ModalViewForm;

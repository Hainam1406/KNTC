import {
  Button,
  DatePicker,
  Radio,
  Selectv4,
  Select,
} from "../../../../components/uielements/exportComponent";
import Form from "../../../../components/uielements/form";
import { Col, Row, Tooltip, Upload, message } from "antd";
import { REQUIRED } from "../../../../settings/constants";
import { RadioGroup } from "../../../../components/uielements/radio";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { HoSoTaiLieuFormWrapper } from "../../NghiepVu/TiepDanGianTiep/styled";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useState, useEffect } from "react";
import api from "./config";
dayjs.extend(customParseFormat);

function HoSoTaiLieuForm({ index, fields = [], danhSachFile, onDelete, form, ...props }) {
  const itemLayoutVertical = {
    wrapperCol: { span: 24 },
  };

  const onChangeUpload = (info, index) => {
    if (info.file.status === "removed") {
      let fileDinhKem = form.getFieldValue("FileDinhKem");
      fileDinhKem[index] = {
        ...fileDinhKem[index],
        File: undefined,
      };
      form.setFieldValue([`FileDinhKem`], fileDinhKem);
    }
  };

  const handleDelete = (name) => {
    onDelete(name);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [dataThongTin, setDataThongTin] = useState([]);

  const fetchData = async () => {
    try {
      const response = await api.ThongTinBoSung();
      const { Status, Data, Message } = response.data;

      if (Status === 1) {
        setDataThongTin(Data);
      } else {
        message.error(Message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <>
      {fields.map(({ key, name, ...restField }) => (
        <HoSoTaiLieuFormWrapper {...props} key={key}>
          <Form.Item
            {...restField}
            name={[name, "NgayUp"]}
            label="Ngày cập nhật"
            rules={[REQUIRED]}
            {...itemLayoutVertical}
            initialValue={dayjs()}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            {...restField}
            name={[name, "TenBuoc"]}
            label="Thông tin bổ sung"
            rules={[REQUIRED]}
            {...itemLayoutVertical}
          >
            <Select>
              {dataThongTin.map((items) => (
                <Option value={items.Value}>{items.TenBuoc}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            {...restField}
            name={[name, "TenFile"]}
            label="Tên hồ sơ"
            rules={[REQUIRED]}
            {...itemLayoutVertical}
          >
            <Selectv4 options={danhSachFile} />
          </Form.Item>
          <Form.Item
            {...restField}
            name={[name, "IsBaoMat"]}
            label="Độ bảo mật"
            rules={[REQUIRED]}
            layout={"horizontal"}
            initialValue={0}
          >
            <RadioGroup>
              <Radio value={0}>Công khai</Radio>
              <Radio value={1}>Bảo mật</Radio>
            </RadioGroup>
          </Form.Item>

          <Form.Item
            {...restField}
            name={[name, "File"]}
            label="File quyết định"
            rules={[REQUIRED]}
          >
            <Upload
              onChange={(info) => onChangeUpload(info, name)}
              customRequest={({ onSuccess }) => onSuccess("ok")}
              multiple={false}
            >
              <Button icon={<UploadOutlined />}>Chọn file</Button>
            </Upload>
          </Form.Item>

          <div className={"action-btn"}>
            {/* {role.delete ? */}
            <Tooltip title={"Xóa"}>
              <DeleteOutlined onClick={() => handleDelete(name)} />
            </Tooltip>
            {/* : ""} */}
          </div>
        </HoSoTaiLieuFormWrapper>
      ))}
    </>
  );
}

export default HoSoTaiLieuForm;

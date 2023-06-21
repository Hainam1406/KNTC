import React from "react";

import Collapse from "../../../../components/uielements/collapse";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  DownloadOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  Input,
  Selectv4,
  DatePicker,
  Button,
  Select,
  Option,
} from "../../../../components/uielements/exportComponent";
import { ITEM_LAYOUT, REQUIRED } from "../../../../settings/constants";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useSelector } from "react-redux";

import Inputnumber from "../../../../components/uielements/InputNumber";
import TableCustom from "../../../../components/uielements/table";
import { Avatar, Card, Col, InputNumber, Row } from "antd";
import {
  NoneBorder,
  PaddingCardChiTietDonThu,
} from "../SoTiepDanTrucTiep/styled";
import ThongTinChiTietDT from "./ThongTinChiTietDT";
import pdf from "./img/pdf.png";
import doc from "./img/doc.png";
import xlsx from "./img/xls.png";
import txt from "./img/txt.png";

import api from "./config";
const { Meta } = Card;
const { Panel } = Collapse;

export default function HoSoDonThu({ data, danhSachKhieuTo }) {
  const [checkInput, setCheckInput] = useState(false);
  const [fileHoSo, setFileHoSo] = useState();
  const [danhSachLoaiDon, setDanhSachLoaiDon] = useState();
  const CheckInput = () => {
    setCheckInput((pre) => !pre);
  };
  useEffect(() => {
    if (data && data?.FileHoSo) {
      setFileHoSo(data.FileHoSo);
    }
    getDanhSachLoaiKhieuToCha();
  }, [data]);
  console.log("chien2", data);
  const getDanhSachLoaiKhieuToCha = async () => {
    let res = await api.DanhSachLoaiKhieuToCha();
    setDanhSachLoaiDon(res.data.Data);
  };
  const ChangeIconImg = (name) => {
    let nameConvert = name.slice(name.length - 4, name.length);
    if (nameConvert == "docx") {
      return doc;
    } else if (nameConvert == ".pdf" || nameConvert == ".PDF") {
      return pdf;
    } else if (nameConvert == ".txt") {
      return txt;
    } else {
      return xlsx;
    }
  };
  return (
    <Collapse defaultActiveKey={["1", "2", "3", "4", "5", "6"]}>
      <Panel header="Hồ sơ, tài liệu chính" key={"1"}>
        <PaddingCardChiTietDonThu>
          <Row gutter={16}>
            {fileHoSo?.map((item) => {
              return (
                <>
                  <Col span={8}>
                    <Card
                      style={{
                        height: "auto",
                      }}
                    >
                      <Row>
                        <Col span={8}>
                          <img
                            src={ChangeIconImg(item.FileURL)}
                            style={{
                              width: "115px",
                              height: "auto",
                              padding: "17px 10px",
                            }}
                          ></img>
                        </Col>
                        <Col span={16} className="marginTop">
                          <Row span={24} justify={"space-between"}>
                            {checkInput == true ? (
                              <>
                                <Col span={16}>
                                  <Select
                                    style={{
                                      width: "95%",
                                    }}
                                  >
                                    {danhSachLoaiDon?.map((item) => (
                                      <Option value={item.LoaiKhieuToID}>
                                        {item.TenLoaiKhieuTo}
                                      </Option>
                                    ))}
                                  </Select>
                                </Col>
                                <Col span={4}>
                                  <SaveOutlined
                                    style={{
                                      fontSize: "30px",
                                      marginRight: "10px !important",
                                    }}
                                    onClick={CheckInput}
                                  />
                                </Col>
                              </>
                            ) : (
                              <>
                                <Col span={16}>
                                  <strong style={{ marginTop: "3px" }}>
                                    {item.TenFile}
                                  </strong>
                                </Col>
                                <Col span={4}>
                                  <EditOutlined
                                    style={{
                                      fontSize: "30px",
                                      marginRight: "10px !important",
                                    }}
                                    onClick={CheckInput}
                                  />
                                </Col>
                              </>
                            )}
                            <Col span={4}>
                              <DownloadOutlined
                                style={{
                                  fontSize: "30px",
                                  marginRight: "10px !important",
                                  color: "#1677ff",
                                }}
                              />
                            </Col>
                            <Col span={24}>
                              <p>{item.CANBOTHEM}</p>
                              <p>{item.NgayUp}</p>
                              <p>File hồ sơ</p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </>
              );
            })}
          </Row>
        </PaddingCardChiTietDonThu>
      </Panel>
      <Panel header="Hồ sơ, tài liệu khác" key={"3"}></Panel>
    </Collapse>
  );
}

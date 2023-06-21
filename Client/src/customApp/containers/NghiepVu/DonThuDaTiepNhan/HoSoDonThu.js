import React from "react";
import Modal from "../../../../components/uielements/modal";
import Form from "../../../../components/uielements/form";
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
import { NoneBorder, PaddingCardChiTietDonThu } from "./styled";
import ThongTinChiTietDT from "./ThongTinChiTietDT";
import pdf from "./img/pdf.png";
const { Meta } = Card;
const { Panel } = Collapse;

export default function HoSoDonThu() {
  const [checkInput, setCheckInput] = useState(false);
  const CheckInput = () => {
    setCheckInput((pre) => !pre);
  };
  return (
    <>
      <Collapse defaultActiveKey={["4", "5", "6"]}>
        <Panel header={"Hồ sơ, tài liệu chính"} key={"4"}>
          <PaddingCardChiTietDonThu>
            <Row gutter={16}>
              <Col span={8}>
                <Card
                  style={{
                    height: "auto",
                  }}
                >
                  <Row>
                    <Col span={8}>
                      <img
                        src={pdf}
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
                                <Option value={"Đơn thư"}>Đơn thư</Option>
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
                              {/* <Input
                                style={{
                                  height: "32px !important",
                                  width: "95%",
                                }}
                              /> */}
                              <p style={{ marginTop: "3px" }}>
                                Đơn thư
                              </p>
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
                          <p>Đã thêm bởi Vũ Thị An (Ban tiếp công dân Tỉnh)</p>
                          <p>18-12-1023</p>
                          <p>File hồ sơ</p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </PaddingCardChiTietDonThu>
        </Panel>

        <Panel header={"Hồ sơ, tài liệu liên quan"} key={"5"}>
          {/* <PaddingCardChiTietDonThu>
            <Row gutter={16}>
              <Col span={8}>
                <Card
                  style={{
                    height: "auto",
                  }}
                >
                  <Row>
                    <Col span={8}>
                      <img
                        src={pdf}
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
                                <Option>Đơn thư</Option>
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
                              <Input />
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
                          <p>Đã thêm bởi Vũ Thị An (Ban tiếp công dân Tỉnh)</p>
                          <p>18-12-1023</p>
                          <p>File hồ sơ</p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={8}>Tuấn</Col>
              <Col span={8}>Tuấn</Col>
            </Row>
          </PaddingCardChiTietDonThu> */}
        </Panel>
      </Collapse>
    </>
  );
}

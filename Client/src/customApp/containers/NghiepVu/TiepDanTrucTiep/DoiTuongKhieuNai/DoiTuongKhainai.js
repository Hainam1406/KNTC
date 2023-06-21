import { Col, Row } from "antd";
import PanelBox, {
  PanelBoxSection,
} from "../../TiepDanGianTiep/components/PanelBox";
import Form from "../../../../../components/uielements/form";
import Inputnumber from "../../../../../components/uielements/InputNumber";

import {
  Input,
  Selectv4,
} from "../../../../../components/uielements/exportComponent";
import { REQUIRED } from "../../../../../settings/constants";
import { useEffect, useState } from "react";
import NguoiDaiDienForm from "../components/FormDoiTuongKhieuNai";
import api from "../../TiepDanGianTiep/config";
import actions from "../../../../redux/NghiepVu/TiepDanTrucTiep/action";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

function DoiTuongKhieuNaiToCao({
  form,
  chiTietDonTrung,

  ...props
}) {
  const [optionsNguoiDaiDien, setOptionNguoiDaiDien] = useState([]);
  const [daidien, setDaiDien] = useState(1);
  const [songuoi, setSoNguoi] = useState(5);
  const [diaGioiID, setDiaGioiID] = useState();
  const action = useSelector((state) => state.ReducerTiepDan.actionTiepDan);

  const dispatch = useDispatch();
  /*
        Loại đối tượng:
            1 - Cá nhân
            2 - Cơ quan, tổ chức
            3 - Tập thể
    */

  const [loaiDoiTuong, setLoaiDoiTuong] = useState({
    name: null,
    value: null,
  });
  const [isDisableForm, setIsDisableForm] = useState(false);
  const [danhSachLoaiDoiTuongKN, setDanhSachLoaiDoiTuongKN] = useState([]);
  const [nguoiDaiDien, setNguoiDaiDien] = useState({
    soNguoi: 0,
    options: [],
    disabled: true,
  });
  let formatDate = ["YYYY-MM-DD", "DD/MM/YYYY"];
  useEffect(() => {
    if (chiTietDonTrung && action) {
      setIsDisableForm(true);
    } else {
      setIsDisableForm(false);
    }
  });
  const handleDate = (dateString) => {
    let newDateString = dateString.split("T")[0];

    if (dayjs(newDateString, formatDate[0], true).isValid())
      return dayjs(newDateString, formatDate[0], true);
    else if (dayjs(newDateString, formatDate[1], true).isValid())
      return dayjs(newDateString, formatDate[1], true);
    else return undefined;
  };
  useEffect(() => {
    setIsDisableForm(!!chiTietDonTrung);
    if (chiTietDonTrung) {
      console.log(chiTietDonTrung, "chiTietDonTrung");
      let { TinhID, HuyenID, XaID } = chiTietDonTrung;
      setDiaGioiID({
        TinhID,
        HuyenID,
        XaID,
      });
      let data = {
        ...chiTietDonTrung,
        NgayCap: handleDate(chiTietDonTrung?.NgayCap),
      };
      form.setFieldsValue(data);
    }
  }, [chiTietDonTrung]);

  const getListLoaiDoiTuongKN = async () => {
    try {
      let res = await api.DanhSachLoaiDoiTuongKN();

      let { Status, Data, Message } = res.data;

      if (Status === 1) {
        let newData = Data.map((item, index) => ({
          ID: item.LoaiDoiTuongKNID,
          value: index + 1,
          label: item.TenLoaiDoiTuongKN,
        }));

        setDanhSachLoaiDoiTuongKN(newData);
      } else {
        message.error(Message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    getListLoaiDoiTuongKN();
  }, []);

  useEffect(() => {
    form.setFieldValue("LoaiDoiTuongKNID", danhSachLoaiDoiTuongKN[0]?.ID);
    console.log(danhSachLoaiDoiTuongKN, "ds");
  }, [danhSachLoaiDoiTuongKN]);

  const handleChangePanel = (value) => {
    setLoaiDoiTuong(value);
    form.resetFields();
  };

  const handleListNguoiDaiDien = (number) => {
    let listNguoiDaiDien = [];
    for (let i = 1; i <= number; i++) {
      listNguoiDaiDien.push({
        value: i,
        label: `${i} người`,
      });
    }
    return listNguoiDaiDien;
  };

  const handleChangeSoNguoi = (e) => {
    form.setFieldsValue({
      SoNguoiDaiDien: undefined,
    });

    const { value } = e.target;
    let totalNumberOfPeople = isNaN(Number(value)) ? 2 : Number(value);

    if (totalNumberOfPeople >= 5 && totalNumberOfPeople <= 10) {
      setNguoiDaiDien({
        options: handleListNguoiDaiDien(2),
        disabled: false,
      });
    } else if (totalNumberOfPeople > 10) {
      setNguoiDaiDien({
        options: handleListNguoiDaiDien(5),
        disabled: false,
      });
    } else if (totalNumberOfPeople < 5) {
      setNguoiDaiDien({
        options: handleListNguoiDaiDien(2),
        disabled: false,
      });
    } else {
      if (totalNumberOfPeople >= 2 && totalNumberOfPeople <= 4) {
        setNguoiDaiDien({
          options: handleListNguoiDaiDien(totalNumberOfPeople),
          disabled: false,
        });
      } else {
        setNguoiDaiDien({
          soNguoi: 0,
          options: [],
          disabled: true,
        });
      }
    }
  };

  const handleChangeSoNguoiDaiDien = (value) => {
    setNguoiDaiDien((pre) => ({
      ...pre,
      soNguoi: value,
    }));
  };

  useEffect(() => {
    form.setFieldValue(
      "NguoiDaiDien",
      renderListNguoiDaiDien(nguoiDaiDien.soNguoi)
    );
  }, [nguoiDaiDien.soNguoi]);

  const renderListNguoiDaiDien = (number) => {
    let list = [];

    for (let i = 0; i < number; i++) {
      list.push({});
    }

    return list;
  };
  useEffect(() => {
    dispatch(actions.setLoaiDoiTuongID(loaiDoiTuong.ID));
  }, [loaiDoiTuong]);
  return (
    <PanelBox
      headerText="Loại đối tượng"
      radioData={danhSachLoaiDoiTuongKN}
      radioGroupName="DoiTuongKhieuNaiToCao"
      onChangeRadio={handleChangePanel}
      disabled={isDisableForm}
    >
      <Form
        form={form}
        name="DoiTuongKhieuNaiToCaoForm"
        layout="vertical"
        disabled={isDisableForm}
      >
        <Form.Item
          name="LoaiDoiTuongKNID"
          style={{ display: "none" }}
        ></Form.Item>
        {loaiDoiTuong.value === 2 ? (
          <>
            <PanelBoxSection title={"Thông tin cơ quan, tổ chức"}>
              <Row gutter={16}>
                <Col className="gutter-row" span={8}>
                  <Form.Item
                    label="Tên cơ quan, tổ chức"
                    name="TenCQ"
                    rules={[REQUIRED]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={16}>
                  <Form.Item label="Địa chỉ cơ quan, tổ chức" name="DiaChiCQ">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </PanelBoxSection>
            <NguoiDaiDienForm
              diaGioiID={diaGioiID}
              title="Người đại diện"
              form={form}
              loaiDoiTuong={loaiDoiTuong}
              isDisableForm={isDisableForm}
              valueForm={2}
              isFormList={false}
            />
          </>
        ) : loaiDoiTuong.value === 3 ? (
          <>
            <PanelBoxSection title={"Thông tin tập thể"}>
              <Row gutter={16}>
                <Col
                  className="gutter-row"
                  xs={24}
                  sm={24}
                  md={24}
                  lg={8}
                  xl={8}
                  xxl={4}
                >
                  <Form.Item
                    label="Số người"
                    name="SoLuong"
                    rules={[REQUIRED]}
                    onChange={handleChangeSoNguoi}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col
                  className="gutter-row"
                  xs={24}
                  sm={24}
                  md={24}
                  lg={8}
                  xl={8}
                  xxl={4}
                >
                  <Form.Item label="Số người đại diện" name="SoNguoiDaiDien">
                    <Selectv4
                      disabled={nguoiDaiDien.disabled}
                      options={nguoiDaiDien.options}
                      onChange={handleChangeSoNguoiDaiDien}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </PanelBoxSection>
            <Form.List name="NguoiDaiDien">
              {(fields) => (
                <>
                  {fields.map(({ key, name, ...resetFields }) => (
                    <NguoiDaiDienForm
                      key={key}
                      diaGioiID={diaGioiID}
                      title="Người đại diện"
                      nameField={name}
                      resetFields={resetFields}
                      form={form}
                      isDisableForm={isDisableForm}
                      isFormList={true}
                    />
                  ))}
                </>
              )}
            </Form.List>
          </>
        ) : (
          <NguoiDaiDienForm
            title="Người đại diện"
            form={form}
            isDisableForm={isDisableForm}
            isFormList={false}
            diaGioiID={diaGioiID}
          />
        )}
      </Form>
    </PanelBox>
  );
}

export default DoiTuongKhieuNaiToCao;

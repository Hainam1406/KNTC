import React, { useState, useEffect, useRef } from 'react';
import Constants, {  ITEM_LAYOUT, REQUIRED } from '../../../../settings/constants';
import { Form, Radio, message } from 'antd';
import Select, {Option} from '../../../../components/uielements/select';
import { Modal , Input , Button  } from '../../../../components/uielements/exportComponent';
import api, {DanhSachLoaiDiaDanh} from "./config";

const { Item } = Form;

const ModalEdit = props => {
  // eslint-disable-next-line
  const [disabled, setDisable] = useState(false)
  const [ID, setID] = useState("")
  const [TinhID, setTinhID] = useState("")
  const [HuyenID, setHuyenID] = useState("")
  const [Cap, setCap] = useState("1")
  const [Key, setKey] = useState("")
  const [DanhSachTinh, setDanhSachTinh] = useState(props.DanhSachDiaGioi || [])
  const [DanhSachHuyen, setDanhSachHuyen] = useState([])
  const [Ten, setTen] = useState("")
  const [TenDayDu, setTenDayDu] = useState("")
  const [TenDiaDanh, setTenDiaDanh] = useState("")
  const [TenTinh, setTenTinh] = useState("")
  const [TenHuyen, setTenHuyen] = useState("")

  const formRef = useRef(null)

  const { action, onCreate } = props

  useEffect(() => {
    const { dataModalEdit } = props;
    const form = formRef.current
    if(dataModalEdit && dataModalEdit.DanhSachTinh) {
      const {DanhSachTinh, ID, Cap, TinhID, HuyenID, Key, Ten, TenDayDu} = dataModalEdit;
      //neu la them xa -> lay ds huyen
      let disabled = true;
      if (Cap.toString() === Constants.XA) {
        api.danhSachDiaGioi({
          ID: TinhID,
          Cap: Constants.HUYEN,
        })
          .then(response => {
            if (response.data.Status > 0) {
              const DanhSachHuyen = response.data.Data;
              const changeCap = String(Cap)
              const newObj = {
                DanhSachTinh: DanhSachTinh,
                ID: ID,
                Cap: changeCap,
                LoaiDiaDanh: DanhSachLoaiDiaDanh.find(item => item.value == `${Cap}00`)?.children[0]?.name,
                TinhID: TinhID,
                HuyenID: HuyenID,
                Key: Key,
                Ten: Ten,
                TenDayDu: TenDayDu ? TenDayDu : DanhSachLoaiDiaDanh.find(item => item.value == `${Cap}00`)?.children[0]?.name,
                DanhSachHuyen: DanhSachHuyen
              }
              form && form.setFieldsValue({
                ...newObj
              });
              setDanhSachHuyen(DanhSachHuyen)
              setDanhSachTinh(DanhSachTinh)
              setID(ID)
              setHuyenID(HuyenID)
              setTinhID(TinhID)
              setCap(Cap)
              setKey(Key)
              setTen(Ten)
              setTenDiaDanh(TenDiaDanh ? TenDiaDanh : DanhSachLoaiDiaDanh.find(item => item.value == `${Cap}00`)?.children[0]?.name)
              setTenDayDu(TenDayDu ? TenDayDu : DanhSachLoaiDiaDanh.find(item => item.value == `${Cap}00`)?.children[0]?.name)
              setDisable(disabled)
              
            } else {
              message.destroy()
              message.error({
                title: "Lỗi",
                content: response.data.Message
              });
            }
          }).catch(error => {
          message.destroy()
          message.error(Constants.API_ERROR)
        });
      } else {
        const newObj = {
          DanhSachTinh: DanhSachTinh,
          ID: ID,
          Cap: Cap.toString(),
          LoaiDiaDanh: DanhSachLoaiDiaDanh.find(item => item.value == `${Cap}00`)?.children[0]?.name,
          TinhID: TinhID,
          HuyenID: HuyenID,
          Key: Key,
          Ten: Ten,
          TenDayDu: TenDayDu ? TenDayDu : DanhSachLoaiDiaDanh.find(item => item.value == `${Cap}00`)?.children[0]?.name,
          DanhSachHuyen: DanhSachHuyen
        }
        form && form.setFieldsValue({
          ...newObj
        });
        setDanhSachHuyen(DanhSachHuyen)
        setDanhSachTinh(DanhSachTinh)
        setID(ID)
        setHuyenID(HuyenID)
        setTinhID(TinhID)
        setCap(Cap)
        setKey(Key)
        setTen(Ten)
        setTenDiaDanh(TenDiaDanh ? TenDiaDanh : DanhSachLoaiDiaDanh.find(item => item.value == `${Cap}00`)?.children[0]?.name)
        setTenDayDu(TenDayDu ? TenDayDu : DanhSachLoaiDiaDanh.find(item => item.value == `${Cap}00`)?.children[0]?.name)
        setDisable(disabled)
      }
    }
    else {
      const newObj = {
        DanhSachTinh: DanhSachTinh,
        ID: ID,
        Cap: Cap.toString(),
        TinhID: TinhID,
        HuyenID: HuyenID,
        Key: Key,
        Ten: Ten,
        TenDayDu: DanhSachLoaiDiaDanh.find(item => item.value.toString() == `${Cap}00`)?.children[0]?.name,
        DanhSachHuyen: DanhSachHuyen
      }
      
      console.log(form)
      form && form.setFieldsValue({
        ...newObj
      });

      setTenDayDu(DanhSachLoaiDiaDanh.find(item => item.value.toString() == `${Cap}00`)?.children[0]?.name)
    }
  }, [])

  const onOk = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const value = await form.validateFields();
    onCreate(value);
  };

  const onChangeCap = (e) => {
    const form = formRef.current;
      form.setFieldsValue({
        LoaiDiaDanh:DanhSachLoaiDiaDanh.find(item => item.value == `${e.target.value}00`)?.children[0]?.name,
        TenDayDu: DanhSachLoaiDiaDanh.find(item => item.value == `${e.target.value}00`)?.children[0]?.name,
      })
    if (action === 'add') {
      if (e.target.value.toString() === "1") {
        setCap(e.target.value)
        setDanhSachHuyen([])
      } else {
        setCap(e.target.value)
      }
    }
    if(action === 'edit'){
      setCap(e.target.value)
    }
  };

  const onChangeTinh = (TinhID) => {
    const form = formRef.current;
    form.setFieldValue("HuyenID", "")
    form.setFieldValue 

    if (TinhID) {
      api.danhSachDiaGioi({
        ID: TinhID,
        Cap: Constants.HUYEN,
      })
        .then(response => {
          if (response.data.Status > 0) {
            setDanhSachHuyen(response.data.Data)
          } else {
            message.destroy()
            message.error({
              title: "Lỗi",
              content: response.data.Message
            });
          }
        }).catch(error => {
        message.destroy()
        message.error(Constants.API_ERROR)
      });
    } else {
      setDanhSachHuyen([])
    }

    setTenTinh(DanhSachTinh.find(item => item.ID === TinhID).TenDayDu)
    onChangeTenDayDu(tenDiaDanh, Ten, TenHuyen, DanhSachTinh.find(item => item.ID === TinhID).TenDayDu)
  };

  const onChangeHuyen = (HuyenID) => {
    console.log(HuyenID)
    setTenHuyen(DanhSachHuyen.find(item.ID === HuyenID).TenDayDu)
    onChangeTenDayDu(tenDiaDanh, Ten, DanhSachHuyen.find(item.ID === HuyenID).TenDayDu, TenTinh)
  }

  const renderTitle = () => {
    if (action === 'add') {
      return "Thêm địa giới hành chính"
    }
    if (action === 'edit') {
      return "Sửa địa giới hành chính"
    }
    return 'Trường hợp ngoại lệ'
  }

  const onChangeTen = (e) => {
    setTen(e.target.value)
    onChangeTenDayDu(TenDiaDanh, e.target.value, TenHuyen, TenTinh)
  }

  const onChangeLoaiDiaDanh = (value) => {
    let tenDiaDanh = DanhSachLoaiDiaDanh.find(item => item.value.toString() === `${Cap}00`)?.children.find(item => item.value === value)?.name
    setTenDiaDanh(tenDiaDanh || "")
    onChangeTenDayDu(tenDiaDanh, Ten, TenHuyen, TenTinh)
  }

  const onChangeTenDayDu = (tenDiaDanh, ten, tenHuyen, tenTinh) => {
    console.log(tenHuyen)
    let tenDayDu = (tenDiaDanh ? tenDiaDanh.trim() + " " : "") + ten?.trim() + (tenHuyen && " " + tenHuyen?.trim()) + (tenTinh && " " + tenTinh?.trim())
    const form = formRef.current
    form && form.setFieldValue("TenDayDu", tenDayDu)
    setTenDayDu(tenDayDu)
  }

  const { confirmLoading, visible, onCancel, form } = props;
  
  return (
    <Modal
      title={renderTitle()}
      width={500}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>Hủy</Button>,
        <Button key="submit" htmlType="submit" type="primary" form="myForm"
                loading={confirmLoading} onClick={onOk}>Lưu</Button>,
      ]}
    >
      <Form ref={formRef} id="myForm" layout="horizontal"
        initialValues={{
          LoaiDiaDanh: DanhSachLoaiDiaDanh.find(item => item.value.toString() == Cap + "00")?.children[0],
          TenDayDu: DanhSachLoaiDiaDanh.find(item => item.value.toString() == Cap + "00")?.children[0]?.name,
        }}
      >
        {action === 'edit' ? <Item style={{ display: "none" }} name={"ID"}>
        </Item> : ''}
        <Item style={{ display: "none" }} name={"Key"}>
        </Item>
        <Item
          label="Cấp"
          name={"Cap"}
          {...ITEM_LAYOUT}
          rules={[
            {...REQUIRED}
          ]}
        >
          <Radio.Group onChange={onChangeCap} disabled={action === 'edit' ? true : false}>
            <Radio value={Constants.TINH}>Tỉnh</Radio>
            <Radio value={Constants.HUYEN}>Huyện</Radio>
            <Radio value={Constants.XA}>Xã</Radio>
          </Radio.Group>
        </Item>
        <Item
          label="Loại địa danh"
          name={"LoaiDiaDanh"}
          {...ITEM_LAYOUT}
          rules={[
            {...REQUIRED}
          ]}
        >
          <Select
            allowClear
            onChange={onChangeLoaiDiaDanh}
          >
            {
              DanhSachLoaiDiaDanh.find(item => item.value.toString() === Cap + "00")?.children?.map((item, index) => (
                <Option key={index} value={item.value}>{item.name}</Option>
              ))
            }
          </Select>
        </Item>
        {
          (Cap >= Constants.HUYEN)
            ?
            <Item 
              label="Thuộc tỉnh"
              name={"TinhID"} 
              {...ITEM_LAYOUT}
              rules={[
                {...REQUIRED}
              ]}
            >
              <Select showSearch onChange={onChangeTinh} disabled={action === 'edit' ? true : false}>
                {DanhSachTinh.map((value) => (
                  <Option key={value.ID} value={value.ID}>
                    {value.Ten}
                  </Option>
                ))}
              </Select>
            </Item>
            : ""
        }
        {
          (Cap >= Constants.XA)
            ?
            <Item
              label="Thuộc huyện"
              name={"HuyenID"}
              {...ITEM_LAYOUT}
              rules={[
                {...REQUIRED}
              ]}
            >
              <Select showSearch onChange={onChangeHuyen} disabled={action === 'edit' ? true : false}>
                {DanhSachHuyen.map((value) => (
                  <Option key={value.ID} value={value.ID}>
                    {value.Ten}
                  </Option>
                ))}
              </Select>
            </Item>
            : ""
        }
        <Item label="Tên" {...ITEM_LAYOUT} name={"Ten"} rules={[
           REQUIRED
        ]}>
          <Input autoFocus onChange={onChangeTen} />
        </Item>
        <Item label="Tên đầy đủ" {...ITEM_LAYOUT} name={"TenDayDu"} rules={[
           REQUIRED
        ]}>
          <Input />
        </Item>
      </Form>
    </Modal>
  );
}
export { ModalEdit }
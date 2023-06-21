import React, {Component, useEffect} from 'react';
import {ITEM_LAYOUT_SMALL_2, REQUIRED} from '../../../../settings/constants';
import {Form} from 'antd';
import Modal from '../../../../components/uielements/modal';
import Button from '../../../../components/uielements/button';
import {Select, OptionSelect} from "../../../../components/uielements/exportComponent";

const {Item} = Form;

const ModalAddUser = props => {
  const formRef = React.createRef();
  const {confirmLoading, visible, onCancel, dataModalAddUser} = props;
  const {DanhSachNguoiDung, NhomNguoiDungID} = dataModalAddUser;

  useEffect(() => {
    const form = formRef.current;
    form && form.setFieldsValue({NhomNguoiDungID})
  }, []);

  const onOk = async (e) => {
    e.preventDefault();
    const value = await formRef.current.validateFields();
    const {onCreate} = props;
    onCreate(value);
  };

  return (
    <Modal
      title="Thêm người dùng vào nhóm"
      width={600}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>Hủy</Button>,
        <Button key="submit" htmlType="submit" type="primary" form="myForm"
                loading={confirmLoading} onClick={onOk}>Lưu</Button>,
      ]}
    >
      <Form ref={formRef}>
        <Item name={'NhomNguoiDungID'} hidden/>
        <Item label="Chọn người dùng" name={'NguoiDungID'} rules={[{...REQUIRED}]} {...ITEM_LAYOUT_SMALL_2}>
          <Select showSearch noGetPopupContainer placeholder="Chọn người dùng" mode={'multiple'}>
            {DanhSachNguoiDung.map((value) => (
              <OptionSelect key={value.NguoiDungID} value={value.NguoiDungID}>
                {`${value.TenNguoiDung} (${value.TenCanBo})`}
              </OptionSelect>
            ))}
          </Select>
        </Item>
      </Form>
    </Modal>
  );

};

export {ModalAddUser}
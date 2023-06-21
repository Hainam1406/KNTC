import React, {useRef, useState} from 'react';
import api from "./config";
import Constants, {ITEM_LAYOUT_SMALL_2, REQUIRED,ITEM_LAYOUT} from '../../settings/constants';
import {Form, Input, message, Modal} from 'antd';
import {ModalCustom, Button} from '../../components/uielements/exportComponent';
import {useVisible} from "../../customApp/CustomHook/useVisible";

const {Item} = Form;

  const ModalChangePassword =  (props) => {
  const formRef = useRef();
  const [visibleLocal, openVisibleLocal, hideVisibleLocal] = useVisible(true);
  const [loading, setLoading] = useState();

  const onOk = async (e) => {
    e.preventDefault();
    const value = await formRef.current.validateFields();
    if (value.OldPassword === value.NewPassword) {
      Modal.error({
        title: "Thông báo",
        content: "Mật khẩu mới không được giống mật khẩu cũ"
      })
    } else if (value.NewPassword.indexOf(" ") >= 0) {
      Modal.error({
        title: "Thông báo",
        content: "Mật khẩu không được chứa khoảng trắng"
      })
    } else if (value.NewPassword !== value.ConfirmPassword) {
      Modal.error({
        title: "Thông báo",
        content: "Mật khẩu mới không trùng với nhập lại mật khẩu"
      })
    } else {
      setLoading(true);
      api.changePassword(value)
        .then(response => {
          setLoading(false);
          if (response.data.Status > 0) {
            message.success("Cập nhật mật khẩu thành công");
            onCancelLocal();
            setTimeout(() => {
              props.logout();
            }, 1000);
          } else {
            message.destroy();
            message.error(response.data.Message);
          }
        }).catch(error => {
        setLoading(true);
        message.destroy();
        message.error(error.toString());
      });
    }
  };

  const onCancelLocal = () => {
    hideVisibleLocal(false);
    props.onCancel();
  };

  let visible = false;
  if (props.visible && visibleLocal) {
    visible = true;
  }

  return (
    <ModalCustom
      title="Thay đổi mật khẩu"
      width={500}
      visible={visible}
      onCancel={onCancelLocal}
      footer={[
        <Button key="back" onClick={onCancelLocal}>Hủy</Button>,
        <Button key="submit" htmlType="submit" type="primary" form="myForm"
                loading={loading} onClick={onOk}>Cập nhật</Button>,
      ]}
    >
      <Form ref={formRef}>
        <Item label="Mật khẩu hiện tại" name={'OldPassword'} rules={[{...REQUIRED}]} {...ITEM_LAYOUT}>
          <Input.Password autoFocus/>
        </Item>
        <Item label="Mật khẩu mới" name={'NewPassword'}
              rules={[{...REQUIRED}, {min: 6, message: "Mật khẩu của bạn quá ngắn",}, {
                max: 30,
                message: "Mật khẩu của bạn quá dài",
              }]}{...ITEM_LAYOUT}>
          <Input.Password/>
        </Item>
        <Item label="Nhập lại mật khẩu" name={'ConfirmPassword'} rules={[{...REQUIRED}]} {...ITEM_LAYOUT}>
          <Input.Password/>
        </Item>
      </Form>
    </ModalCustom>
  )
}

export {ModalChangePassword}
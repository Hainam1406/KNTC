import React, {useEffect,useState} from 'react';
import { ITEM_LAYOUT2, ITEM_LAYOUT_SMALL, REQUIRED, ITEM_LAYOUT } from '../../../../settings/constants';
import {Form} from 'antd';
import {Button, Modal, Input,Select,Option,TreeSelect} from '../../../../components/uielements/exportComponent';
import DatePicker from "../../../../components/uielements/datePickerFormat";
import {Checkbox} from 'antd';
import moment from 'moment';
import { useSelector } from 'react-redux';

const {Item, useForm} = Form;

export default props => {
  const [form] = useForm();
  const {dataEdit, loading, visible,action,DanhSachCoQuan = [],DanhSachChucVu = []} = props;
  const [fromTime,setFromTime] = useState('')
  const [changeCanBo,setChangeCanBo] = useState(false)
  

  useEffect(() => {
    if (dataEdit && dataEdit.NguoiDungID) {
      const newNgaySinh = moment(dataEdit.NgaySinh).format('DD/MM/YYYY')
      form && form.setFieldsValue({
        ...dataEdit,
        NgaySinh : dataEdit && dataEdit.NgaySinh ? moment(newNgaySinh, 'DD/MM/YYYY') : '',
        XemTaiLieuMat :  dataEdit?.XemTaiLieuMat && dataEdit?.XemTaiLieuMat === 1 ? true : 0,
        QuanTriDonVi : dataEdit?.QuanTriDonVi  && dataEdit?.QuanTriDonVi === 1 ? true : 0,
        QuyenKy : dataEdit?.QuyenKy  && dataEdit?.QuyenKy === 1 ? true : 0
      })
    }
  }, []);

  const handleChangeNgaySinh = (value,strValue) => {
    setFromTime(value)
  }
  const onOk = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
    value.LaCanBo = changeCanBo
    value.XemTaiLieuMat = value?.XemTaiLieuMat ? 1 : 0
    value.QuanTriDonVi = value?.QuanTriDonVi ? 1 : 0
    value.QuyenKy = value?.QuyenKy ? 1 : 0
    props.onCreate(value);
  };



  return (
    <Modal
      title={`${action === 'edit' ? 'Sửa' : 'Thêm'} thông tin tài khoản`}
      width={700}
      visible={visible}
      onCancel={props.onCancel}
      footer={[
        <Button key="back" onClick={props.onCancel}>Hủy</Button>,
        <Button key="submit" htmlType="submit" type="primary" form="formmonhoc"
                loading={loading} onClick={onOk}>Lưu</Button>,
      ]}
    >

{/* <Form
      form={form}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
    </Form> */}
      <Form form={form} name={"formmonhoc"}>
        {action === 'edit' ? <Item name={'CanBoID'} hidden/> : ''}
        <Item label="Họ và tên" name={'TenCanBo'} rules={[{...REQUIRED}]} {...ITEM_LAYOUT_SMALL}>
          <Input/>
        </Item>
        <Item label="Ngày sinh" name={'NgaySinh'} rules={[{...REQUIRED}]} {...ITEM_LAYOUT_SMALL}>
          <DatePicker onChange={handleChangeNgaySinh} format={"DD/MM/YYYY"} placeholder={""}  style = {{width : '100%'}}/>
        </Item>
        <Item label="Giới tính" name={'GioiTinh'} rules={[{...REQUIRED}]} {...ITEM_LAYOUT_SMALL}>
              <Select
                    placeholder={'Chọn giới tính'} 
                    style = {{width : '100%'}}
                  >
                    <Option key = {1} value={1}>Nam</Option>
                    <Option key = {0} value={0}>Nữ</Option>
                    <Option key = {2} value={2}>Khác</Option>
              </Select>
        </Item>
        <Item label="Địa chỉ" name={'DiaChi'} rules={[{...REQUIRED}]} {...ITEM_LAYOUT_SMALL}>
          <Input/>
        </Item>
        <Item label="Tên cơ quan" name={'CoQuanID'} rules={[{...REQUIRED}]} {...ITEM_LAYOUT_SMALL}>
            {
              /// loop danh sách cơ quan at here
            }
            <TreeSelect
              showSearch
              treeData={DanhSachCoQuan}
              style={{width: '100%'}}
              dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
              placeholder="Chọn cơ quan"
              allowClear
              treeDefaultExpandAll
              // onChange={value => this.onSearch(value, "CoQuanID")}
              notFoundContent={"Không có dữ liệu"}
              treeNodeFilterProp={'title'}
              // defaultValue={filterData.CoQuanID}
            />
        </Item>
        <Item label="Chức vụ" name={'ChucVuID'} rules={[{...REQUIRED}]}  {...ITEM_LAYOUT_SMALL}>
            <Select style = {{width : '100%'}}>
              {DanhSachChucVu.map(item => <Option key = {item.ChucVuID} value = {item.ChucVuID}>{item.TenChucVu}</Option>)}
            </Select>
        </Item>
        <Item label="Email" name={'Email'} rules={[{...REQUIRED},{
            type: 'email',
            message: 'Vui lòng nhập đúng định dạng ',
          },]} {...ITEM_LAYOUT_SMALL}>
          <Input type = {'email'}/>
        </Item>
        <Item  label="Điện thoại" name={'DienThoai'} {...ITEM_LAYOUT_SMALL}>
          <Input type = {'email'}/>
        </Item>
        
        <Item label="Quyền ký" name="QuyenKy"
        valuePropName="checked"
        {...ITEM_LAYOUT_SMALL}>
          <Checkbox/>
        </Item>
        <Item label="Vai trò" name={'RoleID'} rules={[{...REQUIRED}]}  {...ITEM_LAYOUT_SMALL}>
              <Select
                    style = {{width : '100%'}}
                    placeholder={'Chọn vai trò'} 
                  >
                    <Option key = {1} value={1}>Lãnh đạo đơn vị</Option>
                    <Option key = {2} value={2}>Trưởng phòng</Option>
                    <Option key = {3} value={3}>Chuyên viên</Option>
              </Select>
        </Item>
        <Item label="Quản trị đơn vị" name='QuanTriDonVi'  valuePropName="checked" {...ITEM_LAYOUT_SMALL}>
          <Checkbox />
        </Item>
        <Item label="Xem tài liệu mật"   name='XemTaiLieuMat'  valuePropName="checked" {...ITEM_LAYOUT_SMALL}>
          <Checkbox/>
        </Item>
        <Item label="Trạng thái" name={'TrangThaiID'} rules={[{...REQUIRED}]}  {...ITEM_LAYOUT_SMALL}>
               <Select
                    style = {{width : '100%'}}
                    placeholder={'Chọn trạng thái'} 
                  >
                    <Option key = {1} value={1}>Nghỉ hưu</Option>
                    <Option key = {0} value={0}>Đang làm</Option>
                    <Option key = {2} value={2}>Chuyển công tác</Option>
                    <Option key = {3} value={3}>Nghỉ việc</Option>
              </Select>
        </Item>
      </Form>
    </Modal>
  );
}
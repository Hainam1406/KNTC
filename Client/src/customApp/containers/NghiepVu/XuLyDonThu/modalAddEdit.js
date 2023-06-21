// import React, { useEffect } from "react";
// import { ITEM_LAYOUT, REQUIRED } from "../../../../settings/constants";
// import { Form, Radio, Row, Col, DatePicker, Upload } from "antd";
// import {
//   Button,
//   Modal,
//   Input,
//   Select,
//   Option,
// } from "../../../../components/uielements/exportComponent";
// import { checkInputNumber } from "../../../../helpers/utility";
// import TextArea from "antd/lib/input/TextArea";
// import { InputFormatSpecific } from "../../../../components/uielements/exportComponent";
// const { Item, useForm } = Form;

// export default (props) => {
//   const [form] = useForm();
//   const { dataEdit, loading, visible, action } = props;

//   useEffect(() => {
//     if (dataEdit && dataEdit.DanTocID) {
//       form &&
//         form.setFieldsValue({
//           ...dataEdit,
//           TrangThai: dataEdit.TrangThai ? 1 : 0,
//         });
//     }
//   }, []);
//   const onChange = (e) => {
//     console.log(`radio = ${e.target.value}`);
//   };
//   const onOk = async (e) => {
//     e.preventDefault();
//     const value = await form.validateFields();
//     console.log(value);
//     // props.onCreate({
//     //   ...value,
//     //   TrangThai: Boolean(value.TrangThai),
//     // });
//   };

//   const onUpLoad = ({ file, fileList }) =>{
//     if (file.status !== 'uploading') {
//       console.log(file, fileList);
//     }
//   }

//   return (
//     <Modal
//       title={`${action === "edit" ? "Sửa" : "Thêm"} thông tin dân tộc`}
//       width={450}
//       visible={visible}
//       onCancel={props.onCancel}
//       footer={[
//         <Button key="back" onClick={props.onCancel}>
//           Hủy
//         </Button>,
//         <Button
//           key="submit"
//           htmlType="submit"
//           type="primary"
//           form="formquoctich"
//           loading={loading}
//           onClick={onOk}
//         >
//           Lưu
//         </Button>,
//       ]}
//     >
//       <Form
//         form={form}
//         name={"formdantoc"}
//         initialValues={{
//           TrangThai: 1,
//         }}
//       >
//         {action === "edit" ? <Item name={"DanTocID"} hidden /> : ""}
//         <Item
//           label="Ngày hết hạn"
//           name={"NgayHetHan"}
//           {...ITEM_LAYOUT}
//           rules={[REQUIRED]}
//         >
//           <DatePicker/>
//           {/* <InputFormatSpecific /> */}
//         </Item>
//         {/* <Item
//           label="Chọn cán bộ"
//           name={"CanBo"}
//           {...ITEM_LAYOUT}
//           rules={[REQUIRED]}
//         >
//           <Select placeholder = "Chọn cán bộ"></Select>
//         </Item> */}
//         <Item label="Ghi Chú" name={"GhiChu"} {...ITEM_LAYOUT}>
//           <TextArea showCount placeholder="Không quá 350 kí tự" maxLength={350} />
//         </Item>
//         <Item label="File đính kèm" name={"FileDinhKem"} {...ITEM_LAYOUT}>
//           <Upload onChange={onUpLoad}>
//             <Button>Upload</Button>
//           </Upload>
//           {/* <TextArea /> */}
//         </Item>
//         {/* <Item label="Đang sử dụng" name={"TrangThai"} {...ITEM_LAYOUT}>
//           <Radio.Group name="radiogroup" onChange={onChange}>
//             <Radio value={1}>Có</Radio>
//             <Radio value={0}>Không</Radio>
//           </Radio.Group>
//         </Item> */}
//       </Form>
//     </Modal>
//   );
// };

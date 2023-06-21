import React, { useEffect, useRef, useState } from 'react';
import { ITEM_LAYOUT2, ITEM_LAYOUT_SMALL_2, REQUIRED } from '../../../../settings/constants';
import { Form, Radio } from 'antd';
import { Button, Modal, Input, Select, Option } from '../../../../components/uielements/exportComponent';
import { checkInputNumber } from '../../../../helpers/utility';
import TextArea from 'antd/lib/input/TextArea';

const { Item, useForm } = Form;

export default (props) => {
    const myRef = useRef(null);
    const [form] = useForm();
    const { dataEdit, loading, visible, action } = props;

    const [value1, setValue1] = useState();
    useEffect(() => {
        if (myRef && myRef.current) {
            const { input } = myRef.current;
            input.focus();
        }
        if (dataEdit && dataEdit.ChucVuID) {
            form &&
                form.setFieldsValue({
                    ...dataEdit,
                });
        }
    }, []);
    const onChange1 = (e) => {
        setValue1(e.target.value);
    };
    const onOk = async (e) => {
        e.preventDefault();
        const value = await form.validateFields();
        props.onCreate(value);
    };

    return (
        <Modal
            title={`${action === 'edit' ? 'Sửa' : 'Thêm'} thông tin chức vụ`}
            width={450}
            visible={visible}
            onCancel={props.onCancel}
            footer={[
                <Button key="back" onClick={props.onCancel}>
                    Hủy
                </Button>,
                <Button key="submit" htmlType="submit" type="primary" form="formmonhoc" loading={loading} onClick={onOk}>
                    Lưu
                </Button>,
            ]}
        >
            <Form form={form} name={'formmonhoc'}>
                {action === 'edit' ? <Item name={'ChucVuID'} hidden /> : ''}
                <Item label="Mã chức vụ" name={'MaChucVu'} {...ITEM_LAYOUT2}>
                    <Input ref={myRef} />
                </Item>
                <Item label="Tên chức vụ" name={'TenChucVu'} {...ITEM_LAYOUT2}>
                    <Input />
                </Item>
                <Item label="Ghi chú" name={'GhiChu'} {...ITEM_LAYOUT2}>
                    <TextArea />
                </Item>
                <Item label="Đang sử dụng" name={'TrangThai'} {...ITEM_LAYOUT2}>
                    <Radio.Group onChange={onChange1} value={value1}>
                        <Radio value={true}>Có</Radio>
                        <Radio value={false}>Không</Radio>
                    </Radio.Group>
                </Item>
            </Form>
        </Modal>
    );
};

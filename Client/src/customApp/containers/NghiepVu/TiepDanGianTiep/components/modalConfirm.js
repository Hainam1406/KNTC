import { Button } from "../../../../../components/uielements/exportComponent";
import Modal from "../../../../../components/uielements/modal";
import { ConfirmText } from "../styled";
import { CheckOutlined, StopOutlined } from "@ant-design/icons";

function ModalConfirm({
    title = "title",
    content = "content",
    onCancel,
    onOk,
    isLoading,
    ...props
}) {
    return (
        <Modal
            title={title}
            onOk={onOk}
            onCancel={onCancel}
            {...props}
            footer={[
                <Button
                    key="submit"
                    icon={<CheckOutlined />}
                    onClick={onOk}
                    loading={isLoading}
                    type="primary"
                >
                    Có
                </Button>,
                <Button key="back" icon={<StopOutlined />} onClick={onCancel}>
                    Không
                </Button>,
            ]}
        >
            <ConfirmText>{content}</ConfirmText>
        </Modal>
    );
}

export default ModalConfirm;

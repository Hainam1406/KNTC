import { Form } from "antd";
import { FormItemWithMessage, FormItemWrapper } from "./styles/form.style";

export const FormItem = FormItemWrapper(Form.Item);

export const LabelWithMessage = ({ message, children, onClick, ...rest }) => {
    return (
        <FormItemWithMessage {...rest}>
            {children}
            <span className="label__message" onClick={onClick}>
                {message}
            </span>
        </FormItemWithMessage>
    );
};

export default Form;

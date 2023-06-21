import styled from "styled-components";
import { palette } from "styled-theme";

export const FormItemWrapper = (ComponentName) => styled(ComponentName)``;

export const FormItemWithMessage = styled.div`
    position: relative;

    & .label__message {
        position: absolute;
        top: 0;
        right: 0;
        font-size: inherit;
        cursor: pointer;
        user-select: none;
        color: ${(props) => props.color || palette("color", 14)};
    }
`;

import { Button } from "../../../../components/uielements/exportComponent";
import styled from "styled-components";

const Wrapper = styled.div`
  .main-boxFilter {
    display: flex;
    align-items: center;
    .main-boxFilter__item {
      display: flex;
      align-items: center;
      p {
        margin-right: 5px;
      }
      input {
        flex-basis: content;
        /* flex-grow: 1;
                flex-shrink: 1;
                flex-basis: auto; */
      }
      .ant-checkbox-wrapper {
        display: flex;
        align-items: center;
      }
    }
    .main-boxFilter__item + .main-boxFilter__item {
      margin-left: 20px;
    }
  }
`;

export const FooterPageAction = styled.div`
  background-color: #fa8c16;
  padding: 10px;
  text-align: center;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

export const ButtonSave = styled(Button)`
font-family: 'Roboto', sans-serif;
  min-width: 100px;
  position: relative;

  // &::after {
  //     content: "Ctrl + S";
  //     position: absolute;
  //     top: 2px;
  //     right: 2px;
  //     font-size: 10px;
  //     background: ${(props) => props.bgcolor || "#fa8c16"};
  //     color: ${(props) => props.color || "#fff"};
  //     padding: 1px 3px;
  //     border-radius: 4px;
  // }

  &::after {
    content: "Ctrl + S";
    position: absolute;
    top: 0;
    left: 0;
    transform: rotate(270deg) translate(4%, -250%);
    transform-origin: 100% 0;
    font-size: 8px;
    background: ${(props) => props.bgcolor || "#fa8c16"};
    color: ${(props) => props.color || "#fff"};
    padding: 1px 4px;
    border-radius: 4px;
  }
`;

export const ButtonSavePrint = styled(Button)`

font-family: 'Roboto', sans-serif;
  min-width: 100px;
  position: relative;

  // &::after {
  //     content: "Ctrl + S";
  //     position: absolute;
  //     top: 2px;
  //     right: 2px;
  //     font-size: 10px;
  //     background: ${(props) => props.bgcolor || "#fa8c16"};
  //     color: ${(props) => props.color || "#fff"};
  //     padding: 1px 3px;
  //     border-radius: 4px;
  // }

  &::after {
    content: "Ctrl + P";
    position: absolute;
    top: 0;
    left: 0;
    transform: rotate(270deg) translate(4%, -250%);
    transform-origin: 100% 0;
    font-size: 8px;
    background: ${(props) => props.bgcolor || "#fa8c16"};
    color: ${(props) => props.color || "#fff"};
    padding: 1px 4px;
    border-radius: 4px;
  }
`;

export const ButtonCancelPrimary = styled(Button)`

font-family: 'Roboto', sans-serif;
  background-color: #fa8c16 !important;
  border: none !important;
  padding-left: 30px;
  padding-right: 30px;

  // &::after {
  //     content: "Ctrl + H";
  //     position: absolute;
  //     top: 2px;
  //     right: 2px;
  //     font-size: 10px;
  //     background: #2878d7;
  //     color: #fff;
  //     padding: 1px 3px;
  //     border-radius: 4px;
  // }

  &::after {
    content: "Ctrl + H";
    position: absolute;
    top: 0;
    left: 0;
    transform: rotate(270deg) translate(0%, -235%);
    transform-origin: 100% 0;
    font-size: 8px;
    background: ${(props) => props.bgcolor || "#2878d7"};
    color: ${(props) => props.color || "#fff"};
    padding: 1px 3px;
    border-radius: 4px;
  }
`;
export const ButtonCancelForm = styled(Button)`

font-family: 'Roboto', sans-serif;
  border: none !important;
  background-color: ${(props) => props.bgcolor || "#cf1322"} !important;
  color: ${(props) => props.color || "#fff"};
`;

export const ButtonCancel = styled(ButtonCancelPrimary)`

font-family: 'Roboto', sans-serif;
  background-color: #ffffff !important;
  color: #fa8c16 !important;
  padding: 4px 20px;
`;

export default Wrapper;

import { useState, useEffect } from "react";
import Radio, { RadioGroup } from "../../../../components/uielements/radio";
import {
    PanelBoxWrapper,
    PanelBoxHeader,
    PanelBoxBody,
    PanelBoxLabel,
    PanelBoxSectionWrapper,
} from "./styled";

export function PanelBoxSection({ title, children, ...props }) {
    return (
        <PanelBoxSectionWrapper {...props}>
            {title && <PanelBoxLabel>{title}:</PanelBoxLabel>}
            {children}
        </PanelBoxSectionWrapper>
    );
}

function PanelBox({
    children,
    isShowHeader = true,
    headerText = "",
    radioGroupName = "radioGroupName",
    radioData = [],
    onChangeRadio,
}) {
    const [radioActive, setRadioActive] = useState({
        name: radioGroupName,
        value: 1,
    });

    useEffect(() => {
        typeof onChangeRadio == "function" && onChangeRadio(radioActive);
    }, [radioActive]);

    const handleChangeRadio = (event) => {
        let { name, value } = event.target;
        setRadioActive({
            name,
            value,
        });
    };

    return (
        <PanelBoxWrapper>
            {isShowHeader && typeof isShowHeader == "boolean" && (
                <PanelBoxHeader>
                    <span className="panel-box-header__text">
                        {headerText}:
                    </span>
                    <RadioGroup
                        onChange={handleChangeRadio}
                        value={radioActive.value}
                        name={radioGroupName}
                        className="panel-box-header__radio-group"
                    >
                        {radioData &&
                            radioData.map((item, index) => (
                                <Radio
                                    key={index}
                                    value={index + 1}
                                    className="panel-box-header__radio"
                                >
                                    {item}
                                </Radio>
                            ))}
                    </RadioGroup>
                </PanelBoxHeader>
            )}

            <PanelBoxBody>{children}</PanelBoxBody>
        </PanelBoxWrapper>
    );
}

export default PanelBox;

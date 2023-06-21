import { useState, useEffect } from "react";
import Radio, { RadioGroup } from "../../../../../components/uielements/radio";
import {
    PanelBoxWrapper,
    PanelBoxHeader,
    PanelBoxBody,
    PanelBoxLabel,
    PanelBoxSectionWrapper,
} from "../styled";

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
    disabled,
}) {
    const [radioActive, setRadioActive] = useState({
        name: radioGroupName,
        value: radioData[0]?.value || 1,
    });

    useEffect(() => {
        typeof onChangeRadio == "function" && onChangeRadio(radioActive);
    }, [radioActive]);

    const handleChangeRadio = (event) => {
        let { name, value } = event.target;
        let radioActive = radioData.find((item) => item.value === value);
        setRadioActive(radioActive);
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
                        disabled={disabled}
                    >
                        {radioData &&
                            radioData.map((item, index) => (
                                <Radio
                                    key={index}
                                    value={item.value}
                                    className="panel-box-header__radio"
                                >
                                    {item.label}
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

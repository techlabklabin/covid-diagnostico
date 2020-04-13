import React, {useState} from 'react';
import { Checkbox, Tag, Radio } from 'antd';
import styled from 'styled-components';
import { grey, blue } from '@ant-design/colors';

const { CheckableTag } = Tag;

const StyledRadio = styled(Radio.Button)`
    width: 100%;
    background-color: ${grey[0]};
    border-color: ${grey[3]};
    color: white !important;
    height: 40px;
    padding: 0 15px;
    font-size: 16px;
    vertical-align: top;
    line-height: 38px;
    box-shadow: none !important;

    :hover {
        opacity: 0.85 !important;
    }

    &.ant-radio-button-wrapper-checked {
        background-color: ${blue.primary} !important;
        border-color: ${blue[9]} !important;
    }

    :first-child {
        border-radius: 4px 0 0 4px;
        border-left: 1px solid;
        border-left-color: ${grey[3]};

        &.ant-radio-button-wrapper-checked {
            border-left-color: ${grey[3]};
        }
    }

    :not(:first-child)::before {
        background-color: ${grey[3]};
    }

    &.ant-radio-button-wrapper-checked::before {
        background-color: ${blue[9]} !important;
        opacity: 1 !important;
    }
`;

const StyledCheckbox = styled(Checkbox)`
    width: 100%;
    margin-left: 0 !important;
    border-radius: 0 !important;
    position: relative;

    :hover {
        opacity: 0.85 !important;
    }

    > span {
        padding: 0;
    }

    .ant-tag-checkable {
        width: 100%;
        height: 40px;
        padding: 0 15px;
        font-size: 16px;
        vertical-align: top;
        line-height: 38px;
        position: relative;
        margin-right: 0;
        cursor: pointer;
        color: white !important;
        background-color: ${props => !props.checked && grey[0]};
        border-radius: 4px !important;
        border-left: 0 !important;
        border-top-width: 1.02px;
        border-color: ${props => !props.checked ? `${grey[3]} !important` : `${blue[9]} !important`};
    }

    :not(:first-child)::before {
        position: absolute;
        top: 0;
        left: -1px;
        display: block;
        width: 1px;
        height: 100%;
        background-color: ${props => !props.checked ? grey[3] : blue[9]};
        content: '';
    }
    :first-child {
        .ant-tag-checkable {
            border-radius: 4px 0 0 4px;
            border-left: 1px solid !important;
            border-left-color: ${props => !props.checked ? `${grey[3]} !important` : `${blue[9]} !important`};
        }
    }
    :last-of-type {
        .ant-tag-checkable {
            border-radius: 0 0 4px 0;
        }
    }
    .ant-checkbox-inner {
        display: none;
    }
    input[type='checkbox'], .ant-checkbox-wrapper {
        visibility: hidden;
        width: 0;
        height: 0;
    }
`;

const Chkbox = ({value, label, name, onChange}) => {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <StyledCheckbox
                value={value}
                checked={isChecked}
                onChange={e => {
                    setIsChecked(!isChecked);
                    onChange(e);
                }}
                name={`${name}`}
        >
            <CheckableTag
                size="large"
                checked={isChecked}
                // onChange={() => setIsChecked(!isChecked)}
            >
                {label}
            </CheckableTag>
        </StyledCheckbox>
    );
};

const Rdo = ({value, label, onChange}) => {
    return (
        <StyledRadio
            value={value}
            onChange={onChange}
        >
            {label}
        </StyledRadio>
    );
};

const CheckboxButton = ({value, label, name, onChange, radio}) => {
    return !radio
        ? <Chkbox value={value} label={label} name={name} onChange={onChange} />
        : <Rdo value={value} label={label} onChange={onChange} />
}

export default CheckboxButton;
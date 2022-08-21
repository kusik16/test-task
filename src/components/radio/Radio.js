import PropTypes from "prop-types";
import React from "react";

import "./radio.scss";

const Radio = ({ selected, onChange, text, value }) => {
    return (
        <div
            className='modern-radio-container'
            onClick={() => {
                onChange(value);
            }}>
            <div
                className={`radio-outer-circle ${
                    value !== selected && "unselected"
                }`}>
                <div
                    className={`radio-inner-circle ${
                        value !== selected && "unselected-circle"
                    }`}
                />
            </div>
            <div className='helper-text'>{text}</div>
        </div>
    );
};

export default Radio;

Radio.propTypes = {
    text: PropTypes.node.isRequired,
    onChange: PropTypes.func.isRequired,
    selected: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

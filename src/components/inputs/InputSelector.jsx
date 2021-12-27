import React from 'react';
import PropTypes from 'prop-types';
import { TYPE } from '../../constants/inputs';
import Input from './Input';

/**
 * Renders a wrapped input component based on inputType.
 * Designed for dynamic input creation (For example via fetching from an API).
 */
const InputSelector = ({ inputType, ...rest }) => {
  switch (inputType) {
    case TYPE.text:
    case TYPE.number:
      return <Input {...rest} />;
    default:
      return <Input {...rest} />;
  }
};

InputSelector.propTypes = {
  inputType: PropTypes.oneOf(Object.values(TYPE)),
};

export default InputSelector;

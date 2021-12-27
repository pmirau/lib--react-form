import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './Input.module.scss';

const Input = ({
  type = 'text',
  autoComplete = 'on',
  id,
  value,
  placeholder,
  error,
  disabled,
  onChange,
  onBlur,
}) => {
  return (
    <input
      className={cn(
        styles.input,
        {
          [styles.input_hasError]: !!error,
          [styles.input_isDisabled]: disabled,
        },
      )}
      id={id}
      type={type}
      name={id}
      value={value}
      placeholder={placeholder}
      autoComplete={autoComplete}
      disabled={disabled}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  placeholder: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Input;

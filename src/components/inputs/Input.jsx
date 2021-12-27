import PropTypes from 'prop-types';
import Wrap from './wrap/Wrap';
import Label from './fragments/Label';
import InputCore from './core/Input';
import Error from './fragments/Error';

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
  label,
}) => {
  return (
    <Wrap>
      {label && <Label htmlFor={id} hasError={!!error} disabled={disabled}>{label}</Label>}
      <InputCore
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        error={error}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <Error>{error}</Error>}
    </Wrap>
  );
};

Input.propTypes = {
  ...InputCore.propTypes,
  label: PropTypes.string,
};

export default Input;

import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './Label.module.scss';

const Label = ({ htmlFor, hasError, disabled, children }) => {
  return (
    <label
      className={cn(
        styles.label,
        {
          [styles.label_hasError]: hasError,
          [styles.label_isDisabled]: disabled,
        },
      )}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  hasError: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Label;

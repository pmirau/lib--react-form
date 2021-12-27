import PropTypes from 'prop-types';
import styles from './Error.module.scss';

const Error = ({ children }) => {
  return (
    <div className={styles.error}>
      {children}
    </div>
  );
};

Error.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Error;

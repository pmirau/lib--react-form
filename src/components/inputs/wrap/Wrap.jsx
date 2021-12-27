import PropTypes from 'prop-types';
import styles from './Wrap.module.scss';

const Wrap = ({ children }) => {
  return (
    <div className={styles.wrap}>
      {children}
    </div>
  );
};

Wrap.propTypes = {
  children: PropTypes.node,
};

export default Wrap;

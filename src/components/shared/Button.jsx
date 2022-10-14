import PropTypes from "prop-types";

Button.defaultProps = {
  version: 'primary',
  type: 'button',
  isDisabled: false,
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  version: PropTypes.string,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
}

function Button({ children, version, isDisabled, onClick }) {
  return (
    <button
      disabled={ isDisabled }
      className={ `btn btn-${ version }` }
      onClick={ onClick }>
      { children }
    </button>
  );
}

export default Button;
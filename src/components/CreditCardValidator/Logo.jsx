import PropTypes from 'prop-types';

const Logo = (props) => { //eslint-disable-line
  return (
    props.showClear ?
      <img className="ccvLogo clear" src="./static/images/clear.svg" alt="" onClick={()=>props.fnClearNumber()} /> : //eslint-disable-line
      <img className="ccvLogo brand" src={`./static/images/${props.imgSrc}`} alt="" />
  );
};

Logo.propTypes = {
  showClear: PropTypes.bool.isRequired,
  imgSrc: PropTypes.string.isRequired,
  fnClearNumber: PropTypes.func.isRequired,
};
export default Logo;

/* eslint-disable react/prop-types */
const ButtonBack = ({ style = {} }) => {
  const handleClick = () => {
    window.history.back();
  };

  return (
    <button className="btn btn-danger" style={style} onClick={handleClick}>
      Cancel
    </button>
  );
};

export default ButtonBack;

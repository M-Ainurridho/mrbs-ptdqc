/* eslint-disable react/prop-types */
const Textarea = ({ text, defaultValue = "", name, onValueChange }) => {
  const handleValueChange = (e) => {
    onValueChange(e);
  };

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label fw-bold">
        {text}
      </label>
      <textarea
        className="form-control"
        rows="3"
        defaultValue={defaultValue}
        id={name}
        name={name}
        onChange={handleValueChange}
      ></textarea>
    </div>
  );
};

export default Textarea;

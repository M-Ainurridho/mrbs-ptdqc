import clsx from "clsx";

/* eslint-disable react/prop-types */
const InputText = ({
  text,
  defaultValue = "",
  name,
  onValueChange,
  className = "",
}) => {
  const handleValueChange = (e) => {
    onValueChange(e);
  };

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label fw-bold">
        {text}
      </label>
      <input
        type="text"
        className={clsx("form-control", className)}
        defaultValue={defaultValue}
        id={name}
        name={name}
        onChange={handleValueChange}
      />
    </div>
  );
};

export default InputText;

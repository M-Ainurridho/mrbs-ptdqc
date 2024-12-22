/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import clsx from "clsx";

const InputDate = ({
  text,
  name,
  onValueChange,
  defaultValue = "",
  min = "",
  max = "",
  className = "",
}) => {
  const handleValueChange = (e) => {
    onValueChange(e);
  };
  return (
    <div className={clsx("mb-3", className)}>
      <label htmlFor="startRecur" className="form-label fw-bold">
        {text}
      </label>
      <input
        type="date"
        className="form-control"
        id={name}
        defaultValue={defaultValue}
        min={min}
        max={max}
        name={name}
        onChange={handleValueChange}
      />
    </div>
  );
};

export default InputDate;

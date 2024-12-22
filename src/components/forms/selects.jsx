/* eslint-disable react/prop-types */
import clsx from "clsx";

const SelectField = ({
  text,
  name,
  children,
  defaultValue = "",
  onValueChange,
  className = "",
  disabled = "",
}) => {
  const handleValueChange = (e) => {
    onValueChange(e);
  };

  return (
    <div className={clsx("mb-3", className)}>
      <label htmlFor={name} className="form-label fw-bold">
        {text}
      </label>
      <select
        className="form-select"
        name={name}
        disabled={disabled}
        onChange={handleValueChange}
        defaultValue={defaultValue}
      >
        {children}
      </select>
    </div>
  );
};

export const SelectOption = ({ value, label }) => {
  return <option value={value}>{label}</option>;
};

export default SelectField;

/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import clsx from "clsx";
import Label from "./label";

const SelectField = ({
  text,
  name,
  children,
  onValueChange,
  className = "",
  disabled = "",
  errors = [],
  required = false,
}) => {
  const handleValueChange = (e) => {
    onValueChange(e);
  };

  const isInvalid =
    errors.length > 0 &&
    errors.map((error) => error.path == name && "is-invalid");

  return (
    <div className={clsx("mb-3", className)}>
      <Label htmlFor={name} text={text} required={required} />
      <select
        className={clsx("form-select", isInvalid)}
        name={name}
        id={name}
        disabled={disabled}
        onClick={handleValueChange}
      >
        {children}
      </select>

      {errors.length > 0 &&
        errors.map(
          (error, i) =>
            error.path == name && (
              <div key={i} className="invalid-feedback">
                {error.msg}
              </div>
            )
        )}
    </div>
  );
};

export const SelectOption = ({ value, label, selected = "" }) => {
  return (
    <option value={value} selected={selected}>
      {label}
    </option>
  );
};

export default SelectField;

import clsx from "clsx";
import Label from "./label";

/* eslint-disable react/prop-types */
const InputText = ({
  text,
  type = "text",
  defaultValue = "",
  name,
  onValueChange,
  className = "",
  errors = [],
  autoComplete = "off",
  required = false,
}) => {
  const handleValueChange = (e) => {
    onValueChange(e);
  };

  const isInvalid =
    errors.length > 0 &&
    errors.map((error) => error.path == name && "is-invalid");

  return (
    <div className="mb-3">
      <Label htmlFor={name} text={text} required={required} />
      <input
        type={type}
        className={clsx("form-control", isInvalid, className)}
        defaultValue={defaultValue}
        id={name}
        name={name}
        onChange={handleValueChange}
        autoComplete={autoComplete}
      />
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

export const InputHidden = ({ defaultValue = "", className = "" }) => {
  return (
    <div className="mb-3">
      <input
        type="hidden"
        className={clsx("form-control", className)}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default InputText;

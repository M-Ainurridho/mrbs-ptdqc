/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import clsx from "clsx";
import Label from "./label";

const InputDate = ({
  text,
  name,
  onValueChange,
  defaultValue = "",
  min = "",
  max = "",
  className = "",
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
      <input
        type="date"
        className={clsx("form-control", isInvalid)}
        id={name}
        defaultValue={defaultValue}
        min={min}
        max={max}
        name={name}
        onChange={handleValueChange}
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

export const InputEndDate = ({
  name,
  text,
  form,
  errors = [],
  onValueChange,
  defaultValue = "",
  required = false,
}) => {
  const handleValueChange = (e) => {
    onValueChange(e);
  };

  const isInvalid =
    errors.length > 0 &&
    errors.map((error) => error.path == name && "is-invalid");

  return (
    <div className="row">
      <Label
        htmlFor={name}
        text={text}
        required={required}
        className="col-sm-4 col-form-label"
      />
      <div className="col-8 me-0">
        <input
          type="date"
          className={clsx("form-control", isInvalid)}
          id={name}
          name={name}
          onChange={handleValueChange}
          min={form.startRecur}
          defaultValue={defaultValue}
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
    </div>
  );
};

export default InputDate;

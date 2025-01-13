import clsx from "clsx";

const Label = ({ htmlFor, text, required, className = "" }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx("form-label fw-bold", className)}
      style={{ position: "relative" }}
    >
      {text}
      {required && <span className="text-danger">*</span>}
    </label>
  );
};

export default Label;

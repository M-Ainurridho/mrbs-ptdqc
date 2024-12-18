import clsx from "clsx";

// eslint-disable-next-line react/prop-types
const Container = ({ children, className = "" }) => {
  return <div className={clsx("container", className)}>{children}</div>;
};

export default Container;

import clsx from "clsx";
import { Children } from "react";

const Table = ({ children, className = "" }) => {
  return (
    <table className={clsx("table table-striped table-bordered", className)}>
      {children}
    </table>
  );
};

export const TableHead = ({ fields }) => {
  return (
    <thead>
      <TableRow>
        {fields.map((field) => (
          <th scope="col" key={field}>
            {field}
          </th>
        ))}
      </TableRow>
    </thead>
  );
};

export const TableBody = ({ children, className = "" }) => {
  return <tbody className={className}>{children}</tbody>;
};

export const TableRow = ({ children, className = "" }) => {
  return <tr className={className}>{children}</tr>;
};

export const TableColumn = ({ children, className = "", style = {} }) => {
  return (
    <td className={className} style={style}>
      {children}
    </td>
  );
};

export default Table;

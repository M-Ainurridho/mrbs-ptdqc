/* eslint-disable react/prop-types */
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

const Table = ({ children, className = "" }) => {
  return (
    <table
      className={clsx(
        "table table-light table-striped-columns table-hover",
        className
      )}
    >
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

export const TableRow = ({ children, className = "", path = null }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <tr
      className={className}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      {children}
    </tr>
  );
};

export const TableColumn = ({ children, className = "", style = {} }) => {
  return (
    <td className={className} style={style}>
      {children}
    </td>
  );
};

export default Table;

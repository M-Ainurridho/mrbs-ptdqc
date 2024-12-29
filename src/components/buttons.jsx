import axios from "axios";
import clsx from "clsx";
import Swal from "sweetalert2";
import { createAlert } from "../lib/utils";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const ButtonBack = ({
  style = {},
  text = "Cancel",
  className = "btn-danger",
}) => {
  const handleClick = () => {
    window.history.back();
  };

  return (
    <button
      type="button"
      className={clsx("btn", className)}
      style={style}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export const ButtonSubmit = ({ text, className = "", style = {} }) => {
  return (
    <button className={clsx("btn", className)} type="submit" style={style}>
      {text}
    </button>
  );
};

export const ButtonDeleteItem = ({
  id,
  className = "",
  style = {},
  text = "Delete",
  path = "",
}) => {
  const navigate = useNavigate();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://localhost:3001/v1/${path}/${id}`
          );

          if (response.status === 200) {
            createAlert("Deleted", "Your data has been deleted.", "success");
            navigate(`/${path}`);
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  return (
    <button
      type="button"
      style={style}
      className={clsx("btn btn-danger", className)}
      onClick={() => handleDelete(id)}
    >
      {text}
    </button>
  );
};

export default ButtonBack;

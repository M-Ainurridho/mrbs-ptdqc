import { useEffect } from "react";
import Swal from "sweetalert2";
import { getAlert, removeAlert } from "../lib/utils";

const SweetAlert = () => {
  useEffect(() => {
    const alert = localStorage.getItem("alert");

    if (alert) {
      const { title, text, icon } = getAlert();

      Swal.fire({
        title: title,
        text: text,
        icon: icon,
      });

      removeAlert();
    }
  }, []);

  return;
};

export default SweetAlert;

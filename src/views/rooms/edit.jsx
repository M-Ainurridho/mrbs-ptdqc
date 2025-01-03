/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import axios from "axios";
import Layout from "../../layout";
import Container from "../../components/container";
import InputText, { InputHidden } from "../../components/forms/input-text";
import ButtonBack, { ButtonSubmit } from "../../components/buttons";
// import SelectField, { SelectOption } from "../../../components/forms/selects";
import { createAlert, setTitle, toCapitalize } from "../../lib/utils";
import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";

const EditRoom = () => {
  setTitle("Edit Room");

  const { id } = useParams();

  const [form, setForm] = useState({
    room: "",
  });

  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusCode, setStatusCode] = useState(0);
  const navigate = useNavigate();

  const handleValueChange = debounce((e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }, 300);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.patch(
        `http://localhost:3001/v1/rooms/${id}`,
        form
      );

      if (response.data.ok) {
        createAlert("Nice!", "Successfully update room", "success");
        navigate("/rooms");
      }
    } catch (err) {
      setErrors(err.response.data.errors);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRoomById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/v1/rooms/${id}`);
      const { room } = response.data.payload.room;

      setStatusCode(response.status);
      setForm({ ...form, room });
    } catch (err) {
      if (err.status === 400) {
        navigate("/rooms");
      }
    }
  };

  useEffect(() => {
    fetchRoomById(id);
  }, []);

  return (
    <Layout>
      <Container className="my-4">
        {statusCode === 200 && (
          <div className="row">
            <div className="col-6 mx-auto">
              <h4 className="display-6 text-center mb-4">Edit Room</h4>

              <form onSubmit={handleSubmit}>
                <InputText
                  text="Room"
                  name="room"
                  type="text"
                  onValueChange={(e) => handleValueChange(e)}
                  errors={errors}
                  defaultValue={form?.room}
                />

                {/* <InputHidden defaultValue={form?.email} /> */}

                <div className="d-flex justify-content-between gap-2">
                  <ButtonBack style={{ width: "25%" }} />
                  <ButtonSubmit
                    text="Save"
                    className={clsx({
                      "btn-primary": !isLoading,
                      "btn-secondary disabled": isLoading,
                    })}
                    style={{ width: "25%" }}
                  />
                </div>
              </form>
            </div>
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default EditRoom;

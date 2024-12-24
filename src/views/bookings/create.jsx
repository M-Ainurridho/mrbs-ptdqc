import { useContext, useEffect, useState } from "react";
import Container from "../../components/container";
import Layout from "../../layout";
import currentDate from "../../lib/utils";
import ButtonBack from "../../components/buttons";
import { resources } from "../../lib/data";
import { debounce } from "lodash";
import Textarea from "../../components/forms/textarea";
import SelectField, { SelectOption } from "../../components/forms/selects";
import InputText from "../../components/forms/input-text";
import InputDate from "../../components/forms/input-date";
import InputStartTime, {
  InputEndTime,
} from "../../components/bookings/input-time";
import WeeklySelection from "../../components/bookings/weekly";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../lib/context";

const CreateBooking = () => {
  const { user } = useContext(UserContext);
  const [isRecurring, setIsReccuring] = useState(false);
  const [endTimes, setEndTimes] = useState([]);
  const [rooms, setRooms] = useState([]);
  const recurring = ["Daily", "Weekly", "Monthly"];
  const [form, setForm] = useState({
    title: "",
    startRecur: currentDate(),
    endRecur: "",
    startTime: "",
    endTime: "",
    description: "",
    resourceId: "",
    daysOfWeek: [],
    recurring: isRecurring,
    repeat: "none",
    userId: "",
  });
  const navigate = useNavigate();

  const handleValueChange = debounce((e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }, 300);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = form;
    formData.userId = user.id;
    console.log(formData);

    try {
      const response = await axios.post(
        `http://localhost:3001/v1/bookings`,
        formData
      );

      if (response.status === 200) {
        navigate("/bookings");
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleRecurring = (e) => {
    setIsReccuring(!isRecurring);

    if (!isRecurring) {
      setForm({
        ...form,
        [e.target.name]: e.target.checked,
        daysOfWeek: [1, 2, 3, 4, 5],
        repeat: "daily",
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.checked,
        daysOfWeek: [],
        endRecur: "",
        repeat: "none",
      });
    }
  };

  const handleRepeatRecurring = (e) => {
    let daysOfWeek = [];

    if (isRecurring) {
      if (e.target.value == "Daily") {
        daysOfWeek = [1, 2, 3, 4, 5];
      }
    }
    setForm({ ...form, daysOfWeek, repeat: e.target.value.toLowerCase() });
  };

  const fetchAllRooms = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/v1/rooms`);
      const { rooms } = response.data.payload;
      setForm({ ...form, resourceId: rooms[0].id });
      setRooms(rooms);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllRooms();
  }, []);

  return (
    <Layout>
      <Container className="my-4">
        <div className="row">
          <div className="col-6 mx-auto">
            <h4 className="display-6 text-center mb-4">Create Event</h4>

            <form onSubmit={handleSubmit}>
              <InputText
                text="Title"
                name="title"
                onValueChange={(e) => handleValueChange(e)}
              />
              <Textarea
                text="Full Description"
                name="description"
                onValueChange={(e) => handleValueChange(e)}
              />
              <SelectField
                text="Room"
                name="resourceId"
                onValueChange={(e) => handleValueChange(e)}
              >
                {rooms.map((room) => (
                  <SelectOption
                    value={room.id}
                    label={room.room}
                    key={room.id}
                  />
                ))}
              </SelectField>
              <div className="row">
                <InputDate
                  text="Date"
                  name="startRecur"
                  className="col-5"
                  defaultValue={currentDate()}
                  min={currentDate()}
                  onValueChange={(e) => handleValueChange(e)}
                />
                <div className="col-7">
                  <div className="row">
                    <InputStartTime
                      text="Start Time"
                      name="startTime"
                      className="col-5"
                      onValueChange={(e) => handleValueChange(e)}
                      setEndTimes={setEndTimes}
                    />
                    <InputEndTime
                      text="End Time"
                      name="endTime"
                      className="col-7"
                      onValueChange={(e) => handleValueChange(e)}
                      endTimes={endTimes}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="row">
                  <div className="col-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                        name="recurring"
                        onChange={handleRecurring}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Recurring Event?
                      </label>
                    </div>
                  </div>
                  {isRecurring && (
                    <div className="col-8">
                      <div className="row">
                        <div className="col-6">
                          {recurring.map((recurr, i) => (
                            <div className="form-check mb-1" key={i}>
                              <input
                                defaultChecked={i === 0}
                                className="form-check-input"
                                type="radio"
                                name="repeatRecur"
                                id={recurr}
                                value={recurr}
                                onChange={handleRepeatRecurring}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={recurr}
                              >
                                {recurr}
                              </label>
                            </div>
                          ))}
                        </div>
                        {form.repeat === "weekly" && (
                          <WeeklySelection form={form} setForm={setForm} />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {isRecurring && (
                <div className="mb-3">
                  <div className="row">
                    <div className="col-8">
                      <div className="row">
                        <label
                          htmlFor="endRecur"
                          className="col-sm-4 col-form-label fw-bold"
                        >
                          Repeat Until
                        </label>
                        <div className="col-8 me-0">
                          <input
                            type="date"
                            className="form-control"
                            id="endRecur"
                            name="endRecur"
                            onChange={handleValueChange}
                            min={form.startRecur}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="d-flex justify-content-between gap-2">
                <ButtonBack style={{ width: "25%" }} />
                <button
                  className="btn btn-primary"
                  type="submit"
                  style={{ width: "25%" }}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default CreateBooking;

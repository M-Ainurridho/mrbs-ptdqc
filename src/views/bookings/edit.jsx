/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import Container from "../../components/container";
import Layout from "../../layout";
import currentDate, {
  createAlert,
  dateFormat,
  setTimes,
  toCapitalize,
} from "../../lib/utils";
import ButtonBack, { ButtonSubmit } from "../../components/buttons";
import { debounce } from "lodash";
import Textarea from "../../components/forms/textarea";
import SelectField, { SelectOption } from "../../components/forms/selects";
import InputText from "../../components/forms/input-text";
import InputDate, { InputEndDate } from "../../components/forms/input-date";
import InputStartTime, {
  InputEndTime,
} from "../../components/bookings/input-time";
import WeeklySelection from "../../components/bookings/weekly";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../lib/context";
import clsx from "clsx";
import moment from "moment";
import { recurring } from "../../lib/data";

const EditBooking = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [isRecurring, setIsReccuring] = useState(false);
  const [endTimes, setEndTimes] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    startRecur: "",
    endRecur: "",
    startTime: "",
    endTime: "",
    description: "",
    resourceId: "",
    daysOfWeek: [],
    recurring: null,
    repeat: "",
  });
  const navigate = useNavigate();

  const handleValueChange = debounce((e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }, 300);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.patch(
        `http://localhost:3001/v1/bookings/${id}`,
        form
      );

        if (response.status === 200) {
          createAlert("Good job!", "Successfuly update an event", "success");
          navigate("/bookings");
        }
    } catch (err) {
      setErrors(err.response.data.errors);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndTimes = (value) => {
    const times = value.split(":");
    let hour = Number(times[0]);
    let minute = Number(times[1]);

    if (minute === 0) {
      minute = 30;
    } else {
      hour += 1;
      minute = 0;
    }

    const options = setTimes(hour, minute);
    const durations = options.map((time) => time.duration + 30).reverse();

    const dataEndTImes = options.map((time, i) => {
      for (let j = 0; j < durations.length; j++) {
        const duration = moment.duration(durations[i], "minutes");
        return {
          value: time.value,
          label: time.label,
          duration: duration.asHours(),
        };
      }
    });

    setEndTimes(dataEndTImes);
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
      if (e.target.value == "daily") {
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

  const fetchBookingById = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/v1/bookings/${id}`
      );
      const {
        title,
        description,
        startRecur,
        endRecur,
        startTime,
        endTime,
        recurring,
        repeat,
        resourceId,
        daysOfWeek,
      } = response.data.payload.booking;
      setForm({
        ...form,
        title,
        description,
        startRecur: dateFormat(startRecur),
        startTime,
        endTime,
        recurring: Boolean(recurring),
        repeat,
        resourceId,
        endRecur: recurring ? dateFormat(endRecur) : "",
        daysOfWeek:
          daysOfWeek.length > 0
            ? daysOfWeek.split(",").map((day) => Number(day))
            : [],
      });
      setIsReccuring(Boolean(recurring));
      handleEndTimes(startTime);
    } catch (err) {
      console.log(err);
    }
  };

  //   console.log(form);

  useEffect(() => {
    fetchAllRooms();
    fetchBookingById(id);
  }, []);

  return (
    <Layout>
      <Container className="my-4">
        <div className="row">
          <div className="col-6 mx-auto">
            <h4 className="display-6 text-center mb-4">Edit Event</h4>

            <form onSubmit={handleSubmit}>
              <InputText
                text="Title"
                name="title"
                defaultValue={form.title}
                onValueChange={(e) => handleValueChange(e)}
                errors={errors}
              />
              <Textarea
                text="Full Description"
                name="description"
                onValueChange={(e) => handleValueChange(e)}
                defaultValue={form.description}
              />
              <SelectField
                text="Room"
                name="resourceId"
                onValueChange={(e) => handleValueChange(e)}
                errors={errors}
              >
                {rooms.map((room) => (
                  <SelectOption
                    value={room.id}
                    label={room.room}
                    key={room.id}
                    selected={room.id == form.resourceId && "selected"}
                  />
                ))}
              </SelectField>
              <div className="row">
                <InputDate
                  text="Date"
                  name="startRecur"
                  className="col-5"
                  defaultValue={form.startRecur}
                  min={form.startRecur}
                  onValueChange={(e) => handleValueChange(e)}
                  errors={errors}
                />
                <div className="col-7">
                  <div className="row">
                    <InputStartTime
                      text="Start Time"
                      name="startTime"
                      className="col-5"
                      onValueChange={(e) => handleValueChange(e)}
                      setEndTimes={setEndTimes}
                      errors={errors}
                      defaultValue={form.startTime}
                    />
                    <InputEndTime
                      text="End Time"
                      name="endTime"
                      className="col-7"
                      onValueChange={(e) => handleValueChange(e)}
                      endTimes={endTimes}
                      errors={errors}
                      defaultValue={form.endTime}
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
                        id="recurring"
                        name="recurring"
                        onClick={handleRecurring}
                        defaultChecked={form.recurring}
                      />
                      <label className="form-check-label" htmlFor="recurring">
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
                                defaultChecked={
                                  form.repeat !== "none"
                                    ? recurr == form.repeat && true
                                    : i == 0
                                }
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
                                {toCapitalize(recurr)}
                              </label>
                            </div>
                          ))}
                        </div>
                        {form.repeat === "weekly" && (
                          <WeeklySelection
                            form={form}
                            setForm={setForm}
                            defaultValue={form.daysOfWeek}
                          />
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
                      <InputEndDate
                        form={form}
                        name="endRecur"
                        onValueChange={(e) => handleValueChange(e)}
                        errors={errors}
                        defaultValue={form.endRecur}
                      />
                    </div>
                  </div>
                </div>
              )}

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
      </Container>
    </Layout>
  );
};

export default EditBooking;

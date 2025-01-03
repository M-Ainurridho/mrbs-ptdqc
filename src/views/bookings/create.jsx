/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import Container from "../../components/container";
import Layout from "../../layout";
import currentDate, {
  createAlert,
  handleEndTimes,
  setTitle,
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
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserContext } from "../../lib/context";
import clsx from "clsx";
import { recurring } from "../../lib/data";
import Swal from "sweetalert2";

const CreateBooking = () => {
  setTitle("Create Event");

  const { user } = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isRecurring, setIsReccuring] = useState(false);
  const [endTimes, setEndTimes] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [errors, setErrors] = useState([]);
  const [conficts, setConflicts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // checking if query on search params exists
  const startRecur = searchParams?.get("startRecur") || "";
  const endRecur = searchParams?.get("endRecur") || "";
  const startTime = searchParams?.get("startTime") || "";
  const endTime = searchParams?.get("endTime") || "";
  const resourceId = searchParams?.get("resourceId") || "";

  const [form, setForm] = useState({
    title: "",
    startRecur: startRecur || currentDate(),
    endRecur: endRecur,
    startTime: startTime,
    endTime: endTime,
    description: "",
    resourceId: resourceId,
    daysOfWeek: endRecur ? [1, 2, 3, 4, 5] : [],
    recurring: endRecur ? true : isRecurring,
    repeat: endRecur ? "daily" : "none",
    userId: "",
  });
  const navigate = useNavigate();

  // handle if value has been changed | clicked
  const handleValueChange = debounce((e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }, 300);

  // handle submit form | if create button clicked
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = form;
    formData.userId = user.id;

    try {
      const response = await axios.post(
        `http://localhost:3001/v1/bookings`,
        formData
      ); // post form data

      if (response.status === 200) {
        createAlert("Good job!", "Successfully add new event", "success");
        navigate("/bookings");
      }
    } catch (err) {
      if (err.status === 409) {
        setConflicts(err.response.data.errors);
      } else {
        setErrors(err.response.data.errors); // handler error fields
      }
    } finally {
      setIsLoading(false);
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
      setForm({ ...form, resourceId: resourceId || rooms[0].id });
      setRooms(rooms);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllRooms(); // initial request

    if (startTime) {
      setEndTimes(handleEndTimes(startTime));
    }

    if (endRecur) {
      setIsReccuring(true);
      setForm({ ...form, recurring: !isRecurring });
    }
  }, []);

  const confictsAlert = () => {
    const eventConflicts = conficts
      .map((res) => `${res.date} ${res.duration}`)
      .join(` || `);
    Swal.fire({
      title: "Conflict Events",
      text: `Conflicts at: ${eventConflicts}`,
      icon: "error",
    });
    setConflicts([]);
  };

  return (
    <Layout>
      <Container className="my-4">
        <div className="row">
          <div className="col-6 mx-auto">
            <h4 className="display-6 text-center mb-4">Create Event</h4>

            {conficts.length > 0 && confictsAlert()}

            <form onSubmit={handleSubmit}>
              <InputText
                text="Title"
                name="title"
                onValueChange={(e) => handleValueChange(e)}
                errors={errors}
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
                        id="flexCheckDefault"
                        name="recurring"
                        defaultChecked={endRecur && true}
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
                                {toCapitalize(recurr)}
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
                  text="Create"
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

export default CreateBooking;

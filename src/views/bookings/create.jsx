import { useEffect, useState } from "react";
import Container from "../../components/container";
import Layout from "../../layout";
import moment from "moment";

const CreateBooking = () => {
  const [timeOptions, setTimeOptions] = useState([]);
  const [isRecurring, setIsReccuring] = useState(false);
  const [startTimes, setStartTimes] = useState([]);
  const [timeSelected, setTimeSelected] = useState("");
  const recurring = ["Daily", "Weekly", "Monthly"];

  const endTime = moment().endOf("day").set({ hour: 17, minute: 0 });

  useEffect(() => {
    const options = [];
    const startTime = moment().startOf("day").set("hour", 8);

    while (startTime <= endTime) {
      options.push({
        value: startTime.format("HH:mm"),
        label: startTime.format("HH:mm"),
      });
      startTime.add(30, "minutes");
    }

    setStartTimes(options);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleRecurring = (e) => {
    setIsReccuring(!isRecurring);
  };

  const handleStartTime = (e) => {
    console.log(e.target.value);
  };

  const handleChange = () => {};

  return (
    <Layout>
      <Container className="my-4">
        <div className="row">
          <div className="col-6 mx-auto">
            <h4 className="display-6 text-center mb-4">Create Event</h4>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label fw-bold">
                  Title
                </label>
                <input type="title" className="form-control" id="title" />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label fw-bold">
                  Full Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                ></textarea>
              </div>
              <div className="mb-3">
                <div className="row">
                  <div className="col-8">
                    <div className="row">
                      <div className="col-2">
                        <label
                          htmlFor="start-date"
                          className="col-sm-2 col-form-label fw-bold"
                        >
                          Start
                        </label>
                      </div>
                      <div className="col-sm-10 me-0">
                        <input
                          type="date"
                          className="form-control"
                          id="start-date"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={handleStartTime}
                    >
                      <option>--:-- --</option>
                      {startTimes.length > 0 &&
                        startTimes.map((time) => (
                          <option value={time.label} key={time.label}>
                            {time.value}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <div className="row">
                  <div className="col-8">
                    <div className="row">
                      <div className="col-2">
                        <label
                          htmlFor="end-date"
                          className="col-sm-2 col-form-label fw-bold"
                        >
                          End
                        </label>
                      </div>
                      <div className="col-sm-10 me-0">
                        <input
                          type="date"
                          className="form-control"
                          id="end-date"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <select className="form-select">
                      <option>--:-- --</option>
                      {startTimes.length > 0 &&
                        startTimes.map((time) => (
                          <option value={time.label} key={time.label}>
                            {time.value}
                          </option>
                        ))}
                    </select>
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
                        onChange={handleRecurring}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Reccuring Event?
                      </label>
                    </div>
                  </div>
                  {isRecurring && (
                    <div className="col-8">
                      {recurring.map((recurr, i) => (
                        <div className="form-check" key={i}>
                          <input
                            defaultChecked={i === 0}
                            className="form-check-input"
                            type="radio"
                            name="recurringEvent"
                            id={recurr}
                            value={recurr}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={recurr}
                            value={recurr}
                          >
                            {recurr}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-between gap-2">
                <button
                  className="btn btn-danger"
                  type="reset"
                  style={{ width: "25%" }}
                >
                  Cancel
                </button>
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

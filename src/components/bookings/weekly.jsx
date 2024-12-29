/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { dayNumber } from "../../lib/utils";

const WeeklySelection = ({ form, setForm, defaultValue = [] }) => {
  const today = dayNumber(new Date().getDay());
  const [days, setDays] = useState([
    {
      checked: null,
      num: 1,
      day: "Monday",
    },
    {
      checked: null,
      num: 2,
      day: "Tuesday",
    },
    {
      checked: null,
      num: 3,
      day: "Wednesday",
    },
    {
      checked: null,
      num: 4,
      day: "Thursday",
    },
    {
      checked: null,
      num: 5,
      day: "Friday",
    },
  ]);
  const [daysOfWeek, setDaysOfWeek] = useState(
    defaultValue.length > 0 ? [...defaultValue] : [today]
  );

  const handleValueClick = (e) => {
    if (e.target.checked) {
      setDaysOfWeek([...daysOfWeek, Number(e.target.value)]);
      setForm({ ...form, daysOfWeek: [...daysOfWeek, Number(e.target.value)] });
    } else {
      const filteredCheck = daysOfWeek.filter(
        (num) => num !== Number(e.target.value)
      );
      setDaysOfWeek(filteredCheck);
      setForm({ ...form, daysOfWeek: filteredCheck });
    }
  };

  const handleDays = () => {
    const dayss = days.map((day) => {
      for (let num of defaultValue) {
        if (num == day.num) {
          return { ...day, checked: true };
        }
      }

      return { ...day, checked: false };
    });

    setDays(dayss);
  };

  useEffect(() => {
    handleDays();
  }, []);

  return (
    <div className="col-6">
      {days.map((day, i) => (
        <div className="form-check mb-1" key={i}>
          <input
            defaultChecked={
              defaultValue.length < 1 ? day.num === 1 : day.checked
            }
            className="form-check-input"
            type="checkbox"
            value={day.num}
            id={day.day}
            onClick={handleValueClick}
          />
          <label className="form-check-label" htmlFor={day.day}>
            {day.day}
          </label>
        </div>
      ))}
    </div>
  );
};

export default WeeklySelection;

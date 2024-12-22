/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { dayNumber } from "../../lib/utils";

const WeeklySelection = ({ form, setForm }) => {
  const today = dayNumber(new Date().getDay());
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [daysOfWeek, setDaysOfWeek] = useState([today]);

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

  useEffect(() => {
    setForm({ ...form, daysOfWeek: [today] });
  }, []);

  return (
    <div className="col-6">
      {days.map((day, i) => (
        <div className="form-check mb-1" key={i}>
          <input
            defaultChecked={i + 1 === today || i == 0}
            className="form-check-input"
            type="checkbox"
            value={i + 1}
            id={day}
            onClick={handleValueClick}
          />
          <label className="form-check-label" htmlFor={day}>
            {day}
          </label>
        </div>
      ))}
    </div>
  );
};

export default WeeklySelection;

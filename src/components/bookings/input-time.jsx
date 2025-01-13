/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { setTimes } from "../../lib/utils";
import moment from "moment";
import SelectField, { SelectOption } from "../forms/selects";

const InputStartTime = ({
  text,
  name,
  onValueChange,
  className = "",
  setEndTimes,
  errors = [],
  defaultValue = "",
  required = false,
}) => {
  const [startTimes, setStartTimes] = useState([]);

  useEffect(() => {
    const options = setTimes();
    setStartTimes(options);
  }, []);

  const handleValueChange = (e) => {
    onValueChange(e);
  };

  const handleStartTime = (e) => {
    if (e.target?.value) {
      const times = e.target.value.split(":");
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
    }
  };

  return (
    <SelectField
      text={text}
      name={name}
      className={className}
      onValueChange={(e) => {
        handleValueChange(e), handleStartTime(e);
      }}
      errors={errors}
      required={required}
    >
      <option value="">--:-- --</option>
      {startTimes.length > 0 &&
        startTimes.map((time, i) => (
          <SelectOption
            value={`${time.label}:00`}
            label={time.value}
            key={i}
            selected={`${time.label}:00` == defaultValue && "selected"}
          />
        ))}
    </SelectField>
  );
};

export const InputEndTime = ({
  text,
  name,
  onValueChange,
  endTimes,
  className = "",
  errors = [],
  defaultValue = "",
  required = false,
}) => {
  const handleValueChange = (e) => {
    onValueChange(e);
  };

  return (
    <SelectField
      text={text}
      name={name}
      className={className}
      disabled={endTimes.length < 1 && "disabled"}
      onValueChange={(e) => handleValueChange(e)}
      errors={errors}
      required={required}
    >
      <option value="">--:-- --</option>
      {endTimes.length > 0 &&
        endTimes.map((time, i) => (
          <SelectOption
            key={i}
            value={`${time.label}:00`}
            label={`${time.value} (${
              time.duration === 0.5 ? "30 minutes" : `${time.duration} hours`
            })`}
            selected={`${time.label}:00` == defaultValue && "selected"}
          />
        ))}
    </SelectField>
  );
};

export default InputStartTime;

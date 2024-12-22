import moment from "moment";

const currentDate = () => {
  const date = new Date();
  return date.toISOString().split("T")[0];
};

export default currentDate;

export const setTimes = (hour = 8, minute = 0) => {
  const options = [];
  const startTime = moment().startOf("day").set({ hour, minute });
  const endTime = moment().endOf("day").set({ hour: 17, minute: 0 });

  while (startTime <= endTime) {
    options.push({
      value: startTime.format("HH:mm"),
      label: startTime.format("HH:mm"),
      duration: endTime.diff(startTime, "minutes"),
    });
    startTime.add(30, "minutes");
  }

  return options;
};

export const dayNumber = (day) => {
  switch (day) {
    case /Mon/i:
    case /Sat/i:
    case 0:
    case /Sun/i:
    case 6:
      return 1;
    case /Tue/i:
      return 2;
    case /Wed/i:
      return 3;
    case /Thu/i:
      return 4;
    case /Fri/i:
      return 5;
    default:
      return 1;
  }
};

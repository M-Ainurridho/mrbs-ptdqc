import moment from "moment";

const currentDate = () => {
  const date = new Date();
  return date.toISOString().split("T")[0];
};

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

export const numberToDay = (num) => {
  switch (num) {
    case 1:
      return "monday";
    case 2:
      return "tuesday";
    case 3:
      return "wednesday";
    case 4:
      return "thursday";
    case 5:
      return "friday";
  }
};

export const dateFormat = (date) => {
  const newDate = new Date(date).toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
  });

  const splitString = newDate.split(", ");
  const formatDate = splitString[0]
    .split("/")
    .map((day) => (day.length < 2 ? `0${day}` : day))
    .reverse()
    .join("-");
  return formatDate;
};

export const hourAndMinute = (time) => {
  const splited = time.split(":");
  splited.pop();

  return splited.join(":");
};

export const toCapitalize = (word) => {
  const firstLetter = word[0].toUpperCase();
  const exceptFirstLetter = word.slice(1);

  const newWord = firstLetter + exceptFirstLetter;
  return newWord;
};

export const createAlert = (title, text, icon) => {
  localStorage.setItem("alert", true);
  localStorage.setItem("alertTitle", title);
  localStorage.setItem("alertText", text);
  localStorage.setItem("alertIcon", icon);
};

export const getAlert = () => {
  const title = localStorage.getItem("alertTitle");
  const text = localStorage.getItem("alertText");
  const icon = localStorage.getItem("alertIcon");

  return { title, text, icon };
};

export const removeAlert = () => {
  localStorage.removeItem("alert");
  localStorage.removeItem("alertTitle");
  localStorage.removeItem("alertText");
  localStorage.removeItem("alertIcon");
};

export const handleEndTimes = (value) => {
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

  return dataEndTImes;
};

export const setTitle = (title) => {
  window.document.title = `${title} | DQC Meeting Schedule`;
};

export default currentDate;

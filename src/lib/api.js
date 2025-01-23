import axios from "axios";

const BASEURL = "http://192.168.5.37:5001/v1";
const config = {
  headers: {
    "Cache-Control": "no-store",
  },
};

// CRUD Booking
const getAllEvents = async () => {
  try {
    const response = await axios.get(`${BASEURL}/bookings`, config);
    return response.data.payload;
  } catch (err) {
    throw err;
  }
};

const getEventById = async (id) => {
  try {
    const response = await axios.get(`${BASEURL}/bookings/${id}`);
    return response.data.payload;
  } catch (err) {
    throw err;
  }
};

const getAllEventsWithLimit = async (userId, page, query) => {
  try {
    const response = await axios.get(
      `${BASEURL}/bookings/events/${userId}?page=${page}&query=${query}`,
      config
    );
    return response.data.payload;
  } catch (err) {
    throw err;
  }
};

const createBooking = async (data) => {
  try {
    const response = await axios.post(`${BASEURL}/bookings`, data);
    return response;
  } catch (err) {
    throw err;
  }
};

const updateBookingById = async (id, data) => {
  try {
    const response = await axios.patch(`${BASEURL}/bookings/${id}`, data);
    return response;
  } catch (err) {
    throw err;
  }
};

// CRUD Room
const getAllRooms = async () => {
  try {
    const response = await axios.get(`${BASEURL}/rooms`, config);
    return response.data.payload;
  } catch (err) {
    throw err;
  }
};

const getRoomById = async (id) => {
  try {
    const response = await axios.get(`${BASEURL}/rooms/${id}`);
    return response.data.payload;
  } catch (err) {
    throw err;
  }
};

const getAllRoomsWithLimit = async (page, query) => {
  try {
    const response = await axios.get(
      `${BASEURL}/rooms?page=${page}&query=${query}`,
      config
    );
    return response.data.payload;
  } catch (err) {
    throw err;
  }
};

const createRoom = async (data) => {
  try {
    const response = await axios.post(`${BASEURL}/rooms`, data);
    return response;
  } catch (err) {
    throw err;
  }
};

const updateRoomById = async (id, data) => {
  try {
    const response = await axios.patch(`${BASEURL}/rooms/${id}`, data);
    return response;
  } catch (err) {
    throw err;
  }
};

// CRUD User
const getAllUsersWithLimit = async (page, query) => {
  try {
    const response = await axios.get(
      `${BASEURL}/users?page=${page}&query=${query}`,
      config
    );
    return response.data.payload;
  } catch (err) {
    throw err;
  }
};

const getUserById = async (id) => {
  try {
    const response = await axios.get(`${BASEURL}/users/${id}`);
    return response.data.payload;
  } catch (err) {
    throw err;
  }
};

const createUser = async (data) => {
  try {
    const response = await axios.post(`${BASEURL}/users`, data);
    return response;
  } catch (err) {
    throw err;
  }
};

const updateUserById = async (id, data) => {
  try {
    const response = await axios.patch(`${BASEURL}/users/${id}`, data);
    return response;
  } catch (err) {
    throw err;
  }
};

// CRUD Role
const getAllRoles = async () => {
  try {
    const response = await axios.get(`${BASEURL}/users/roles`, config);
    return response.data.payload;
  } catch (err) {
    throw err;
  }
};

// CRUD Auth
const getExchangeToken = async (token) => {
  try {
    const response = await axios.post(`${BASEURL}/users/exchangetoken`, {
      token,
    });
    return response;
  } catch (err) {
    throw err;
  }
};

const signInAuthentication = async (form) => {
  try {
    const response = await axios.post(`${BASEURL}/users/login`, form);
    console.log(response);
    return response.data.payload;
  } catch (err) {
    throw err;
  }
};

// Utils
const deleteItem = async (path, id) => {
  try {
    const response = await axios.delete(`${BASEURL}/${path}/${id}`);
    return response;
  } catch (err) {
    throw err;
  }
};

const generatePDF = async (date) => {
  try {
    const response = await axios.get(
      `${BASEURL}/bookings/generate-pdf?date=${date}`,
      {
        responseType: "arraybuffer",
      }
    );
    return response;
  } catch (err) {
    throw err;
  }
};

export {
  getAllEvents,
  getEventById,
  getAllEventsWithLimit,
  createBooking,
  updateBookingById,
  getAllRooms,
  getRoomById,
  getAllRoomsWithLimit,
  createRoom,
  updateRoomById,
  getAllUsersWithLimit,
  getUserById,
  createUser,
  updateUserById,
  getAllRoles,
  getExchangeToken,
  signInAuthentication,
  deleteItem,
  generatePDF,
};

export const events = [
  {
    title: "event2",
    start: "2025-01-09T08:00:00",
    end: "2025-01-09T09:00:00",
    description: "lorem",
    resourceId: "a",
    recurring: false,
  },
  {
    title: "event3",
    startRecur: "2025-01-09",
    endRecur: "2025-01-15",
    startTime: "12:00:00",
    endTime: "15:00:00",
    description: "lorem",
    daysOfWeek: [2, 4, 5],
    recurring: true, // will make the time show
    resourceId: "b",
  },
];

export const resources = [
  { id: "a", area: "GPC", title: "GPC Lt. 1", room: "GPC Lt. 1" },
  { id: "b", area: "DC", title: "DC Lt. 1A", room: "DC Lt. 1A" },
  { id: "c", area: "DC", title: "DC Lt. 1B", room: "DC Lt. 1B" },
  { id: "d", area: "DC", title: "DC Lt. 2", room: "DC Lt. 2" },
  { id: "e", area: "DC", title: "DC Lt. 1C", room: "DC Lt. 1C" },
  { id: "f", area: "DC", title: "DC Lt. 1D", room: "DC Lt. 1D" },
];

const resourceAreaColumns = [
  {
    field: "room",
    headerContent: "Rooms",
  },
];

export const navLinks = [
  {
    nav: "Home",
    path: "/",
  },
  {
    nav: "Booking",
    path: "/bookings",
  },
  {
    nav: "Report",
    path: "/reports",
  },
  {
    nav: "Admin",
    path: "/admin",
  },
];

export default resourceAreaColumns;

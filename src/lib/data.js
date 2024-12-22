export const events = [
  {
    id: "1",
    title: "Lomba 17 Agustus",
    startRecur: "2024-12-19",
    endRecur: "2024-12-19",
    startTime: "12:00:00",
    endTime: "16:30:00",
    description: "Pembahasan Pemasangan Grounding Kabel oleh Vindori",
    resourceId: "a",
    recurring: false,
    room: "DC Lt. 1C",
  },
  {
    id: "2",
    title: "Pembahasan Masalah Grounding",
    startRecur: "2024-12-19",
    endRecur: "2024-12-20",
    startTime: "13:00:00",
    endTime: "14:00:00",
    recurring: true,
    repeat: "daily",
    description: "lorem ipsum doron, color amet",
    resourceId: "b",
    room: "DC Lt. 1A",
  },
  {
    id: "3",
    title: "Meeting Mingguan",
    startRecur: "2024-12-29",
    endRecur: "2025-01-01",
    startTime: "08:00:00",
    endTime: "10:00:00",
    daysOfWeek: [2, 3],
    repeat: "weekly",
    color: "#3788d8",
    resourceId: "b",
    room: "GPC Lt. 1",
    recurring: true,
  },
  {
    id: "4",
    title:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere officia harum sapiente ipsa, aliquid voluptatibus eos commodi nisi fuga. Non quis cum hic cumque pariatur consectetur omnis explicabo? Explicabo, tempora.",
    startRecur: "2025-01-02",
    endRecur: "2025-01-04",
    startTime: "09:30:00",
    endTime: "12:00:00",
    description: "Pembahasan Pemasangan Grounding Kabel oleh Vindori",
    resourceId: "a",
    room: "GPC Lt. 1",
    recurring: true,
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

export 

export default resourceAreaColumns;

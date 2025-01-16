import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import { useSearchParams } from "react-router-dom";
import resourceAreaColumns from "../../../lib/data";
import currentDate from "../../../lib/utils";
import { getAllEvents, getAllRooms } from "../../../lib/api";
import { useEffect, useState } from "react";

const PrintReport = () => {
  const [resources, setResources] = useState([]);
  const [events, setEvents] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const date = searchParams?.get("date") || currentDate();

  const fetchAllRooms = async () => {
    try {
      const { rooms } = await getAllRooms();
      setResources(rooms);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAllEvents = async () => {
    try {
      const { bookings } = await getAllEvents();
      setEvents(bookings);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllRooms();
    fetchAllEvents();
  }, []);

  return (
    <div className="m-4">
      <h1 className="display-6 text-center mb-4">
        Booking Meeting Room DC & GPC
      </h1>
      <FullCalendar
        plugins={[resourceTimeGridPlugin, interactionPlugin, bootstrap5Plugin]}
        resources={resources}
        resourceAreaColumns={resourceAreaColumns}
        initialView="resourceTimeGridDay"
        events={events}
        headerToolbar={{
          start: "",
          center: "title",
          end: "",
        }}
        locale="id"
        timeZone="Asia/Jakarta"
        slotMinTime="08:00:00"
        slotMaxTime="17:00:00"
        height="auto"
        allDaySlot={false}
        initialDate={date}
        eventMinWidth={100}
      />
    </div>
  );
};

export default PrintReport;

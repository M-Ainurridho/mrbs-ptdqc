import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import listPlugin from "@fullcalendar/list";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import resourceAreaColumns from "../lib/data";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../lib/context";
import { createAlert } from "../lib/utils";

function MyCalendar() {
  const [events, setEvents] = useState([]);
  const [resources, setResources] = useState([]);

  const { login } = useContext(LoginContext);
  const navigate = useNavigate();

  const fetchAllEvents = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/v1/bookings`, {
        headers: {
          "Cache-Control": "no-store",
        },
      });
      setEvents(response.data.payload.bookings);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllRooms = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/v1/rooms`);
      setResources(response.data.payload.rooms);
    } catch (err) {
      console.log(err);
    }
  };

  const setCustomEvent = (info) => {
    const start = info.startStr.split("T");
    const end = info.endStr.split("T");
    const resourceId = info.resource._resource.id;

    if (!login) {
      createAlert("Oops!", "You must sign in first", "error");
    }

    if (end.length > 1) {
      navigate(
        `/bookings/create?startRecur=${start[0]}&startTime=${start[1]}&endTime=${end[1]}&resourceId=${resourceId}`
      );
    } else {
      navigate(
        `/bookings/create?startRecur=${start[0]}&endRecur=${end[0]}&resourceId=${resourceId}`
      );
    }
  };

  useEffect(() => {
    fetchAllEvents();
    fetchAllRooms();
  }, []);

  return (
    <FullCalendar
      plugins={[
        dayGridPlugin,
        resourceTimeGridPlugin,
        resourceTimelinePlugin,
        interactionPlugin,
        bootstrap5Plugin,
        listPlugin,
      ]}
      initialView="resourceTimeGridDay"
      resources={resources}
      resourceAreaWidth="15%"
      resourceAreaColumns={resourceAreaColumns}
      themeSystem="bootstrap5"
      events={events}
      select={setCustomEvent}
      headerToolbar={{
        start: "prev today next",
        center: "title",
        end: "listWeek resourceTimeGridDay,resourceTimelineWeek,dayGridMonth",
      }}
      footerToolbar={{
        start: "prev",
        end: "next",
      }}
      nextDayThreshold="09:00:00"
      nowIndicator={true}
      navLinks={true}
      locale="id"
      timeZone="Asia/Jakarta"
      slotMinTime="08:00:00"
      slotMaxTime="17:00:00"
      height="auto"
      buttonText={{
        today: "Today",
        month: "Month",
        week: "Week",
        day: "Day",
        list: "Schedule",
      }}
      selectable={true}
      eventBackgroundColor="#84cc16"
      eventBorderColor="#84cc16"
      eventColor="red"
      eventTimeFormat={{
        hour: "numeric",
        minute: "2-digit",
        meridiem: false,
      }}
    />
  );
}

export default MyCalendar;

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import resourceDayGridPlugin from "@fullcalendar/resource-daygrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import resources, { events } from "../lib/data";

function MyCalendar() {
  return (
    <FullCalendar
      plugins={[
        dayGridPlugin,
        resourceTimeGridPlugin,
        resourceDayGridPlugin,
        resourceTimelinePlugin,
        interactionPlugin,
        bootstrap5Plugin,
      ]}
      initialView="resourceTimeGridDay"
      resources={resources}
      resourceAreaColumns={[
        {
          field: "room",
          headerContent: "Rooms",
        },
      ]}
      themeSystem="bootstrap5"
      events={events}
      headerToolbar={{
        start: "prev today next",
        center: "title",
        end: "resourceTimeGridDay,resourceTimelineWeek,dayGridMonth",
      }}
      footerToolbar={{
        start: "prev",
        end: "next",
      }}
      views={{
        resourceTimeGridFourDays: {
          type: "resourceTimeGridWeek",
          duration: { days: 3 },
        },
      }}
      nowIndicator={true}
      navLinks={true}
      slotMinTime="08:00:00"
      slotMaxTime="17:00:00"
      height="auto"
      buttonText={{
        today: "Today",
        month: "Month",
        week: "Week",
        day: "Day",
        list: "List",
      }}
      allDay={false}
    />
  );
}

export default MyCalendar;

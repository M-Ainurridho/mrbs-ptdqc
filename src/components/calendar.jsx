import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import listPlugin from "@fullcalendar/list";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import resourceAreaColumns, { events, resources } from "../lib/data";

function MyCalendar() {
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
      eventTimeFormat={{
        hour: "numeric",
        minute: "2-digit",
        meridiem: false,
      }}
    />
  );
}

export default MyCalendar;

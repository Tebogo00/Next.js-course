/**imports */
import { getFeaturedEvents } from "@/dummy-data";
import EventList from "@/components/events/event-list";

/**
 * 
 * @returns 
 * Define the HomePage component as the default export
 * Call the getFeaturedEvents function to retrieve featured events data
 * Return JSX for the HomePage component
 */
export default function HomePage() {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      {/* Render the EventList component and pass the featured events data as items */}
      <EventList items={featuredEvents} />
    </div>
  );
}

export default function EventSkeleton({ detail = false, count = 6 }) {
  return detail ? (
    <main
      className="container detail-skeleton"
      role="status"
      aria-label="Loading event details"
    >
      <div className="skeleton skeleton-line" />
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-hero" />
      <div className="skeleton skeleton-title" />
    </main>
  ) : (
    <div
      className="events-grid event-skeleton-grid"
      role="status"
      aria-label="Loading upcoming events"
    >
      {Array.from({ length: count }, (_, index) => (
        <div
          className="event-card skeleton-card"
          key={index}
          aria-hidden="true"
        >
          <div className="skeleton skeleton-photo" />
          <div className="skeleton-card-body">
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-title" />
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line" />
          </div>
        </div>
      ))}
    </div>
  );
}

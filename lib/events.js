export const EVENT_TYPES = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Education",
  "Health",
  "Food Drive",
];

export function validateEvent(values) {
  const errors = {};
  for (const [field, label, max] of [
    ["title", "an event title", 160],
    ["description", "a description", 10000],
    ["location", "a meeting location", 300],
  ]) {
    if (!values[field].trim()) errors[field] = `Add ${label}.`;
    else if (values[field].trim().length > max)
      errors[field] = `Use ${max} characters or fewer.`;
  }
  if (!EVENT_TYPES.includes(values.eventType))
    errors.eventType = "Choose a cause for your event.";
  try {
    const url = new URL(values.thumbnailUrl.trim());
    if (
      !["http:", "https:"].includes(url.protocol) ||
      url.username ||
      url.password ||
      values.thumbnailUrl.trim().length > 2048
    )
      throw new Error();
  } catch {
    errors.thumbnailUrl = "Choose an event photo or add a valid image link.";
  }
  const date = new Date(values.eventDate);
  if (!values.eventDate || !Number.isFinite(date.getTime()))
    errors.eventDate = "Choose a date and time.";
  else if (date.getTime() <= Date.now())
    errors.eventDate = "Choose a date and time in the future.";
  return errors;
}

export function localDateTime(date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
}

export function formatEventDate(value) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

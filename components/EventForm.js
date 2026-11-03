"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Check,
  LoaderCircle,
  MapPin,
  Sprout,
} from "lucide-react";
import toast from "react-hot-toast";
import { authenticatedFetch } from "@/lib/api";
import { EVENT_TYPES, localDateTime, validateEvent } from "@/lib/events";
import { useAuth } from "./Providers";
import EventImage from "./EventImage";
import PhotoPicker from "./PhotoPicker";
import MemberNavigation from "./MemberNavigation";

const initialValues = {
  title: "",
  description: "",
  eventType: "",
  thumbnailUrl: "",
  location: "",
  eventDate: "",
};

export default function EventForm({ eventToEdit }) {
  const editing = Boolean(eventToEdit);
  const { user } = useAuth();
  const router = useRouter();
  const formRef = useRef(null);
  const submitting = useRef(false);
  const [values, setValues] = useState(() =>
    editing
      ? {
          title: eventToEdit.title,
          description: eventToEdit.description,
          eventType: eventToEdit.eventType,
          thumbnailUrl: eventToEdit.thumbnailUrl,
          location: eventToEdit.location,
          eventDate: localDateTime(new Date(eventToEdit.eventDate)),
        }
      : initialValues,
  );
  const [errors, setErrors] = useState({});
  const [failure, setFailure] = useState("");
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);

  function change(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setFailure("");
  }

  function fieldProps(name) {
    return {
      id: name,
      name,
      value: values[name],
      onChange: change,
      required: true,
      "aria-invalid": Boolean(errors[name]),
      "aria-describedby": errors[name] ? `${name}-error` : `${name}-hint`,
    };
  }

  function feedback(name, hint) {
    return errors[name] ? (
      <span className="field-error" id={`${name}-error`}>
        {errors[name]}
      </span>
    ) : (
      <small id={`${name}-hint`}>{hint}</small>
    );
  }

  async function submit(event) {
    event.preventDefault();
    if (submitting.current || uploading) return;
    const invalid = validateEvent(values, eventToEdit?.eventDate);
    setErrors(invalid);
    setFailure("");
    if (Object.keys(invalid).length) {
      formRef.current.elements.namedItem(Object.keys(invalid)[0])?.focus();
      toast.error("A few details need your attention.");
      return;
    }
    submitting.current = true;
    setBusy(true);
    try {
      await authenticatedFetch(
        editing ? `/api/events/${eventToEdit._id}` : "/api/events",
        {
          method: editing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...values,
            eventDate:
              editing &&
              values.eventDate ===
                localDateTime(new Date(eventToEdit.eventDate))
                ? eventToEdit.eventDate
                : new Date(values.eventDate).toISOString(),
          }),
        },
      );
      window.dispatchEvent(new Event("bandhan:events-changed"));
      toast.success(
        editing
          ? "Your event is up to date."
          : "Your event is live. Let’s bring people together.",
      );
      router.push(editing ? "/manage-events" : "/upcoming-events");
    } catch (error) {
      const details = Object.fromEntries(
        (error.details || [])
          .filter((item) => item.field in initialValues)
          .map((item) => [item.field, item.message]),
      );
      setErrors(details);
      setFailure(error.message);
      toast.error(error.message);
      if (Object.keys(details).length)
        formRef.current.elements.namedItem(Object.keys(details)[0])?.focus();
      submitting.current = false;
      setBusy(false);
    }
  }

  return (
    <main className="container create-event-page">
      <MemberNavigation current={editing ? "manage" : "create"} />
      <Link
        className="event-back"
        href={editing ? "/manage-events" : "/upcoming-events"}
      >
        <ArrowLeft size={15} />{" "}
        {editing ? "Back to your events" : "Back to events"}
      </Link>
      <div className="event-page-heading">
        <div className="eyebrow">
          <i />{" "}
          {editing ? "KEEP YOUR COMMUNITY IN THE KNOW" : "START SOMETHING GOOD"}
        </div>
        <h1>
          {editing ? (
            <>
              A little update.
              <br />
              <em>The same good purpose.</em>
            </>
          ) : (
            <>
              A small idea.
              <br />
              <em>A shared beginning.</em>
            </>
          )}
        </h1>
        <p>
          {editing
            ? "Keep the plan clear for everyone taking part. Your changes will appear on the event page and in joined event lists."
            : "Bring your neighbours together for a cause that matters. Tell them what you have in mind."}
        </p>
      </div>
      <div className="create-event-layout">
        <form
          ref={formRef}
          className="event-form"
          onSubmit={submit}
          noValidate
          aria-label={editing ? "Edit your event" : "Create an event"}
          aria-busy={busy}
        >
          <fieldset disabled={busy}>
            <legend>
              <span>01</span> The idea
            </legend>
            <div className="event-field">
              <label htmlFor="title">Event title</label>
              <input
                {...fieldProps("title")}
                maxLength={160}
                placeholder="A greener morning in Mirpur"
              />
              {feedback(
                "title",
                "Give your gathering a clear, welcoming name.",
              )}
            </div>
            <div className="event-field">
              <label htmlFor="description">Tell us about it</label>
              <textarea
                {...fieldProps("description")}
                maxLength={10000}
                rows={6}
                placeholder="What will you do together? Who can join, and what should they bring?"
              />
              {feedback(
                "description",
                "A little detail helps people feel ready to take part.",
              )}
            </div>
            <div className="event-field">
              <label htmlFor="eventType">Choose a cause</label>
              <select {...fieldProps("eventType")}>
                <option value="">Select an event type</option>
                {EVENT_TYPES.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
              {feedback(
                "eventType",
                "Choose the cause that fits your event best.",
              )}
            </div>
          </fieldset>
          <fieldset disabled={busy}>
            <legend>
              <span>02</span> The place & the moment
            </legend>
            <div className="event-field">
              <label htmlFor="location">Meeting location</label>
              <input
                {...fieldProps("location")}
                maxLength={300}
                placeholder="Mirpur Botanical Garden gate, Dhaka"
              />
              {feedback(
                "location",
                "Include a landmark or address so everyone can find you.",
              )}
            </div>
            <div className="event-field">
              <label htmlFor="eventDate">Date & time</label>
              <input
                {...fieldProps("eventDate")}
                type="datetime-local"
                onFocus={(event) => {
                  event.currentTarget.min = localDateTime(
                    new Date(Date.now() + 60000),
                  );
                }}
              />
              {feedback(
                "eventDate",
                editing
                  ? "Keep the saved date or choose a new future date. Times use your device’s local time."
                  : "Choose a future date. Times use your device’s local time.",
              )}
            </div>
          </fieldset>
          <fieldset disabled={busy}>
            <legend>
              <span>03</span> A picture of the purpose
            </legend>
            <div className="event-field">
              <PhotoPicker
                id="thumbnailUrl"
                label="Event photo"
                value={values.thumbnailUrl}
                onChange={(url) => {
                  setValues((current) => ({ ...current, thumbnailUrl: url }));
                  setErrors((current) => ({ ...current, thumbnailUrl: "" }));
                  setFailure("");
                }}
                onBusyChange={setUploading}
                error={errors.thumbnailUrl}
                disabled={busy}
              />
            </div>
          </fieldset>
          <div className="event-organizer">
            <Check size={17} />
            <p>
              Organised by <strong>{user.name}</strong>
              <span>{user.email}</span>
            </p>
          </div>
          {failure && (
            <p className="form-error" role="alert">
              {failure}
            </p>
          )}
          <div className="event-submit-row">
            <p>
              {editing
                ? "Keep everyone up to date."
                : "Ready to open the invitation?"}
              <br />
              Your event will be visible to the community.
            </p>
            <button
              className="button"
              type="submit"
              disabled={busy || uploading}
            >
              {busy
                ? editing
                  ? "Saving…"
                  : "Publishing…"
                : editing
                  ? "Save changes"
                  : "Publish event"}
              {busy ? (
                <LoaderCircle size={18} className="spin" />
              ) : (
                <ArrowUpRight size={18} />
              )}
            </button>
            {editing && !busy && (
              <Link className="text-link" href="/manage-events">
                Cancel changes
              </Link>
            )}
          </div>
        </form>
        <aside className="event-preview" aria-label="Event preview">
          <div className="eyebrow">YOUR INVITATION, TAKING SHAPE</div>
          <div className="event-preview-card">
            <EventImage
              key={values.thumbnailUrl.trim()}
              src={values.thumbnailUrl.trim()}
              title={values.title || "Event preview"}
            />
            <div className="event-preview-body">
              <span className="cause-label">
                {values.eventType || "Your cause"}
              </span>
              <h2>{values.title.trim() || "Something good starts here."}</h2>
              <p>
                <MapPin size={15} />
                {values.location.trim() || "A place to come together"}
              </p>
              <p>
                <CalendarDays size={15} />
                {values.eventDate
                  ? values.eventDate.replace("T", " · ")
                  : "A moment worth making time for"}
              </p>
            </div>
          </div>
          <div className="organizer-tip">
            <Sprout size={26} strokeWidth={1.3} />
            <h3>Make it easy to say yes.</h3>
            <p>
              Keep the plan simple. Tell people what to expect, where to meet,
              and how their time will help.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}

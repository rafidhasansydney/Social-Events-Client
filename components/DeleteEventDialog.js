"use client";

import { useEffect, useRef, useState } from "react";
import { LoaderCircle, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { authenticatedFetch } from "@/lib/api";

export default function DeleteEventDialog({ event, onClose }) {
  const dialogRef = useRef(null);
  const cancelRef = useRef(null);
  const submitting = useRef(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const dialog = dialogRef.current;
    const opener = document.activeElement;
    if (!dialog.open) dialog.showModal();
    cancelRef.current?.focus();
    return () => {
      dialog.close();
      opener?.focus();
    };
  }, []);

  async function remove() {
    if (submitting.current) return;
    submitting.current = true;
    setBusy(true);
    setError("");
    try {
      await authenticatedFetch(`/api/events/${event._id}`, {
        method: "DELETE",
      });
      toast.success("Your event has been deleted.");
      window.dispatchEvent(new Event("bandhan:events-changed"));
      onClose();
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
      setBusy(false);
      submitting.current = false;
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="delete-event-dialog"
      aria-labelledby="delete-event-title"
      aria-describedby="delete-event-description"
      onCancel={(event) => {
        event.preventDefault();
        if (!busy) onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget && !busy) onClose();
      }}
    >
      <div className="delete-dialog-body">
        <span className="delete-dialog-icon">
          <Trash2 size={26} strokeWidth={1.4} />
        </span>
        <h2 id="delete-event-title">Delete this event?</h2>
        <p className="delete-event-name">{event.title}</p>
        <p id="delete-event-description">
          This removes the event and its saved participation records. This can’t
          be undone.
        </p>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <div className="delete-dialog-actions">
          <button
            ref={cancelRef}
            className="button secondary"
            onClick={onClose}
            disabled={busy}
          >
            Keep event
          </button>
          <button className="button danger" onClick={remove} disabled={busy}>
            {busy ? "Deleting…" : "Delete event"}
            {busy ? (
              <LoaderCircle size={16} className="spin" />
            ) : (
              <Trash2 size={16} />
            )}
          </button>
        </div>
      </div>
    </dialog>
  );
}

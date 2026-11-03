"use client";

import { useState } from "react";
import { Check, LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { authenticatedFetch } from "@/lib/api";
import { useAuth } from "./Providers";
import Avatar from "./Avatar";
import PhotoPicker from "./PhotoPicker";

export default function ProfileEditor({ member, onSaved }) {
  const { refetch } = useAuth();
  const [name, setName] = useState(member.name || "");
  const [image, setImage] = useState(member.image || "");
  const [bio, setBio] = useState(member.bio || "");
  const [location, setLocation] = useState(member.location || "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [photoVersion, setPhotoVersion] = useState(0);
  const changed =
    name !== (member.name || "") ||
    image !== (member.image || "") ||
    bio !== (member.bio || "") ||
    location !== (member.location || "");

  async function save(event) {
    event.preventDefault();
    if (saving || uploading) return;
    if (!name.trim() || name.trim().length > 100) {
      setError("Enter your name using 1–100 characters.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await authenticatedFetch("/api/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, bio, location, ...(image && { image }) }),
      });
      await refetch();
      await onSaved();
      toast.success("Your profile is up to date.");
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  }

  function reset() {
    setName(member.name || "");
    setImage(member.image || "");
    setBio(member.bio || "");
    setLocation(member.location || "");
    setError("");
    setPhotoVersion((value) => value + 1);
  }

  return (
    <section
      className="profile-editor-section"
      aria-labelledby="profile-editor-title"
    >
      <div className="profile-editor-intro">
        <div className="eyebrow">MAKE YOURSELF AT HOME</div>
        <h2 id="profile-editor-title">
          A little more
          <br />
          <em>about you.</em>
        </h2>
        <p>
          Put a face to your name and tell us a little about the person behind
          the good work.
        </p>
        <span>
          <Check size={15} /> You can change these details anytime.
        </span>
      </div>
      <form
        className="profile-editor event-form"
        onSubmit={save}
        aria-label="Edit your profile"
        aria-busy={saving}
      >
        <fieldset disabled={saving}>
          <div className="profile-photo-row">
            <Avatar
              key={image}
              user={{ ...member, name, image }}
              className="avatar-large"
            />
            <p>
              Your community profile
              <small>Your chosen photo appears beside your name.</small>
            </p>
          </div>
          <PhotoPicker
            key={`${member.image || "profile-photo"}-${photoVersion}`}
            id="profile-image"
            label="Profile photo"
            value={image}
            onChange={setImage}
            kind="profile"
            onBusyChange={setUploading}
            disabled={saving}
          />
          <div className="event-field">
            <label htmlFor="profile-name">Your name</label>
            <input
              id="profile-name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              maxLength={100}
              autoComplete="name"
            />
          </div>
          <div className="event-field">
            <label htmlFor="profile-email">Email address</label>
            <input
              id="profile-email"
              type="email"
              value={member.email}
              readOnly
              aria-describedby="profile-email-help"
            />
            <small id="profile-email-help">
              This is the email you use to sign in.
            </small>
          </div>
          <div className="event-field">
            <label htmlFor="profile-location">
              Your area <span className="optional-label">Optional</span>
            </label>
            <input
              id="profile-location"
              name="location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              maxLength={100}
              autoComplete="address-level2"
              placeholder="Dhaka, Bangladesh"
            />
          </div>
          <div className="event-field">
            <label htmlFor="profile-bio">
              A little about you{" "}
              <span className="optional-label">Optional</span>
            </label>
            <textarea
              id="profile-bio"
              name="bio"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              maxLength={400}
              rows={4}
              placeholder="What causes are close to your heart?"
            />
            <small>{bio.length}/400 characters</small>
          </div>
        </fieldset>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <div className="profile-save-row">
          <button
            className="button"
            type="submit"
            disabled={saving || uploading || !changed}
          >
            {saving ? "Saving…" : "Save changes"}
            {saving ? (
              <LoaderCircle size={17} className="spin" />
            ) : (
              <Check size={17} />
            )}
          </button>
          <button
            type="button"
            className="text-link"
            onClick={reset}
            disabled={saving || uploading || !changed}
          >
            Cancel changes
          </button>
        </div>
      </form>
    </section>
  );
}

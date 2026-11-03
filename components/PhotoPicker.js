"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, LoaderCircle, Upload } from "lucide-react";
import { checkPhoto, uploadPhoto } from "@/lib/images";

export default function PhotoPicker({
  id,
  label = "Photo",
  value = "",
  onChange,
  onBusyChange,
  error,
  disabled = false,
  kind = "event",
  deferUpload = false,
  onSelectFile,
}) {
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState("");
  const [preview, setPreview] = useState("");
  const [fileName, setFileName] = useState("");
  const controller = useRef(null);

  useEffect(
    () => () => {
      if (preview) URL.revokeObjectURL(preview);
    },
    [preview],
  );
  useEffect(() => () => controller.current?.abort(), []);

  async function choose(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const invalid = checkPhoto(file);
    setFailure(invalid);
    if (invalid) return;
    setPreview(URL.createObjectURL(file));
    setFileName(file.name);
    if (deferUpload) {
      onChange("");
      onSelectFile(file);
      return;
    }
    const request = new AbortController();
    controller.current = request;
    setBusy(true);
    onBusyChange?.(true);
    try {
      const url = await uploadPhoto(file, kind, request.signal);
      onChange(url);
    } catch (error) {
      if (!request.signal.aborted) {
        setFailure(error.message);
        setPreview("");
        setFileName("");
      }
    } finally {
      if (!request.signal.aborted) {
        setBusy(false);
        onBusyChange?.(false);
      }
    }
  }

  const message = failure || error;
  return (
    <div className="photo-picker" aria-busy={busy}>
      <span className="photo-picker-label">{label}</span>
      <label
        className={`photo-dropzone ${busy ? "photo-uploading" : ""}`}
        htmlFor={`${id}-file`}
      >
        {preview ? (
          <Image
            src={preview}
            alt="Selected photo preview"
            width={70}
            height={70}
            unoptimized
          />
        ) : (
          <ImagePlus size={27} strokeWidth={1.3} />
        )}
        <span>
          <strong>
            {busy
              ? "Uploading your photo…"
              : fileName ||
                (value ? "Choose a replacement photo" : "Choose a photo")}
          </strong>
          <small>
            {busy
              ? "Just a moment. We’re getting it ready."
              : "From your phone’s gallery or your computer"}
          </small>
        </span>
        {busy ? (
          <LoaderCircle size={19} className="spin" />
        ) : (
          <Upload size={19} />
        )}
        <input
          id={`${id}-file`}
          name={id}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={disabled || busy}
          onChange={choose}
          aria-label={`Upload ${label.toLowerCase()}`}
          aria-invalid={Boolean(message)}
          aria-describedby={`${id}-help`}
        />
      </label>
      <small
        id={`${id}-help`}
        className={message ? "field-error" : "photo-picker-help"}
        role={message ? "alert" : undefined}
      >
        {message || "JPG, PNG or WebP · Up to 4 MB"}
      </small>
      <details className="photo-link-option">
        <summary>Or use an image link</summary>
        <label htmlFor={`${id}-url`}>Image URL</label>
        <input
          id={`${id}-url`}
          type="url"
          value={value}
          maxLength={2048}
          placeholder="https://example.com/photo.jpg"
          disabled={disabled || busy}
          onChange={(event) => {
            setFailure("");
            setPreview("");
            setFileName("");
            onSelectFile?.(null);
            onChange(event.target.value);
          }}
        />
      </details>
    </div>
  );
}

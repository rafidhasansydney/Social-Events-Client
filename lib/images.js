import { authenticatedFetch } from "./api";

export function checkPhoto(file) {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type))
    return "Choose a JPG, PNG or WebP photo.";
  if (file.size > 4 * 1024 * 1024) return "Choose a photo smaller than 4 MB.";
  if (!file.size) return "That photo is empty. Please choose another.";
  return "";
}

export async function uploadPhoto(file, kind = "event", signal) {
  const error = checkPhoto(file);
  if (error) throw new Error(error);
  const body = new FormData();
  body.append("image", file);
  const result = await authenticatedFetch(`/api/uploads?kind=${kind}`, {
    method: "POST",
    body,
    signal,
  });
  return result.image.url;
}

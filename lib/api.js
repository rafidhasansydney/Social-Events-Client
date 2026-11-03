import { authClient } from "./auth-client";

export async function authenticatedFetch(path, options = {}) {
  if (
    !path.startsWith("/api/") ||
    path.startsWith("//") ||
    /[\\\r\n]/.test(path)
  )
    throw new Error("Invalid API path.");
  const { data, error } = await authClient.token();
  if (error || !data?.token)
    throw new Error("Please log in again to continue.");
  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${data.token}`);
  const response = await fetch(path, {
    ...options,
    headers,
    credentials: "include",
    cache: "no-store",
  });
  const result = await response.json().catch(() => null);
  if (!result)
    throw new Error(
      "The service is temporarily unavailable. Please try again shortly.",
    );
  if (!response.ok) {
    const error = new Error(
      result.error?.message || "Unable to complete your request.",
    );
    error.details = result.error?.details;
    error.status = response.status;
    throw error;
  }
  return result;
}
